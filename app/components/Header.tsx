"use client"

import { useState, useEffect } from "react"
import { supabase } from "~/lib/supabaseClient"
import NavigationPanel from "./NavLink";


interface HeaderData {
  id: number
  title: string
  subtitle: string
  logoUrl: string
}

export default function Header() {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null)

  useEffect(() => {
    const fetchHeaderData = async () => {
      const storedData = localStorage.getItem("headerData")
      if (storedData) {
        setHeaderData(JSON.parse(storedData))
      }

      const { data, error } = await supabase.from("header").select("*").eq("id", 1).single()
      if (!error && data) {
        setHeaderData(data)
        localStorage.setItem("headerData", JSON.stringify(data))
      }
    }

    fetchHeaderData()
    const intervalId = setInterval(fetchHeaderData, 5000)

    return () => clearInterval(intervalId)
  }, [])



  if (!headerData) return <div className="text-center p-4">Loading...</div>

  const imageUrl = headerData.logoUrl.startsWith("http")
    ? headerData.logoUrl
    : `/uploads/${headerData.logoUrl.replace(/^uploads\//, "")}`

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Logo"
            className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{headerData.title}</h1>
            <p className="text-sm text-blue-200 italic">{headerData.subtitle}</p>
          </div>
        </div>
        <NavigationPanel />
      </div>
    </header>
  )
}

