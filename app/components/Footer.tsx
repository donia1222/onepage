"use client"

import { useState, useEffect } from "react"
import { supabase } from "~/lib/supabaseClient"

interface FooterData {
  id: number
  companyname: string
  phone: string
  logourl: string
  address: string
  country: string
  postal: string
  email: string
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  useEffect(() => {
    const fetchFooterData = async () => {
      const storedData = localStorage.getItem("footerData")
      if (storedData) {
        setFooterData(JSON.parse(storedData))
      }
      const { data, error } = await supabase
        .from("footer")
        .select("*")
        .eq("id", 1)
        .single()
      if (!error && data) {
        setFooterData(data)
        localStorage.setItem("footerData", JSON.stringify(data))
      }
    }
    fetchFooterData()
    const intervalId = setInterval(fetchFooterData, 5000)
    return () => clearInterval(intervalId)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = `Contacto desde la web: ${formData.name}`
    const body = `Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMensaje: ${formData.message}`
    window.location.href = `mailto:tu-email@dominio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const resolveImageUrl = (url?: string) => {
    if (!url) return "/placeholder.svg"
    return url.startsWith("http")
      ? url
      : `/uploads/${url.replace(/^uploads\//, "")}`
  }

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Datos de la empresa */}
        <div className="flex items-center space-x-4">
          {footerData && (
            <>
              <img
                src={resolveImageUrl(footerData.logourl)}
                alt="Logo"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold">{footerData.companyname}</h1>
                <p className="text-sm">Teléfono: {footerData.phone}</p>
                <p className="text-sm">Dirección: {footerData.address}</p>
                <p className="text-sm">
                  País: {footerData.country} - C.Postal: {footerData.postal}
                </p>
                <p className="text-sm">Email: {footerData.email}</p>
              </div>
            </>
          )}
        </div>
        {/* Formulario de contacto */}
        <div className="mt-6 md:mt-0 w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 text-black"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 text-black"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Mensaje"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300 text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}
