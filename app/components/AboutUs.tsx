"use client"

import { useState, useEffect } from "react"
import { supabase } from "~/lib/supabaseClient"

interface AboutData {
  id: number
  maintitle: string
  maindescription: string
  block1image: string
  block1title: string
  block1description: string
  block2image: string
  block2title: string
  block2description: string
  block3image: string
  block3title: string
  block3description: string
}

export default function AboutUs() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      const storedData = localStorage.getItem("aboutData")
      if (storedData) {
        setAboutData(JSON.parse(storedData))
      }

      const { data, error } = await supabase.from("about").select("*").eq("id", 1).single()

      if (!error && data) {
        setAboutData(data)
        localStorage.setItem("aboutData", JSON.stringify(data))
      }
    }

    fetchAboutData()
    const intervalId = setInterval(fetchAboutData, 5000)
    return () => clearInterval(intervalId)
  }, [])

  if (!aboutData) return <div className="text-center p-4">Loading...</div>

  const resolveImageUrl = (url: string) => (url.startsWith("http") ? url : `/uploads/${url.replace(/^uploads\//, "")}`)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{aboutData.maintitle}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{aboutData.maindescription}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { image: aboutData.block1image, title: aboutData.block1title, description: aboutData.block1description },
            { image: aboutData.block2image, title: aboutData.block2title, description: aboutData.block2description },
            { image: aboutData.block3image, title: aboutData.block3title, description: aboutData.block3description },
          ].map((block, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-102"
            >
              <img
                src={resolveImageUrl(block.image) || "/placeholder.svg"}
                alt={block.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{block.title}</h2>
                <p className="text-sm text-gray-600">{block.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

