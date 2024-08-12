import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { Storage } from "@google-cloud/storage"

async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    try {
      const storage = new Storage({
        keyFilename:
          "D:/projects/AI/AI-Powered-Music-Storyteller/frontend/temp/key.json",
      })

      const bucketName = "proj-audio-files"
      const path =
        "audio/Ed Sheeran - Beautiful People (feat. Khalid) [Official Video].mp3"
      // const bucket = await storage.bucket(bucketName)
      // const file = await bucket.file(path)
      const options1 = {
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      }
      const [url] = await storage
        .bucket(bucketName)
        .file(path)
        .getSignedUrl({
          version: "v4",
          action: "read",
          expires: Date.now() + 15 * 60 * 1000,
        })
      //   console.log(url)
      return NextResponse.json({ data: null })
    } catch (error) {
      console.log("error", error)
      return NextResponse.json({ data: null })
    }
  }
}

export { handler as GET }
