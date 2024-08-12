"use client"
import Link from "next/link"
export const Footer = () => {
  return (
    <div className="mt-16 bg-neutral-800 p-40">
      <div className=" text-center">
        This Prototype has been created by{" "}
        <span className=" underline cursor-pointer">
          <Link href="https://github.com/SushWar" target="_blank">
            Sushant Tanwar
          </Link>
        </span>
      </div>
    </div>
  )
}
