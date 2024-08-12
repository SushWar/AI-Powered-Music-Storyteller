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
        const skit = await getSongSkit(selectedSong)
        setSkit(skit)
        // console.log(skit)
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
        {getSkit ? (
          <SkitPlay getSkit={getSkit} />
        ) : skitLoading ? (
          <SkitLoadingSkeleton />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

const SkitPlay: React.FC<ChildSkitModel> = ({ getSkit }) => {
  return (
    <div className="mx-4 my-2 flex flex-col gap-4">
      <div className=" border border-red-600 text-center p-4 ">
        <h1 className="font-extrabold text-3xl md:text-5xl">{getSkit.Title}</h1>
      </div>
      <div className=" border border-blue-600 px-4 py-2">
        <h2 className="font-semibold text-lg md:text-3xl">Characters</h2>

        <div className=" justify-center gap-4 md:flex ">
          {getSkit.Character_List.map((val) => {
            return (
              <div
                key={val.name}
                className=" bg-slate-800 rounded-md max-w-[50%] mx-4 py-2 p-4 m-3"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                  </div>
                  <div>
                    Name: <span>{val.name}</span>
                  </div>
                  <div>
                    Description: <span>{val.description}</span>
                  </div>
                  <div>
                    music Style: <span>{val.music_style}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className=" border border-green-600 px-4 py-2">
        <h2 className="font-semibold text-lg md:text-3xl">Plot Summary</h2>{" "}
        <div className="bg-slate-800 rounded-md mx-4 py-2 p-4 m-3">
          {getSkit.Plot_Summary}
        </div>
      </div>
      <div className=" border border-yellow-600 py-2 px-4">
        <h2 className="font-semibold text-lg md:text-3xl">Scene breakdown</h2>

        {getSkit.Scene_Breakdown.map((val) => {
          return (
            <div
              key={val.scene_number}
              className="bg-slate-800 rounded-md mx-4 py-2 p-4 m-3"
            >
              <div className=" font-medium md:text-lg">
                {" "}
                Scene {val.scene_number} :
              </div>
              <div className="py-2 px-4 flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className=" font-semibold">visual:</div>
                  <div>{val.setting}</div>
                </div>
                <div className="flex gap-2">
                  <div className=" font-semibold">Action:</div>
                  <div>{val.actions}</div>
                </div>
                <div className="flex gap-2">
                  <div className=" font-semibold">Dialogue</div>
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
                  <div className=" font-semibold">Music:</div>
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
    <div className=" flex flex-col gap-4">
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
  //   const songList = [
  //     "Song1",
  //     "song2",
  //     "song3",
  //     "song4",
  //     "song4g34g34g324g34g34g324g324g34g3g3gf34gf3f3fd3f34f324f3",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4fewf32f32f32fg32g32rg32g324g34g34g34g34g23g3",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //     "song4",
  //   ]
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
                      className=" hover:bg-slate-600 cursor-pointer w-full py-3 px-1"
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
