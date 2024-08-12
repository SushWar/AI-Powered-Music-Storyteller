const rightX_entryVariant = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 10,
    transition: {
      //   delay: 1,
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
    opacity: 0,
    transition: { duration: 1 },
  },
}

export { rightX_entryVariant }
