"use client"

import { useState, useEffect } from "react"
import { Form } from "@remix-run/react"
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

interface EditWhatWeOfferProps {
  initialData: OfferData
  actionData?: OfferData
  onSave?: () => void
}

export default function EditWhatWeOffer({ initialData, actionData, onSave }: EditWhatWeOfferProps) {
  const [offerData, setOfferData] = useState<OfferData>(initialData)
  const [imageFile1, setImageFile1] = useState<File | null>(null)
  const [imageFile2, setImageFile2] = useState<File | null>(null)
  const [imageFile3, setImageFile3] = useState<File | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (actionData) {
      setOfferData(actionData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }, [actionData])

  const resolveImageUrl = (url?: string) => {
    if (!url) return ""
    return url.startsWith("http")
      ? url
      : `/uploads/${url.replace(/^uploads\//, "")}`
  }

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
      // Guarda solo el nombre del archivo
      return result.filePath.split("/").pop()
    } else {
      console.error("Error uploading image:", result.error)
      return currentImage
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const uploadedImage1 = await handleImageUpload(imageFile1, offerData.block1image)
    const uploadedImage2 = await handleImageUpload(imageFile2, offerData.block2image)
    const uploadedImage3 = await handleImageUpload(imageFile3, offerData.block3image)

    const updatedData = {
      ...offerData,
      id: 1,
      block1image: uploadedImage1,
      block2image: uploadedImage2,
      block3image: uploadedImage3,
    }

    const { data, error } = await supabase
      .from("offer")
      .upsert(updatedData)
      .select()
      .single()

    if (error) {
      console.error("Error updating offer:", error)
    } else {
      setOfferData(data)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      onSave?.()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Editar Lo que Ofrecemos</h2>
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <button
            onClick={() => setSaveSuccess(false)}
            className="absolute top-0 right-0 p-1 text-green-700 hover:text-green-900"
          >
            X
          </button>
          <strong className="font-bold">¡Éxito!</strong>
          <span className="ml-2">Cambios guardados correctamente.</span>
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
            value={offerData.maintitle}
            onChange={(e) => setOfferData({ ...offerData, maintitle: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="maindescription" className="block">Descripción Principal:</label>
          <textarea
            id="maindescription"
            name="maindescription"
            value={offerData.maindescription}
            onChange={(e) => setOfferData({ ...offerData, maindescription: e.target.value })}
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
            value={offerData.block1title}
            onChange={(e) => setOfferData({ ...offerData, block1title: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="block1description" className="block">Descripción Bloque 1:</label>
          <textarea
            id="block1description"
            name="block1description"
            value={offerData.block1description}
            onChange={(e) => setOfferData({ ...offerData, block1description: e.target.value })}
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
          {imageFile1 ? (
            <img
              src={URL.createObjectURL(imageFile1)}
              alt="Preview Bloque 1"
              className="mt-2 h-20 object-contain"
            />
          ) : offerData.block1image ? (
            <img
              src={resolveImageUrl(offerData.block1image)}
              alt="Imagen Bloque 1"
              className="mt-2 h-20 object-contain"
            />
          ) : null}
          <button
            type="button"
            onClick={() => {
              setOfferData({ ...offerData, block1image: "" })
              setImageFile1(null)
            }}
            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
          >
            Eliminar Imagen
          </button>
        </div>
        {/* Bloque 2 */}
        <h3 className="text-lg font-bold mt-4">Bloque 2</h3>
        <div>
          <label htmlFor="block2title" className="block">Título Bloque 2:</label>
          <input
            type="text"
            id="block2title"
            name="block2title"
            value={offerData.block2title}
            onChange={(e) => setOfferData({ ...offerData, block2title: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="block2description" className="block">Descripción Bloque 2:</label>
          <textarea
            id="block2description"
            name="block2description"
            value={offerData.block2description}
            onChange={(e) => setOfferData({ ...offerData, block2description: e.target.value })}
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
          {imageFile2 ? (
            <img
              src={URL.createObjectURL(imageFile2)}
              alt="Preview Bloque 2"
              className="mt-2 h-20 object-contain"
            />
          ) : offerData.block2image ? (
            <img
              src={resolveImageUrl(offerData.block2image)}
              alt="Imagen Bloque 2"
              className="mt-2 h-20 object-contain"
            />
          ) : null}
          <button
            type="button"
            onClick={() => {
              setOfferData({ ...offerData, block2image: "" })
              setImageFile2(null)
            }}
            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
          >
            Eliminar Imagen
          </button>
        </div>
        {/* Bloque 3 */}
        <h3 className="text-lg font-bold mt-4">Bloque 3</h3>
        <div>
          <label htmlFor="block3title" className="block">Título Bloque 3:</label>
          <input
            type="text"
            id="block3title"
            name="block3title"
            value={offerData.block3title}
            onChange={(e) => setOfferData({ ...offerData, block3title: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="block3description" className="block">Descripción Bloque 3:</label>
          <textarea
            id="block3description"
            name="block3description"
            value={offerData.block3description}
            onChange={(e) => setOfferData({ ...offerData, block3description: e.target.value })}
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
          {imageFile3 ? (
            <img
              src={URL.createObjectURL(imageFile3)}
              alt="Preview Bloque 3"
              className="mt-2 h-20 object-contain"
            />
          ) : offerData.block3image ? (
            <img
              src={resolveImageUrl(offerData.block3image)}
              alt="Imagen Bloque 3"
              className="mt-2 h-20 object-contain"
            />
          ) : null}
          <button
            type="button"
            onClick={() => {
              setOfferData({ ...offerData, block3image: "" })
              setImageFile3(null)
            }}
            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
          >
            Eliminar Imagen
          </button>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Guardar Cambios
        </button>
      </Form>
    </div>
  )
}
