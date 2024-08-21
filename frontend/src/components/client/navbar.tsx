"use client"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
export function Navbar() {
  return (
    <header className="relative z-10">
      <motion.div
        className="fixed bg-primary-lightBlue text-secondary-navy w-full opacity-70"
        initial={{ y: "-50vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className=" px-2 py-4">
          <div className="flex justify-around text-base md:text-2xl lg:text-4xl font-bold">
            <div>
              <div className="cursor-pointer ">
                <Link href={"/"}>TuneStory</Link>
              </div>
            </div>
            <div>
              <div className=" cursor-pointer px-2 animated-underline">
                <Link href={"/playground"}>Playground</Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
