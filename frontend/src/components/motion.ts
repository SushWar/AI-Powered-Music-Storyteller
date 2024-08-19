const rightX_entryVariant_setting = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 10,
    transition: {
      duration: 1,
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.4,
      mass: 0.4,
      damping: 8,
    },
  },
  exit: {
    x: "100vw",
    opacity: 0,
    transition: { duration: 1 },
  },
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
      staggerChildren: 0.4,
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

export {
  rightX_entryVariant,
  drawVariant,
  leftX_entryVariant,
  slideVariants,
  rightX_entryVariant_setting,
}
