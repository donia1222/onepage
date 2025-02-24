"use client"

import { useState, useEffect } from "react"
import { Form } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"

interface HeroData {
  id: number
  title: string
  subtitle: string
  backgroundUrl: string
}

interface EditHeroImagenProps {
  initialData: HeroData
  actionData?: HeroData
  onSave?: () => void
}

export default function EditHeroImagen({ initialData, actionData, onSave }: EditHeroImagenProps) {
  const [heroData, setHeroData] = useState<HeroData>(initialData)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (actionData) {
      setHeroData(actionData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }, [actionData])

  const handleImageUpload = async () => {
    if (!imageFile) return heroData.backgroundUrl

    const formData = new FormData()
    formData.append("file", imageFile)

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()
    if (result.success) {
      // Se guarda solo el nombre del archivo
      return result.filePath.split("/").pop()
    } else {
      console.error("Error uploading image:", result.error)
      return heroData.backgroundUrl
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const uploadedImageName = await handleImageUpload()

    const { data, error } = await supabase
    .from("hero")
    .upsert({ ...heroData, id: 1, backgroundurl: uploadedImageName })
    .select()
    .single()
  

    if (error) {
      console.error("Error updating hero:", error)
    } else {
      setHeroData(data)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      onSave?.()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Editar Hero</h2>
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">¡Éxito!</strong>
          <span className="block sm:inline"> Cambios guardados correctamente.</span>
        </div>
      )}
      <Form method="post" onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="title" className="block">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={heroData.title}
            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="block">Subtítulo:</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={heroData.subtitle}
            onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="backgroundFile" className="block">Subir Imagen de Fondo:</label>
          <input
            type="file"
            id="backgroundFile"
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
