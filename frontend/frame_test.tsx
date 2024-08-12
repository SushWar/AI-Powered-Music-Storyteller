import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, AnimatePresence, useCycle } from "framer-motion"
import music3 from "../../public/asset/music3.png"

// function FrameImage() {
//   const [scrollProgress, setScrollProgress] = useState(0)
//   const ref = useRef(null)

//   const { scrollYProgress } = useScroll({ target: ref })

//   useEffect(() => {
//     setScrollProgress(scrollYProgress.get())
//   }, [scrollYProgress.get()])

//   return (
//     <div ref={ref}>
//       <motion.img
//         initial={{ height: "100vh" }}
//         animate={{ height: `calc(100vh - ${scrollProgress * 100}%)` }}
//         transition={{ duration: 0.5 }}
//         src="/asset/music3.png"
//         alt="Background Image"
//         style={{ objectFit: "fill", position: "fixed", top: 0, left: 0 }}
//       />
//       {/* Your next component here */}
//       <div className="next-component">
//         {/* Replace this with your actual content */}
//         <h1>Next Component</h1>
//         <p>This is a placeholder for your content.</p>
//       </div>
//     </div>
//   )
// }

function FrameHeading() {
  const [out, setOut] = useState(true)
  const [animation, cycleAnimation] = useCycle("animated", "animateTwo")
  setTimeout(() => {
    setOut(false)
  }, 4000)
  return (
    <div>
      <motion.h2
        initial={{ y: 200 }}
        animate={{
          fontSize: 100,
          color: "#ff2994",
          x: 50,
          y: -50,
          opacity: 1,
          scale: 1.1,
          // rotateX: 45,
        }}
        transition={{ duration: 4 }}
      >
        Hello World
      </motion.h2>
      <motion.img
        // initial={{ opacity: 0.5 }}
        // animate={{ scale: 1, rotate: 0, borderRadius: 50, opacity: 1 }}
        // transition={{ duration: 1, type: "spring", stiffness: 120 }}
        variants={testVariant}
        initial="hidden"
        animate="visible"
        whileHover={{
          scale: 1.1,
          // transition: { duration: 0.8, repeat: Infinity },
        }}
        src="/asset/music3.png"
        alt="Background Image"
      ></motion.img>

      <motion.div
        className="mt-8"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {/* use for exiting animation */}
        <AnimatePresence mode="wait">
          {out && (
            <motion.h2 exit={{ y: -1000, transition: { duration: 3 } }}>
              Thank you for visiting ;
            </motion.h2>
          )}
        </AnimatePresence>
        <motion.p variants={childVariant}>Have a nice day :</motion.p>
      </motion.div>

      {/* <motion.div
        className=" mt-10 w-2 h-2 my-auto mx-auto  rounded-3xl bg-slate-200"
        variants={loaderVariant}
        animate="animated"
        // animate={{
        //   x: [-20, 20],
        //   y: [0, -30],
        //   transition: {
        //     x: { repeat: Infinity, duration: 0.6 },
        //     y: { repeat: Infinity, duration: 0.35, ease: "easeOut" },
        //   },
        // }}
      ></motion.div>
      <div
        className="mt-5"
        onClick={() => {
          cycleAnimation()
        }}
      >
        Cycle loader
      </div> */}
    </div>
  )
}

const loaderVariant = {
  animated: {
    x: [-20, 20],
    y: [0, -30],
    originX: 0,
    transition: {
      x: { repeat: Infinity, duration: 0.5 },
      y: { repeat: Infinity, duration: 0.25, ease: "easeOut" },
    },
  },
  animateTwo: {
    y: [0, -40],
    x: 0,
    transition: {
      y: { repeat: Infinity, duration: 0.25, ease: "easeOut" },
    },
  },
}

const testVariant = {
  hidden: {
    opacity: 0.2,
  },
  visible: {
    borderRadius: 50,
    opacity: 1,
    transition: {
      duration: 2,
      type: "spring",
      stiffness: 120,
    },
  },
}

const containerVariant = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.4, //This will ensure every children will run after
      mass: 0.4,
      damping: 8,
    },
  },
}

const childVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
}
