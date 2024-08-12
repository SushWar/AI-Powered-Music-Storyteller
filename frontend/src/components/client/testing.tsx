"use server"
import { Storage } from "@google-cloud/storage"

const storage = new Storage({
  keyFilename:
    "D:/projects/AI/AI-Powered-Music-Storyteller/frontend/temp/key.json",
})

const bucketName = "proj-audio-files"

async function listFiles() {
  try {
    // const [files] = await storage.bucket(bucketName).getFiles()
    const a = await storage.bucket(bucketName)

    // console.log(files)
  } catch (error: any) {
    console.log("error while fetching", error.message)
  }
}

// try {
//   console.log("Started the func")
//   listFiles()
// } catch (error) {
//   console.log(error)
// }

export { listFiles }
