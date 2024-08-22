import { Dispatch, SetStateAction, useState } from "react"
import Avatar from "@mui/material/Avatar"
import { deepOrange, deepPurple } from "@mui/material/colors"
import {
  ChildSkitModel,
  DialogueInterface,
  SkitModelOutput,
} from "../interface"
import { GiClapperboard } from "react-icons/gi"
import { getSongSkit } from "../server/datafrombackend"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { SongListLoadingSkeleton } from "../reuse"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

interface StorySectionInterface {
  songList: string[] | null
}

interface MusicModelInterface {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setSong: Dispatch<SetStateAction<string | null>>
  songList: string[] | null
}

export const StorySection: React.FC<StorySectionInterface> = ({ songList }) => {
  const [selectedSong, setSong] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [getSkit, setSkit] = useState<SkitModelOutput | null>(null)
  const [skitLoading, setSkitLoading] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const testGetParams = async () => {
    if (selectedSong) {
      try {
        setSkitLoading(true)
        const skit: { url: string; headers: any } = (await getSongSkit(
          selectedSong
        )) as { url: string; headers: any }
        const paramTest = await fetch(
          `${skit.url}song-to-story/?audio=${selectedSong}`,
          {
            headers: skit.headers,
          }
        ).then((res) => res.json())
        console.log("Paramtest -->", paramTest)
        const test = await JSON.parse(paramTest.output)

        setSkit(test)
        console.log(skit)
      } catch (error) {
        console.log("error", error)
      } finally {
        setSkitLoading(false)
      }
    }
  }

  return (
    <div className=" m-2">
      <div className="flex justify-center gap-3 items-center">
        <button
          className=" bg-slate-500 px-3 py-2 rounded-md flex items-center gap-3 "
          onClick={handleOpen}
        >
          <span>I need a dramtic play on a song</span>{" "}
          <span>
            <GiClapperboard size={50} />
          </span>
        </button>
        <MusicModal
          open={open}
          setOpen={setOpen}
          setSong={setSong}
          songList={songList}
        />
      </div>
      {selectedSong && (
        <div className=" my-4">
          <div className=" flex justify-center gap-3 items-center">
            <div>{selectedSong}</div>
            <button
              className="py-2 px-4 rounded bg-slate-900 shadow hover:shadow-slate-100"
              onClick={testGetParams}
            >
              Show Script
            </button>
          </div>
        </div>
      )}
      <div>
        {getSkit?.Title ? (
          <SkitPlay getSkit={getSkit} />
        ) : skitLoading ? (
          <SkitLoadingSkeleton />
        ) : (
          <> </>
        )}
      </div>
    </div>
  )
}

const SkitPlay: React.FC<ChildSkitModel> = ({ getSkit }) => {
  return (
    <div className="mx-4 mt-12 flex flex-col gap-4 border-t-8 border-dotted border-pink-200">
      <div className="text-center p-4 ">
        <h1 className="font-extrabold text-4xl md:text-7xl text-accent-gold uppercase">
          {getSkit.Title}
        </h1>
      </div>
      <div className=" px-4 py-2">
        <h2 className="font-semibold text-lg md:text-3xl text-accent-silver">
          Characters
        </h2>

        <div className=" justify-center gap-4 md:flex ">
          {getSkit.Character_List.map((val) => {
            return (
              <div
                key={val.name}
                className=" bg-slate-800 rounded-md md:w-[30rem] mx-4 py-2 p-4 m-3"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <Avatar
                      sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
                    >
                      {val.name[0]}
                    </Avatar>
                  </div>
                  <div>
                    <span className=" text-slate-300">Name: </span>
                    <span className="text-primary-lightBlue font-bold">
                      {val.name}
                    </span>
                  </div>
                  <div>
                    <span className=" text-slate-300">Description: </span>
                    <span className="text-primary-lightBlue font-bold">
                      {val.description}
                    </span>
                  </div>
                  <div>
                    <span className=" text-slate-300">Music Style: </span>
                    <span className="text-primary-lightBlue font-bold">
                      {val.music_style}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="  px-4 py-2">
        <h2 className="font-semibold text-lg md:text-3xl text-accent-silver">
          Plot Summary
        </h2>{" "}
        <div className="bg-slate-800 rounded-md mx-4 py-4 px-3 m-3 text-primary-lightBlue font-bold">
          {getSkit.Plot_Summary}
        </div>
      </div>
      <div className="  py-2 px-4">
        <h2 className="font-semibold text-lg md:text-3xl text-accent-silver mb-8">
          Scene breakdown
        </h2>

        {getSkit.Scene_Breakdown.map((val) => {
          return (
            <div
              key={val.scene_number}
              className="bg-slate-800 rounded-md mx-4 py-2 p-4 m-3"
            >
              <div className="text-center mb-8 font-medium text-lg md:text-2xl text-amber-100">
                Scene {val.scene_number}
              </div>
              <div className="py-2 px-4 flex flex-col gap-4 text-primary-lightBlue">
                <div className="flex gap-2">
                  <div className=" font-semibold text-lime-600">visual:</div>
                  <div>{val.setting}</div>
                </div>
                <div className="flex gap-2">
                  <div className=" font-semibold text-red-400">Action:</div>
                  <div>{val.actions}</div>
                </div>

                <div className="flex gap-2">
                  <div className=" font-semibold text-yellow-600">
                    Dialogue:
                  </div>
                  <div>
                    <ShowDialogue
                      dialogue={val.dialogue}
                      characters={getSkit.Character_List.map((char) => {
                        return char.name
                      })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className=" font-semibold text-teal-400">Music:</div>
                  <div>{val.music}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ShowDialogue: React.FC<DialogueInterface> = ({
  dialogue,
  characters,
}) => {
  return (
    <div className=" flex flex-col gap-4 italic text-purple-100">
      {formatDialogue(dialogue, characters).map((val: string) => {
        return <div key={val.length}>{val}</div>
      })}
    </div>
  )
}

const formatDialogue = (dialogue: string, characters: string[]): string[] => {
  const characterRegex = new RegExp(`(${characters.join("|")}):`)
  const dialogueArray = dialogue.split(characterRegex)

  // Remove empty strings from the beginning
  while (dialogueArray[0] === "") {
    dialogueArray.shift()
  }
  // console.log(dialogueArray)
  const formattedDialogue: string[] = []
  for (let i = 0; i < dialogueArray.length; i += 2) {
    formattedDialogue.push(`${dialogueArray[i]} : ${dialogueArray[i + 1]}`)
  }

  return formattedDialogue
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 2,
}

const MusicModal: React.FC<MusicModelInterface> = ({
  open,
  setOpen,
  setSong,
  songList,
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  const songSelected = (val: string) => {
    setSong(val)
    setOpen(false)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400, height: 400, borderRadius: "1rem" }}>
          <div className=" text-black w-full h-full ">
            <div className="h-[80%] m-2 overflow-y-auto overflow-x-hidden text-ellipsis rounded-md bg-slate-500">
              {songList ? (
                songList.map((val, key) => {
                  return (
                    <div
                      key={key}
                      className=" hover:bg-slate-600 cursor-pointer w-full py-3 px-1 text-lg font-medium"
                      onClick={() => {
                        songSelected(val)
                      }}
                    >
                      {val}
                    </div>
                  )
                })
              ) : (
                <SongListLoadingSkeleton />
              )}
            </div>

            <button
              onClick={handleClose}
              className="py-3 px-2 hover:bg-red-500 rounded"
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

const SkitLoadingSkeleton = () => {
  return (
    <div className="m-8 p-3">
      <Stack spacing={3}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton
          variant="rectangular"
          height={60}
          sx={{ bgcolor: "#241d3c" }}
        />

        {/* For other variants, adjust the size with `width` and `height` */}
        <div className=" flex gap-4">
          <Skeleton
            variant="circular"
            width={60}
            height={60}
            sx={{ bgcolor: "GrayText" }}
          />
          <Skeleton
            variant="circular"
            width={60}
            height={60}
            sx={{ bgcolor: "GrayText" }}
          />
        </div>
        <Skeleton variant="rounded" height={200} sx={{ bgcolor: "#241d3c" }} />
        <Skeleton variant="rounded" height={500} sx={{ bgcolor: "#241d3c" }} />
      </Stack>
    </div>
  )
}
