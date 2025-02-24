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

    const { data, error } = await supabase.from("gallery").select("*").eq("id", 1).single()

    if (!error && data) {
      setGalleryData(data)
      localStorage.setItem("galleryData", JSON.stringify(data))
    }
  }, [])

  useEffect(() => {
    fetchGalleryData()
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

  const resolveImageUrl = (url: string) => (url.startsWith("http") ? url : `/uploads/${url.replace(/^uploads\//, "")}`)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">{galleryData.title}</h1>
        <div className="relative mx-auto w-full max-w-3xl">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src={resolveImageUrl(images[currentIndex]) || "/placeholder.svg"}
              alt={`Imagen ${currentIndex + 1}`}
              className="w-full h-[400px] object-cover transition-opacity duration-500"
            />
          </div>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Previous image"
          >

          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Next image"
          >

          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

