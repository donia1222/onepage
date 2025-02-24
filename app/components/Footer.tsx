"use client"

import type React from "react"

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
    message: "",
  })

  useEffect(() => {
    const fetchFooterData = async () => {
      const storedData = localStorage.getItem("footerData")
      if (storedData) {
        setFooterData(JSON.parse(storedData))
      }
      const { data, error } = await supabase.from("footer").select("*").eq("id", 1).single()
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
    window.location.href = `mailto:${footerData?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const resolveImageUrl = (url?: string) => {
    if (!url) return "/placeholder.svg"
    return url.startsWith("http") ? url : `/uploads/${url.replace(/^uploads\//, "")}`
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Datos de la empresa */}
          <div className="space-y-6">
            {footerData && (
              <>
                <div className="flex items-center space-x-4">
                  <img
                    src={resolveImageUrl(footerData.logourl) || "/placeholder.svg"}
                    alt="Logo"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h1 className="text-2xl font-bold">{footerData.companyname}</h1>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center">
                   {footerData.phone}
                  </p>
                  <p className="flex items-center">
                  {footerData.address}, {footerData.country} - {footerData.postal}
                  </p>
                  <p className="flex items-center">
                 {footerData.email}
                  </p>
                </div>
              </>
            )}
          </div>
          {/* Formulario de contacto */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contáctanos</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
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
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Mensaje"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {footerData?.companyname}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

