"use client"
import { motion, AnimatePresence } from "framer-motion"
import React, { useState, useEffect } from "react"
import { HiAdjustments } from "react-icons/hi"
import { AudioPlayer } from "@/components/client/audio_player"
import { Setting } from "@/components/client/settings"
import { ContentView } from "@/components/client/content_view"
import {
  getAudioFiles,
  getAudioPrompt,
  getSignedUrl,
} from "@/components/server/datafrombackend"
import useMediaQuery from "@mui/material/useMediaQuery"

import { ImageFormData, StoryModelOutput } from "@/components/interface"
import { StorySection } from "@/components/client/story_play"
import { rightX_entryVariant_setting } from "@/components/motion"

export default function Playground() {
  const [hasMounted, setHasMounted] = useState(false)
  const screenWidth = useMediaQuery("(min-width:1020px)")
  const [isOpenSetting, setSetting] = useState(screenWidth)
  const [songList, setSongList] = useState<string[] | null>(null)
  const [formData, setFormData] = useState<ImageFormData | null>(null)
  const [isStoryModelLoading, setModelLoading] = useState(false)
  const [startSlideShow, setSlideShow] = useState(false)
  const [storyModel, setStoryModel] = useState<StoryModelOutput | null>(null)
  const [src, setSrc] = useState<string | null>(null)

  const getAudio = async () => {
    try {
      const audio = await getAudioFiles()

      let audioFiles: string[] = []
      audio.audio.map((val: string) => {
        audioFiles.push(val.slice(6))
      })

      setSongList(audioFiles)
    } catch (error) {
      console.log(error)
    }
  }

  const getprompt = async () => {
    try {
      if (formData) {
        setModelLoading(true)
        setSlideShow(false)

        const staticData = await getAudioPrompt(formData)
        setStoryModel(staticData)
        const getAudiosrc = await getSignedUrl(formData.audio)
        setSrc(getAudiosrc)
        setSlideShow(true)
      }
    } catch (error) {
      console.log("error", error)
      setSlideShow(false)
    } finally {
      setModelLoading(false)
    }
  }

  useEffect(() => {
    setHasMounted(true)
    getAudio()

    // console.log("PLayground Component mounted")
    return () => {
      setHasMounted(false)
      // console.log("PLayground Component unmounted")
    }
  }, [])

  return (
    <>
      <div
        id="visualparty"
        className="min-h-screen flex justify-center items-center"
      >
        <div className="w-full m-4 p-2 mt-20">
          <div className="  relative flex">
            <div className={`w-full`}>
              <ContentView
                isStoryModelLoading={isStoryModelLoading}
                startSlideShow={startSlideShow}
                imagePrompt={storyModel?.imagePrompts}
              />
              <div className=" mt-3 flex w-full items-center">
                <div className=" w-full">
                  <AudioPlayer src={src} setSlideShow={setSlideShow} />
                </div>
                <div className=" w-[10vw] lg:hidden mx-3">
                  <div className="flex justify-center">
                    <span
                      className=" cursor-pointer bg-neutral-950 p-4 rounded-md"
                      onClick={() => {
                        setSetting(true)
                      }}
                    >
                      <HiAdjustments size={"5vw"} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {hasMounted && (
              <AnimatePresence>
                {(isOpenSetting || screenWidth) && (
                  <motion.div
                    className="mx-3 h-full w-full lg:w-[30vw] absolute top-0 right-0 lg:relative lg:h-auto"
                    variants={rightX_entryVariant_setting}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Setting
                      setSetting={setSetting}
                      screenWidth={screenWidth}
                      songList={songList}
                      formData={formData}
                      setFormData={setFormData}
                      getprompt={getprompt}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
      <div id="writterparty">
        <StorySection songList={songList} />
      </div>
    </>
  )
}
