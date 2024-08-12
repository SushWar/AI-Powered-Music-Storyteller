"use client"
import { useRef, useState, useEffect } from "react"
import {
  motion,
  useScroll,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion"

export default function Home() {
  useEffect(() => {
    console.log("Home Component mounted")

    return () => {
      console.log("Home Component unmounted")
    }
  }, [])
  return (
    <>
      <ImageSection />
      <AboutSection />
      <WorkingSection />
    </>
  )
}

function WorkingSection() {
  const steps = [
    "Upload your music",
    "Watch the magic unfold",
    "share your masterpiece",
  ]
  return (
    <div className=" min-h-screen m-4 p-8">
      <div>
        <div className=" flex flex-col gap-16 lg:flex-row justify-center items-center ">
          <h3 className="text-primary-lavender font-bold text-balance text-6xl">
            How it works in 3 steps
          </h3>
          <ol className=" list-decimal">
            {steps.map((val) => {
              return (
                <li key={val} className="text-3xl text-accent-silver">
                  {val}
                </li>
              )
            })}
          </ol>
        </div>
        <div className="mt-16 w-full h-[30vh] bg-red-500">
          Video of demonstration
        </div>
      </div>
    </div>
  )
}

function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [images, setImages] = useState([
    "/asset/music1.png",
    "/asset/music2.png",
  ])
  const interval = 3600
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(intervalId)
  }, [images, interval])

  return (
    <div className="min-h-screen mx-2 p-4">
      <div className=" flex flex-col lg:grid grid-cols-2 gap-12">
        <div className="">
          <h1 className=" text-primary-lavender font-bold text-balance text-6xl">
            From sound waves to stunning frames, we bridge the gap.
          </h1>
        </div>
        <div>
          <h2 className=" text-accent-silver">
            Elevate your projects and Bring your music to life with breathtaking
            imagery.
          </h2>
        </div>
        <div className=" w-[80%] m-auto">
          <div className="text-3xl mb-5 border-b-[1px] pb-4">
            400M+ images generated
          </div>
          <div className="text-3xl mb-5 border-b-[1px] pb-4">
            2 second generation time
          </div>
          <div className="text-3xl mb-5 border-b-[1px] pb-4">10,000+ GPUs</div>
        </div>
        <div className=" relative max-h-[40vh]">
          <div>
            <AnimatePresence>
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                className="object-cover w-full h-[40vh] rounded-3xl"
                alt="Crousel"
                variants={slideVariants}
                initial={"hiddenRight"}
                animate="visible"
                exit="exit"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImageSection() {
  const ref = useRef(null)
  const [scrollValue, setScrollValue] = useState(0)
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollValue(latest)
  })
  return (
    <div ref={ref} id="imagecontainer" className="relative ">
      <motion.img
        id="imagescale"
        className=" w-full h-[100vh] object-cover scale-[1] lg:h-auto"
        style={{
          scale: 1 - scrollValue,
        }}
        src="/asset/music3.png"
        alt="Background Image"
        loading="lazy"
      ></motion.img>

      <motion.div
        className=" absolute top-0 left-0 w-full h-full bg-slate-900 opacity-60"
        style={{ opacity: 0.6 - scrollValue * 1.5 }}
      ></motion.div>

      <div className="absolute top-0 left-0 w-full h-full">
        <div className=" h-full flex flex-col items-center justify-center align-middle">
          <AnimatePresence mode="popLayout">
            {scrollValue <= 0 && (
              <motion.div
                className="flex items-center"
                variants={rightX_entryVariant}
                exit="exit"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className=" size-28"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                    variants={drawVariant}
                    custom={0}
                  />
                </motion.svg>
                <motion.div
                  variants={rightX_entryVariant}
                  initial="hidden"
                  animate="visible"
                >
                  Transforming melodies
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {scrollValue <= 0 && (
              <motion.div
                className="flex items-center"
                variants={leftX_entryVariant}
                exit="exit"
              >
                <motion.div
                  variants={leftX_entryVariant}
                  initial="hidden"
                  animate="visible"
                >
                  Mesmerizing visuals
                </motion.div>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className=" size-28 "
                  initial="hidden"
                  animate="visible"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    variants={drawVariant}
                    custom={0}
                  />
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    variants={drawVariant}
                    custom={0}
                  />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

const rightX_entryVariant = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1,
      duration: 1,
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.4, //This will ensure every children will run after
      mass: 0.4,
      damping: 8,
    },
  },
  exit: {
    x: "100vw",
    transition: { duration: 2, type: "spring", ease: "easeOut" },
  },
}

const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: any) => {
    const delay = 1 + i * 0.5
    return {
      pathLength: 1,
      opacity: 1,
      // transition: {
      //   duration: 1,
      //   ease: "easeInOut",
      // },
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
        ease: "easeInOut",
      },
    }
  },
}

const leftX_entryVariant = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1,
      duration: 1,
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.4, //This will ensure every children will run after
      mass: 0.4,
      damping: 8,
    },
  },
  exit: {
    x: "-100vw",
    transition: { duration: 2, type: "spring", ease: "easeOut" },
  },
}

const slideVariants = {
  hiddenRight: {
    x: "100%",
    opacity: 0,
  },
  hiddenLeft: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: "0",
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
      duration: 1,
    },
  },
}
