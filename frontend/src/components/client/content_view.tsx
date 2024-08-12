import { AnimatePresence, motion } from "framer-motion"
import { Suspense, useEffect, useState } from "react"
import Skeleton from "@mui/material/Skeleton"
import { getData } from "../server/datafrombackend"
import CircularProgress from "@mui/material/CircularProgress"
import { ContentViewFunction } from "../interface"

export const ContentView: React.FC<ContentViewFunction> = ({
  isStoryModelLoading,
  startSlideShow,
  imagePrompt,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [getImageUrl, setImageUrl] = useState<string[] | null>(null)
  // const [imagePrompt, setImagePrompt] = useState<string[] | null>(null)
  const [getImageShowInterval, setImageShowInterval] = useState(0)
  const [imageApiIdx, setImageApiIdx] = useState(0)

  const getImages = async (prompt: string) => {
    try {
      const imagesUrl: string[] = (await getData(
        (prompt = prompt)
      )) as unknown as []
      setImageUrl((prevState: any) => [
        ...prevState,
        imagesUrl[0],
        imagesUrl[1],
      ])
    } catch (error) {
      console.log(error)
    }
  }

  const changeIdx = () => {
    setCurrentImageIndex(currentImageIndex + 1)
  }

  // const sendRequestImage = setInterval(() => {
  //   if (imagePrompt) {
  //     imageApiIdx < imagePrompt.length
  //       ? getImages(imagePrompt[imageApiIdx])
  //       : clearInterval(sendRequestImage)
  //     setImageApiIdx(imageApiIdx + 1)
  //   }
  // }, 1000 * 5)

  const slideShow = setInterval(() => {
    if (imagePrompt) {
      currentImageIndex < imagePrompt.length
        ? setCurrentImageIndex(currentImageIndex + 1)
        : clearInterval(slideShow)
    }
  }, getImageShowInterval)

  console.log(imagePrompt)
  useEffect(() => {
    const interval = 1000 * calculateImageInterval(3.47, 10)
    setImageShowInterval(interval)

    if (startSlideShow) {
      // sendRequestImage
      slideShow
    } else {
      // clearInterval(sendRequestImage)
      clearInterval(slideShow)
    }
    console.log("Content Component mounted")
    return () => {
      // clearInterval(sendRequestImage)
      clearInterval(slideShow)
      console.log("Content Component unmounted")
    }
  }, [startSlideShow])

  return (
    <div className="bg-neutral-950 rounded-md min-h-[60vh] p-2">
      {startSlideShow &&
      imagePrompt &&
      currentImageIndex < imagePrompt.length ? (
        <div className="h-full flex justify-center">
          <Suspense fallback={<Loading />}>
            <AnimatePresence>
              <motion.img
                key={currentImageIndex}
                src={`https://image.pollinations.ai/prompt/${imagePrompt[currentImageIndex]}`}
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

function calculateImageInterval(
  audioDurationMinutes: any,
  numberOfImages: any
) {
  const totalSeconds = audioDurationMinutes * 60
  const intervalInSeconds = totalSeconds / (numberOfImages - 1)
  return intervalInSeconds
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
      //   delay: 1,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 1,
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
