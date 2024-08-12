import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/client/navbar"
import { Footer } from "@/components/client/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TuneStory",
  description: `AI Music Storyteller is an innovative project that leverages artificial intelligence to convert audio into captivating visual stories. By analyzing the intricacies of music, including rhythm, melody, and emotion, our model generates a series of AI-generated images that seamlessly synchronize with the audio. Explore the fusion of art, technology, and music in this groundbreaking project`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="overflow-hidden scroll-smooth">{children}</main>

        <Footer />
      </body>
    </html>
  )
}
