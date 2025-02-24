"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "~/lib/supabaseClient"

interface GalleryData {
  id: number
  title: string
  image1: string
  image2: string
  image3: string
  image4: string
  image5: string
  image6: string
}

export default function GalleryCarousel() {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const fetchGalleryData = useCallback(async () => {
    const storedData = localStorage.getItem("galleryData")
    if (storedData) {
      setGalleryData(JSON.parse(storedData))
    }

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("id", 1)
      .single()

    if (!error && data) {
      setGalleryData(data)
      localStorage.setItem("galleryData", JSON.stringify(data))
    }
  }, [])

  useEffect(() => {
    fetchGalleryData()
    // Actualiza cada 5 segundos (igual que en el Header)
    const intervalId = setInterval(fetchGalleryData, 5000)
    return () => clearInterval(intervalId)
  }, [fetchGalleryData])

  if (!galleryData) return <div className="text-center p-4">Loading...</div>

  const images = [
    galleryData.image1,
    galleryData.image2,
    galleryData.image3,
    galleryData.image4,
    galleryData.image5,
    galleryData.image6,
  ]

  const resolveImageUrl = (url: string) =>
    url.startsWith("http") ? url : `/uploads/${url.replace(/^uploads\//, "")}`

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-8">{galleryData.title}</h1>
        <div className="relative mx-auto w-full max-w-xl">
          <img
            src={resolveImageUrl(images[currentIndex]) || "/placeholder.svg"}
            alt={`Imagen ${currentIndex + 1}`}
            className="w-full h-64 object-cover rounded shadow-md"
          />
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
