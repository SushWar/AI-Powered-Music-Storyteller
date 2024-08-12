import { FormEvent, Suspense, useCallback, useEffect, useState } from "react"
import { IoIosArrowDropdown } from "react-icons/io"
import { IoCloseCircle } from "react-icons/io5"
import { RiInformation2Line } from "react-icons/ri"
import { getAudioFIles, getData } from "../server/datafrombackend"
import { SettingFunction, SongSettingFunction } from "../interface"
import { SongListLoadingSkeleton } from "../reuse"

export const Setting: React.FC<SettingFunction> = ({
  setSetting,
  screenWidth,
  songList,
  formData,
  setFormData,
  getprompt,
}) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevState: any) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    getprompt()
    if (!screenWidth) {
      setSetting(false)
    }
  }

  useEffect(() => {
    console.log("Setting Component mounted")
    return () => {
      console.log("Setting Component unmounted")
    }
  }, [])

  return (
    <div className="bg-neutral-950 rounded-md  shadow-violet-700 shadow-[rgba(0,0,15,0.5)_-1px_1px_7px_0px]">
      <div className=" p-4">
        <div className="flex justify-end pb-4 lg:hidden">
          <span
            onClick={() => {
              setSetting(false)
            }}
            className=" cursor-pointer"
          >
            <IoCloseCircle size={30} />
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-12">
            <SongList
              audio={formData?.audio || "Select an audio"}
              setFormData={setFormData}
              songList={songList}
            />

            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center relative">
                <label className=" font-semibold">Creativity</label>
                <ShowInformation info={informationBox.temp} />
              </div>
              <div className=" flex gap-4">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  name="temperature"
                  className="rounded-md md:w-[20vw]"
                  value={formData?.temperature || 0}
                  onChange={handleChange}
                />
                <div className=" bg-slate-500 px-3 py-1 rounded-md">
                  <div className=" w-6">{formData?.temperature || 0}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold">Prompt</label>
              <textarea
                rows={5}
                name="prompt"
                className="text-gray-700  rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                value={formData?.prompt}
                onChange={handleChange}
                placeholder="Make an adventure story in the Indian circus"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className=" bg-secondary-navy py-2 px-4 rounded-xl"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const SongList: React.FC<SongSettingFunction> = ({
  audio,
  setFormData,
  songList,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (song: string) => {
    setFormData((prevState: any) => ({ ...prevState, ["audio"]: song }))
    setIsOpen(false)
  }

  useEffect(() => {}, [])

  return (
    <div className="relative">
      <div>
        <div className=" mb-2">
          <label className="font-semibold">Song</label>
        </div>

        <div className="relative" onClick={handleToggle} aria-haspopup="true">
          <button
            type="button"
            className=" w-full truncate formParameters hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="options-menu"
            aria-expanded={isOpen}
          >
            <span className="">{audio}</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className=" z-[1] origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5   
 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1 h-[20rem] overflow-y-auto" role="none">
            {songList ? (
              songList.map((song: string) => (
                <div
                  key={song}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate cursor-pointer"
                  role="menuitem"
                  onClick={() => handleItemClick(song)}
                >
                  {song}
                </div>
              ))
            ) : (
              <div className="">
                <SongListLoadingSkeleton />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ShowInformation({ info }: any) {
  const [openInfo, setInfo] = useState(false)
  return (
    <div className="">
      <span
        className=" cursor-pointer"
        onClick={() => {
          setInfo(!openInfo)
        }}
      >
        <RiInformation2Line />
      </span>
      {openInfo && (
        <div className=" absolute w-full top-8 left-0 rounded-md p-4 bg-slate-500">
          <div className="flex flex-col gap-2 text-xs relative">
            <span
              className=" cursor-pointer absolute top-0 right-0"
              onClick={() => {
                setInfo(false)
              }}
            >
              <IoCloseCircle size={15} />
            </span>
            {info.map((content: any) => {
              return <div key={content.slice(0, 5)}>{content}</div>
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const informationBox = {
  temp: [
    `Creativity controls the randomness in token selection `,
    `A lower temperature is good when you expect a true or correct response. A temperature of 0 means the highest probability token is always selected.`,
    `A higher temperature can lead to diverse or unexpected results. Some models have a higher temperature max to encourage more random responses.`,
  ],
}
