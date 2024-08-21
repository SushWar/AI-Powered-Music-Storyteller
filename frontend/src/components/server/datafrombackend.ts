"use server"
import { Client } from "@gradio/client"
import { Storage } from "@google-cloud/storage"
import { ImageFormData } from "../interface"
import { log } from "../logging"

const api = process.env.API_KEY
const backendUrl = process.env.BACKEND_URL
var headers = new Headers({
  Authorization: api || "",
})

export async function getImagesApi(prompt: string) {
  try {
    log("Triggered getImagesApi function")
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
    log(error.message, "error")
    return null
  }
}

export async function getAudioFiles() {
  try {
    log("Triggered getAudioFiles function")
    const getAudioFileReq = await fetch(`${backendUrl}audio/`, {
      headers: headers,
    })
    const audioJson = await getAudioFileReq.json()

    return audioJson
  } catch (error: any) {
    log(error.message, "error")
    return null
  }
}

export async function getAudioPrompt(formData: ImageFormData) {
  try {
    log("Triggered getAudioPrompt function")
    const staticData = await fetch(
      `${backendUrl}storyline/?audio=${formData.audio}&temp=${formData.temperature}&prompt=${formData.prompt}`,
      {
        headers: headers,
      }
    ).then((res) => res.json())

    const jsonObj = JSON.parse(staticData.output)
    return jsonObj
  } catch (error: any) {
    log(error.message, "error")
    return null
  }
}

export async function getSignedUrl(audioFile: string) {
  try {
    log("Triggered getSignedUrl function")
    if (process.env.CLIENT_SECRET) {
      log("Client Secret is present")
      const newClientSecret = JSON.parse(process.env.CLIENT_SECRET)

      const storage = new Storage({
        keyFilename: newClientSecret,
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
      return url
    }
    return null
  } catch (error: any) {
    log(error.message, "error")
    return null
  }
}

export const getSongSkit = async (audio: string) => {
  try {
    log("Triggered getSongSkit function")
    const paramTest = await fetch(
      `${backendUrl}song-to-story/?audio=${audio}`,
      {
        headers: headers,
      }
    ).then((res) => res.json())
    const test = JSON.parse(paramTest.output)

    return test
  } catch (error: any) {
    log(error.message, "error")
    return null
  }
}
