"use client"

import { useState, useEffect } from "react"
import { supabase } from "~/lib/supabaseClient"

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
      const { data, error } = await supabase.from("header").select("*").eq("id", 1).single()

      if (error) {
        console.error("Error loading header data:", error)
      } else {
        setHeaderData(data)
        localStorage.setItem("headerData", JSON.stringify(data))
      }
    }

    // Función para verificar actualizaciones
    const checkForUpdates = async () => {
      const storedData = localStorage.getItem("headerData")
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setHeaderData(parsedData)
      }
      await fetchHeaderData()
    }

    // Realizar la primera carga
    fetchHeaderData()

    // Configurar un intervalo para verificar actualizaciones cada 5 segundos
    const intervalId = setInterval(checkForUpdates, 5000)

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId)
  }, [])

  // Función para forzar una actualización inmediata
  const forceUpdate = async () => {
    const { data, error } = await supabase.from("header").select("*").eq("id", 1).single()
    if (!error && data) {
      setHeaderData(data)
      localStorage.setItem("headerData", JSON.stringify(data))
    }
  }

  if (!headerData) return <div>Loading...</div>

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <img src={headerData.logoUrl || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
        <div>
          <h1 className="text-2xl font-bold">{headerData.title}</h1>
          <p>{headerData.subtitle}</p>
        </div>
        <button onClick={forceUpdate} className="bg-white text-blue-500 px-4 py-2 rounded">
          Refresh
        </button>
      </div>
    </header>
  )
}

