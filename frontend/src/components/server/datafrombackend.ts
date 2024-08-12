"use server"
import { Client } from "@gradio/client"
import { Storage } from "@google-cloud/storage"
import { ImageFormData } from "../interface"

const api = process.env.API_KEY
const backendUrl = process.env.BACKEND_URL
var headers = new Headers({
  Authorization: api || "",
})

export async function getData(prompt: string) {
  const tetsing = async () => {
    try {
      // "mukaist/DALLE-4K"
      const model = "mukaist/Midjourney"
      const client = await Client.connect(model)
      const result = await client.predict("/run", {
        prompt: prompt,
        negative_prompt:
          "deformed, distorted, disfigured , poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, mutated hands, disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation",
        use_negative_prompt: true,
        style: "Cinematic",
        seed: 0,
        width: 1024,
        height: 1024,
        guidance_scale: 6,
        randomize_seed: true,
      })

      const temp: [[]] = result.data as [[]]
      let res: string[] = []
      temp[0].map((e: any) => {
        res.push(e.image.url)
        console.log(e.image.url)
      })
      return res
    } catch (error: any) {
      console.log(error.message)
      return null
    }
  }

  return tetsing()
}

export async function getAudioFIles() {
  try {
    const getAudioFileReq = await fetch(`${backendUrl}audio/`, {
      headers: headers,
    })
    const audioJson = await getAudioFileReq.json()

    return audioJson
  } catch (error) {
    console.log("error", error)
    return null
  }
}

export async function getAudioPrompt(formData: ImageFormData) {
  try {
    console.log(formData.audio)
    const staticData = await fetch(
      `${backendUrl}storyline/?audio=${formData.audio}&temp=${formData.temperature}&prompt=${formData.prompt}`,
      {
        headers: headers,
      }
    ).then((res) => res.json())

    const jsonObj = JSON.parse(staticData.output)
    console.log(jsonObj)
    return jsonObj
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getSignedUrl(audioFile: string) {
  try {
    const storage = new Storage({
      keyFilename:
        "D:/projects/AI/AI-Powered-Music-Storyteller/frontend/temp/key.json",
    })

    const bucketName = process.env.BUCKET_NAME || ""
    const path = `audio/${audioFile}`

    const [url] = await storage
      .bucket(bucketName)
      .file(path)
      .getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      })
    //   console.log(url)
    return url
  } catch (error) {
    console.log("error", error)
    return null
  }
}

export const getSongSkit = async (audio: string) => {
  try {
    console.log(audio)
    const paramTest = await fetch(
      `${backendUrl}song-to-story/?audio=${audio}`,
      {
        headers: headers,
      }
    ).then((res) => res.json())
    const test = JSON.parse(paramTest.output)

    return test
    return null
  } catch (error) {
    return null
  }
}

export const testENV = async () => {
  try {
    const api = process.env.API_KEY
    console.log(api)
  } catch (error) {
    console.log(error)
  }
}
