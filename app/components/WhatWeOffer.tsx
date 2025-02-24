"use client"

import { useState, useEffect } from "react"
import { supabase } from "~/lib/supabaseClient"
import { Briefcase, Lightbulb, Users } from "lucide-react"

interface OfferData {
  id: number
  maintitle: string
  maindescription: string
  block1title: string
  block1description: string
  block2title: string
  block2description: string
  block3title: string
  block3description: string
}

export default function WhatWeOffer() {
  const [offerData, setOfferData] = useState<OfferData | null>(null)

  useEffect(() => {
    const fetchOfferData = async () => {
      const storedData = localStorage.getItem("offerData")
      if (storedData) {
        setOfferData(JSON.parse(storedData))
      }
      const { data, error } = await supabase.from("offer").select("*").eq("id", 1).single()

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

  const iconComponents = [Briefcase, Lightbulb, Users]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{offerData.maintitle}</h1>
          <p className="mt-4 text-lg">{offerData.maindescription}</p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {[
            { title: offerData.block1title, description: offerData.block1description },
            { title: offerData.block2title, description: offerData.block2description },
            { title: offerData.block3title, description: offerData.block3description },
          ].map((block, index) => {
            const IconComponent = iconComponents[index]
            return (
              <div key={index} className="flex-1 bg-gray-100 shadow rounded p-4 text-center">
                <div className="mx-auto mb-4 w-24 h-24 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                  <IconComponent size={48} />
                </div>
                <h2 className="text-2xl font-semibold">{block.title}</h2>
                <p className="mt-2">{block.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

