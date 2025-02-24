"use client"

import { useState, useEffect } from "react"
import { supabase } from "~/lib/supabaseClient"

interface HeroData {
  id: number
  title: string
  subtitle: string
  backgroundurl: string
}

export default function HeroImagen() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)

  useEffect(() => {
    const fetchHeroData = async () => {
      const storedData = localStorage.getItem("heroData")
      if (storedData) {
        setHeroData(JSON.parse(storedData))
      }

      const { data, error } = await supabase.from("hero").select("*").eq("id", 1).single()

      if (!error && data) {
        setHeroData(data)
        localStorage.setItem("heroData", JSON.stringify(data))
      }
    }

    fetchHeroData()
    const intervalId = setInterval(fetchHeroData, 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (!heroData) return <div className="text-center p-4">Loading...</div>

  const imageUrl = heroData.backgroundurl
    ? heroData.backgroundurl.startsWith("http")
      ? heroData.backgroundurl
      : `/uploads/${heroData.backgroundurl.replace(/^uploads\//, "")}`
    : "/placeholder.svg"

  return (
    <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Fondo Hero"
            className="w-full h-full object-cover object-center animate-continuous-zoom"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative z-10 text-center text-white p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">{heroData.title}</h1>
        <p className="text-lg md:text-xl mb-6 animate-fade-in-up animation-delay-200">{heroData.subtitle}</p>
        <a
          href="#"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up animation-delay-400"
        >
          Descubre más
        </a>
      </div>
    </section>
  )
}

