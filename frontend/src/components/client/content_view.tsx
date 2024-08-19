import { AnimatePresence, motion } from "framer-motion"
import { Suspense, useEffect, useRef, useState } from "react"
import Skeleton from "@mui/material/Skeleton"
import { getImagesApi } from "../server/datafrombackend"
import CircularProgress from "@mui/material/CircularProgress"
import { ContentViewFunction } from "../interface"
import Image from "next/image"

export const ContentView: React.FC<ContentViewFunction> = ({
  isStoryModelLoading,
  startSlideShow,
  imagePrompt,
}) => {
  const disabled =
    process.env.NEXT_PUBLIC_DISABLED_CONTENT_VIEW === "1" ? true : false
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageApiIdx, setImageApiIdx] = useState(0)
  const [getImageUrl, setImageUrl] = useState<string[]>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const getImages = async (prompt: string) => {
    try {
      const imagesUrl: string[] | null = await getImagesApi((prompt = prompt))
      if (imagesUrl) {
        setImageUrl((prevState: any) => [
          ...prevState,
          imagesUrl[0],
          imagesUrl[1],
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const startInterval = () => {
    console.log("start the timer for index")
    const id = setInterval(() => {
      setCurrentImageIndex((prevIndex) => prevIndex + 1)
    }, 1000 * 5)

    const imageId = setInterval(() => {
      if (imageApiIdx < imagePrompt.length) {
        getImages(imagePrompt[imageApiIdx])
        setImageApiIdx((prevIndex) => prevIndex + 1)
      }
    }, 1000 * 5)

    intervalRef.current = id
    imageIntervalRef.current = imageId
  }

  const stopInterval = () => {
    console.log("clear the timer for index")
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (imageIntervalRef.current) {
      clearInterval(imageIntervalRef.current)
      imageIntervalRef.current = null
    }
  }

  useEffect(() => {
    // console.log("Content Component mounted")
    if (!disabled) {
      if (startSlideShow) {
        console.log("Starting slideshow")
        startInterval
      } else {
        stopInterval
      }
    }

    return () => {
      // console.log("Content Component unmounted")
    }
  }, [startSlideShow])

  return (
    <div className="bg-neutral-950 rounded-md min-h-[60vh] p-2">
      {disabled && (
        <div className="h-full flex justify-center">
          <div>
            We're currently working on improving the content for you. In the
            meantime, you can still enjoy the audio! Just select the audio part
            and press the submit button to listen.
          </div>
        </div>
      )}
      {!disabled && getImageUrl && currentImageIndex < getImageUrl.length ? (
        <div className="h-full flex justify-center">
          <Suspense fallback={<Loading />}>
            <AnimatePresence mode="wait">
              <motion.img
                src={getImageUrl[currentImageIndex]}
                className="object-cover rounded-3xl"
                alt="Crousel"
                variants={slideVariants}
                initial={"hiddenRight"}
                animate="visible"
                exit="exit"
                loading="lazy"
                width={700}
                height={400}
              />
            </AnimatePresence>
          </Suspense>
        </div>
      ) : isStoryModelLoading ? (
        <CircularLoading />
      ) : (
        <Loading />
      )}
    </div>
  )
}

const slideVariants = {
  hiddenRight: {
    // x: "100%",
    scale: 0,
    opacity: 0,
  },
  hiddenLeft: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    // x: "0",
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.4,
    },
  },
}

function Loading() {
  return (
    <Skeleton
      sx={{ bgcolor: "grey.900" }}
      variant="rounded"
      width="100%"
      height={340}
      animation="wave"
    />
  )
}

function CircularLoading() {
  return (
    <div className="h-[60vh] flex justify-center items-center">
      <CircularProgress />
    </div>
  )
}
