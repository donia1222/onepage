"use client"

import { useState, useEffect } from "react"
import { Form } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"

interface AboutData {
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

interface EditAboutUsProps {
  initialData: AboutData
  actionData?: AboutData
  onSave?: () => void
}

export default function EditAboutUs({ initialData, actionData, onSave }: EditAboutUsProps) {
  const [aboutData, setAboutData] = useState<AboutData>(initialData)
  const [imageFile1, setImageFile1] = useState<File | null>(null)
  const [imageFile2, setImageFile2] = useState<File | null>(null)
  const [imageFile3, setImageFile3] = useState<File | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (actionData) {
      setAboutData(actionData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }, [actionData])

  const handleImageUpload = async (file: File | null, currentImage: string) => {
    if (!file) return currentImage

    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()
    if (result.success) {
      return result.filePath.split("/").pop() // Guarda solo el nombre del archivo
    } else {
      console.error("Error uploading image:", result.error)
      return currentImage
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const uploadedImage1 = await handleImageUpload(imageFile1, aboutData.block1image)
    const uploadedImage2 = await handleImageUpload(imageFile2, aboutData.block2image)
    const uploadedImage3 = await handleImageUpload(imageFile3, aboutData.block3image)

    const updatedData = {
      ...aboutData,
      id: 1,
      block1image: uploadedImage1,
      block2image: uploadedImage2,
      block3image: uploadedImage3,
    }

    const { data, error } = await supabase
      .from("about")
      .upsert(updatedData)
      .select()
      .single()

    if (error) {
      console.error("Error updating about us:", error)
    } else {
      setAboutData(data)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      onSave?.()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Editar Sobre Nosotros</h2>
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">¡Éxito!</strong>
          <span className="block sm:inline"> Cambios guardados correctamente.</span>
        </div>
      )}
      <Form method="post" onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Información principal */}
        <div>
          <label htmlFor="maintitle" className="block">Título Principal:</label>
          <input
            type="text"
            id="maintitle"
            name="maintitle"
            value={aboutData.maintitle}
            onChange={(e) => setAboutData({ ...aboutData, maintitle: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="maindescription" className="block">Descripción Principal:</label>
          <textarea
            id="maindescription"
            name="maindescription"
            value={aboutData.maindescription}
            onChange={(e) => setAboutData({ ...aboutData, maindescription: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        {/* Bloque 1 */}
        <h3 className="text-lg font-bold mt-4">Bloque 1</h3>
        <div>
          <label htmlFor="block1title" className="block">Título Bloque 1:</label>
          <input
            type="text"
            id="block1title"
            name="block1title"
            value={aboutData.block1title}
            onChange={(e) => setAboutData({ ...aboutData, block1title: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="block1description" className="block">Descripción Bloque 1:</label>
          <textarea
            id="block1description"
            name="block1description"
            value={aboutData.block1description}
            onChange={(e) => setAboutData({ ...aboutData, block1description: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="block1image" className="block">Imagen Bloque 1:</label>
          <input
            type="file"
            id="block1image"
            name="block1image"
            accept="image/*"
            onChange={(e) => setImageFile1(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
        </div>
        {/* Bloque 2 */}
        <h3 className="text-lg font-bold mt-4">Bloque 2</h3>
        <div>
          <label htmlFor="block2title" className="block">Título Bloque 2:</label>
          <input
            type="text"
            id="block2title"
            name="block2title"
            value={aboutData.block2title}
            onChange={(e) => setAboutData({ ...aboutData, block2title: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="block2description" className="block">Descripción Bloque 2:</label>
          <textarea
            id="block2description"
            name="block2description"
            value={aboutData.block2description}
            onChange={(e) => setAboutData({ ...aboutData, block2description: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="block2image" className="block">Imagen Bloque 2:</label>
          <input
            type="file"
            id="block2image"
            name="block2image"
            accept="image/*"
            onChange={(e) => setImageFile2(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
        </div>
        {/* Bloque 3 */}
        <h3 className="text-lg font-bold mt-4">Bloque 3</h3>
        <div>
          <label htmlFor="block3title" className="block">Título Bloque 3:</label>
          <input
            type="text"
            id="block3title"
            name="block3title"
            value={aboutData.block3title}
            onChange={(e) => setAboutData({ ...aboutData, block3title: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="block3description" className="block">Descripción Bloque 3:</label>
          <textarea
            id="block3description"
            name="block3description"
            value={aboutData.block3description}
            onChange={(e) => setAboutData({ ...aboutData, block3description: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="block3image" className="block">Imagen Bloque 3:</label>
          <input
            type="file"
            id="block3image"
            name="block3image"
            accept="image/*"
            onChange={(e) => setImageFile3(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Guardar Cambios
        </button>
      </Form>
    </div>
  )
}
