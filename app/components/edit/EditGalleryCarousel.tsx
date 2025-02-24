"use client"

import { useState, useEffect } from "react"
import { Form } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"

interface GalleryData {
  id: number
  title: string
  image1: string
  image2: string
  image3: string
  image4: string
  image5: string
  image6: string
}

interface EditGalleryCarouselProps {
  initialData: GalleryData
  actionData?: GalleryData
  onSave?: () => void
}

export default function EditGalleryCarousel({ initialData, actionData, onSave }: EditGalleryCarouselProps) {
  const [galleryData, setGalleryData] = useState<GalleryData>(initialData)
  const [imageFile1, setImageFile1] = useState<File | null>(null)
  const [imageFile2, setImageFile2] = useState<File | null>(null)
  const [imageFile3, setImageFile3] = useState<File | null>(null)
  const [imageFile4, setImageFile4] = useState<File | null>(null)
  const [imageFile5, setImageFile5] = useState<File | null>(null)
  const [imageFile6, setImageFile6] = useState<File | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (actionData) {
      setGalleryData(actionData)
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
      // Guarda solo el nombre del archivo
      return result.filePath.split("/").pop()
    } else {
      console.error("Error uploading image:", result.error)
      return currentImage
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const uploadedImage1 = await handleImageUpload(imageFile1, galleryData.image1)
    const uploadedImage2 = await handleImageUpload(imageFile2, galleryData.image2)
    const uploadedImage3 = await handleImageUpload(imageFile3, galleryData.image3)
    const uploadedImage4 = await handleImageUpload(imageFile4, galleryData.image4)
    const uploadedImage5 = await handleImageUpload(imageFile5, galleryData.image5)
    const uploadedImage6 = await handleImageUpload(imageFile6, galleryData.image6)

    const updatedData = {
      ...galleryData,
      id: 1,
      image1: uploadedImage1,
      image2: uploadedImage2,
      image3: uploadedImage3,
      image4: uploadedImage4,
      image5: uploadedImage5,
      image6: uploadedImage6,
    }

    const { data, error } = await supabase
      .from("gallery")
      .upsert(updatedData)
      .select()
      .single()

    if (error) {
      console.error("Error updating gallery:", error)
    } else {
      setGalleryData(data)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      // Despacha el evento para actualizar el carrusel
      window.dispatchEvent(new Event("galleryUpdated"))
      onSave?.()
    }
  }

  // Función para obtener la URL completa de la imagen
  const getImageUrl = (image: string) =>
    image.startsWith("http") ? image : `/uploads/${image.replace(/^uploads\//, "")}`

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Editar Galería</h2>
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
            value={galleryData.title}
            onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        {/* Imagen 1 */}
        <div>
          <label htmlFor="image1" className="block">Imagen 1:</label>
          <input
            type="file"
            id="image1"
            name="image1"
            accept="image/*"
            onChange={(e) => setImageFile1(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
          {galleryData.image1 && (
            <img
              src={getImageUrl(galleryData.image1)}
              alt="Preview imagen 1"
              className="mt-2 max-w-xs rounded shadow"
            />
          )}
        </div>
        {/* Imagen 2 */}
        <div>
          <label htmlFor="image2" className="block">Imagen 2:</label>
          <input
            type="file"
            id="image2"
            name="image2"
            accept="image/*"
            onChange={(e) => setImageFile2(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
          {galleryData.image2 && (
            <img
              src={getImageUrl(galleryData.image2)}
              alt="Preview imagen 2"
              className="mt-2 max-w-xs rounded shadow"
            />
          )}
        </div>
        {/* Imagen 3 */}
        <div>
          <label htmlFor="image3" className="block">Imagen 3:</label>
          <input
            type="file"
            id="image3"
            name="image3"
            accept="image/*"
            onChange={(e) => setImageFile3(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
          {galleryData.image3 && (
            <img
              src={getImageUrl(galleryData.image3)}
              alt="Preview imagen 3"
              className="mt-2 max-w-xs rounded shadow"
            />
          )}
        </div>
        {/* Imagen 4 */}
        <div>
          <label htmlFor="image4" className="block">Imagen 4:</label>
          <input
            type="file"
            id="image4"
            name="image4"
            accept="image/*"
            onChange={(e) => setImageFile4(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
          {galleryData.image4 && (
            <img
              src={getImageUrl(galleryData.image4)}
              alt="Preview imagen 4"
              className="mt-2 max-w-xs rounded shadow"
            />
          )}
        </div>
        {/* Imagen 5 */}
        <div>
          <label htmlFor="image5" className="block">Imagen 5:</label>
          <input
            type="file"
            id="image5"
            name="image5"
            accept="image/*"
            onChange={(e) => setImageFile5(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
          {galleryData.image5 && (
            <img
              src={getImageUrl(galleryData.image5)}
              alt="Preview imagen 5"
              className="mt-2 max-w-xs rounded shadow"
            />
          )}
        </div>
        {/* Imagen 6 */}
        <div>
          <label htmlFor="image6" className="block">Imagen 6:</label>
          <input
            type="file"
            id="image6"
            name="image6"
            accept="image/*"
            onChange={(e) => setImageFile6(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
          {galleryData.image6 && (
            <img
              src={getImageUrl(galleryData.image6)}
              alt="Preview imagen 6"
              className="mt-2 max-w-xs rounded shadow"
            />
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Guardar Cambios
        </button>
      </Form>
    </div>
  )
}
