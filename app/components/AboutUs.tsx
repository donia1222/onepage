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

      const { data, error } = await supabase
        .from("about")
        .select("*")
        .eq("id", 1)
        .single()

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

  // Función para resolver la URL de la imagen (si empieza con http, se usa tal cual, de lo contrario se carga de /uploads)
  const resolveImageUrl = (url: string) =>
    url.startsWith("http") ? url : `/uploads/${url.replace(/^uploads\//, "")}`

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Título y descripción principal */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{aboutData.maintitle}</h1>
          <p className="mt-4 text-lg">{aboutData.maindescription}</p>
        </div>
        {/* Tres bloques lado a lado */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* Bloque 1 */}
          <div className="flex-1 bg-white shadow-lg rounded p-4 text-center">
            <img
              src={resolveImageUrl(aboutData.block1image) || "/placeholder.svg"}
              alt={aboutData.block1title}
              className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
            />
            <h2 className="text-2xl font-semibold">{aboutData.block1title}</h2>
            <p className="mt-2">{aboutData.block1description}</p>
          </div>
          {/* Bloque 2 */}
          <div className="flex-1 bg-white shadow-lg rounded p-4 text-center">
            <img
              src={resolveImageUrl(aboutData.block2image) || "/placeholder.svg"}
              alt={aboutData.block2title}
              className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
            />
            <h2 className="text-2xl font-semibold">{aboutData.block2title}</h2>
            <p className="mt-2">{aboutData.block2description}</p>
          </div>
          {/* Bloque 3 */}
          <div className="flex-1 bg-white shadow-lg rounded p-4 text-center">
            <img
              src={resolveImageUrl(aboutData.block3image) || "/placeholder.svg"}
              alt={aboutData.block3title}
              className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
            />
            <h2 className="text-2xl font-semibold">{aboutData.block3title}</h2>
            <p className="mt-2">{aboutData.block3description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
