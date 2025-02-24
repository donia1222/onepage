"use client"

import { useState, useEffect } from "react"
import { supabase } from "~/lib/supabaseClient"

interface OfferData {
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

export default function WhatWeOffer() {
  const [offerData, setOfferData] = useState<OfferData | null>(null)

  useEffect(() => {
    const fetchOfferData = async () => {
      // Recupera datos cacheados en localStorage
      const storedData = localStorage.getItem("offerData")
      if (storedData) {
        setOfferData(JSON.parse(storedData))
      }
      // Consulta el registro con id = 1
      const { data, error } = await supabase
        .from("offer")
        .select("*")
        .eq("id", 1)
        .single()

      if (!error && data) {
        setOfferData(data)
        localStorage.setItem("offerData", JSON.stringify(data))
      }
    }

    fetchOfferData()
    const intervalId = setInterval(fetchOfferData, 5000)
    return () => clearInterval(intervalId)
  }, [])

  if (!offerData) return <div className="text-center p-4">Loading...</div>

  // Función para resolver la URL de la imagen: si empieza con "http" se usa tal cual, si no, se carga desde /uploads.
  const resolveImageUrl = (url: string) =>
    url.startsWith("http") ? url : `/uploads/${url.replace(/^uploads\//, "")}`

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Título y descripción principal */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{offerData.maintitle}</h1>
          <p className="mt-4 text-lg">{offerData.maindescription}</p>
        </div>
        {/* Tres bloques uno al lado del otro */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* Bloque 1 */}
          <div className="flex-1 bg-gray-100 shadow rounded p-4 text-center">
            <img
              src={resolveImageUrl(offerData.block1image) || "/placeholder.svg"}
              alt={offerData.block1title}
              className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
            />
            <h2 className="text-2xl font-semibold">{offerData.block1title}</h2>
            <p className="mt-2">{offerData.block1description}</p>
          </div>
          {/* Bloque 2 */}
          <div className="flex-1 bg-gray-100 shadow rounded p-4 text-center">
            <img
              src={resolveImageUrl(offerData.block2image) || "/placeholder.svg"}
              alt={offerData.block2title}
              className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
            />
            <h2 className="text-2xl font-semibold">{offerData.block2title}</h2>
            <p className="mt-2">{offerData.block2description}</p>
          </div>
          {/* Bloque 3 */}
          <div className="flex-1 bg-gray-100 shadow rounded p-4 text-center">
            <img
              src={resolveImageUrl(offerData.block3image) || "/placeholder.svg"}
              alt={offerData.block3title}
              className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
            />
            <h2 className="text-2xl font-semibold">{offerData.block3title}</h2>
            <p className="mt-2">{offerData.block3description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}