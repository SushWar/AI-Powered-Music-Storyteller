import { Dispatch, SetStateAction } from "react"

export interface StoryModelOutput {
  language: string
  genre: string
  imagePrompts: any
}

export interface SkitModelOutput {
  Title: string
  Plot_Summary: string
  Character_List: [{ name: string; description: string; music_style: string }]
  Scene_Breakdown: [
    {
      scene_number: number
      setting: string
      dialogue: string
      actions: string
      music: string
    }
  ]
}
export interface ChildSkitModel {
  getSkit: SkitModelOutput
}
export interface DialogueInterface {
  dialogue: string
  characters: string[]
}

export interface ImageFormData {
  audio: string
  temperature: string
  prompt: string
}

export interface SettingFunction {
  setSetting: Dispatch<SetStateAction<boolean>>
  screenWidth: boolean
  songList: string[] | null
  formData: ImageFormData | null
  setFormData: Dispatch<SetStateAction<ImageFormData | null>>
  getprompt: () => void
}

export interface SongSettingFunction {
  audio: string | null
  setFormData: Dispatch<SetStateAction<ImageFormData | null>>
  songList: string[] | null
}

export interface ContentViewFunction {
  isStoryModelLoading: boolean
  startSlideShow: boolean
  imagePrompt: string[]
}

export interface AudioPlayerFunction {
  src: string | null
  setSlideShow: Dispatch<SetStateAction<boolean>>
}
