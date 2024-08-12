import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

import { Client } from "@gradio/client"
async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    try {
      const client = await Client.connect("mukaist/DALLE-4K")
      const result = await client.predict("/run", {
        prompt:
          "A crowded dance floor, filled with people moving to the beat. The couple stands on the edge, watching the others, their faces reflecting a mixture of longing and isolation.",
        negative_prompt:
          "(deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation",
        use_negative_prompt: true,
        style: "3840 x 2160",
        seed: 0,
        width: 1024,
        height: 1024,
        guidance_scale: 5,
        randomize_seed: true,
      })

      const temp: [[]] = result.data as [[]]
      let res: string[] = []
      temp[0].map((e: any) => {
        res.push(e.image.url)
        console.log(e.image.url)
      })
      return NextResponse.json({ data: res })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ data: null })
    }
  }
}

export { handler as GET }
