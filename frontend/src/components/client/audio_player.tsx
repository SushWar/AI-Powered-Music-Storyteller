import { useRef, useState, useEffect } from "react"
import {
  IoPlayBack,
  IoPlayForward,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5"

import { AudioPlayerFunction } from "../interface"

export const AudioPlayer: React.FC<AudioPlayerFunction> = ({
  startSlideShow,
  src,
  setSrc,
  setSlideShow,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setSlideShow(false)
      } else {
        setSlideShow(true)
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgressChange = (e: any) => {
    if (audioRef.current) {
      const newTime = e.target.value * audioRef.current.duration
      audioRef.current.currentTime = newTime
      setProgress(e.target.value)
    }
  }
  const formatTime = (time: any) => {
    if (isNaN(time)) {
      return "0:00" // Or handle the error differently
    }
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0")
    return `${minutes}:${seconds}`
  }
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime / audioRef.current.duration)
      setCurrentTime(formatTime(audioRef.current.currentTime))
    }
  }

  const handleLoadedMetaData = () => {
    if (audioRef.current?.duration && audioRef.current?.duration !== Infinity) {
      setDuration(formatTime(audioRef.current.duration ?? 0))
      // const currentTime = audioRef.current.duration * coefficient
      // audioRef.current.currentTime = currentTime
    }
  }

  // useEffect(() => {}, [audioRef])
  return (
    <div className=" bg-neutral-950 rounded-md">
      <audio
        ref={audioRef}
        src={src || ""}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetaData}
      />
      <div className="p-4">
        <div>
          <ProgressBar
            progress={progress}
            handleProgressChange={handleProgressChange}
          />
        </div>
        <div className="pt-4">
          <Controls
            audioRef={audioRef}
            handlePlayPause={handlePlayPause}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={String(duration)}
          />
        </div>
      </div>
    </div>
  )
}

const Controls = ({
  audioRef,
  handlePlayPause,
  isPlaying,
  currentTime,
  duration,
}: any) => {
  const forwardBack = () => {
    const audRef = audioRef as HTMLAudioElement
    console.log(audRef.title)
    audRef.duration
    audRef.ended
  }

  return (
    <div className="flex justify-center">
      <button onClick={handlePlayPause}>
        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
      </button>
      {duration !== "0:00" && (
        <div className="ml-2">
          {currentTime} / {duration}
        </div>
      )}
    </div>
  )
}

function ProgressBar({ progress, handleProgressChange }: any) {
  return (
    <div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={progress || 0}
        onChange={handleProgressChange}
        className="w-full"
      />
    </div>
  )
}
