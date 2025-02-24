"use client"

import { useState, useEffect } from "react"
import { Form } from "@remix-run/react"
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

interface EditFooterProps {
  initialData: FooterData
  actionData?: FooterData
  onSave?: () => void
}

export default function EditFooter({ initialData, actionData, onSave }: EditFooterProps) {
  const [footerData, setFooterData] = useState<FooterData>(initialData)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (actionData) {
      setFooterData(actionData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }, [actionData])

  const handleImageUpload = async () => {
    if (!imageFile) return footerData.logourl

    const formData = new FormData()
    formData.append("file", imageFile)

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()
    if (result.success) {
      return result.filePath.split("/").pop()
    } else {
      console.error("Error uploading image:", result.error)
      return footerData.logourl
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const uploadedLogoUrl = await handleImageUpload()

    const updatedData = {
      ...footerData,
      id: 1,
      logourl: uploadedLogoUrl,
    }

    const { data, error } = await supabase
      .from("footer")
      .upsert(updatedData)
      .select()
      .single()

    if (error) {
      console.error("Error updating footer:", error)
    } else {
      console.log("Footer updated:", data)
      setFooterData(data)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      window.dispatchEvent(new Event("footerUpdated"))
      onSave?.()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Editar Footer</h2>
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">¡Éxito!</strong>
          <span className="block sm:inline"> Cambios guardados correctamente.</span>
        </div>
      )}
      <Form method="post" onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="companyname" className="block">Nombre de la Empresa:</label>
          <input
            type="text"
            id="companyname"
            name="companyname"
            value={footerData.companyname}
            onChange={(e) => setFooterData({ ...footerData, companyname: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block">Teléfono:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={footerData.phone}
            onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="address" className="block">Dirección:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={footerData.address}
            onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="country" className="block">País:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={footerData.country}
            onChange={(e) => setFooterData({ ...footerData, country: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="postal" className="block">Código Postal:</label>
          <input
            type="text"
            id="postal"
            name="postal"
            value={footerData.postal}
            onChange={(e) => setFooterData({ ...footerData, postal: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email de Contacto:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={footerData.email}
            onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="logoFile" className="block">Subir Logo:</label>
          <input
            type="file"
            id="logoFile"
            name="logoFile"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar Cambios
        </button>
      </Form>
    </div>
  )
}
