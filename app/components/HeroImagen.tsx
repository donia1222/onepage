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

      const { data, error } = await supabase
        .from("hero")
        .select("*")
        .eq("id", 1)
        .single()

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
  ? (heroData.backgroundurl.startsWith("http")
      ? heroData.backgroundurl
      : `/uploads/${heroData.backgroundurl.replace(/^uploads\//, "")}`)
  : "/placeholder.svg";


  return (
    <section className="relative h-96 flex items-center justify-center">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt="Fondo Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-center text-white p-4 bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold">{heroData.title}</h1>
        <p className="mt-2 text-lg">{heroData.subtitle}</p>
      </div>
    </section>
  )
}
