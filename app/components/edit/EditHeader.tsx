"use client"

import { useState, useEffect } from "react"
import { Form } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"

interface HeaderData {
  id: number
  title: string
  subtitle: string
  logoUrl: string
}

interface EditHeaderProps {
  initialData: HeaderData
  actionData?: HeaderData
  onSave?: () => void
}

export default function EditHeader({ initialData, actionData, onSave }: EditHeaderProps) {
  const [headerData, setHeaderData] = useState<HeaderData>(initialData)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (actionData) {
      setHeaderData(actionData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }, [actionData])

  const handleImageUpload = async () => {
    if (!imageFile) return headerData.logoUrl

    const formData = new FormData()
    formData.append("file", imageFile)

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()
    if (result.success) {
      return result.filePath.split("/").pop() // 🔥 GUARDA SOLO EL NOMBRE DEL ARCHIVO
    } else {
      console.error("Error uploading image:", result.error)
      return headerData.logoUrl
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const uploadedImageUrl = await handleImageUpload()

    const { data, error } = await supabase
      .from("header")
      .upsert({ ...headerData, id: 1, logoUrl: uploadedImageUrl })
      .select()
      .single()

    if (error) {
      console.error("Error updating header:", error)
    } else {
      setHeaderData(data)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      onSave?.()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Header</h2>
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Changes saved successfully.</span>
        </div>
      )}
      <Form
        method="post"
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="title" className="block">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={headerData.title}
            onChange={(e) =>
              setHeaderData({ ...headerData, title: e.target.value })
            }
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="block">
            Subtitle:
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={headerData.subtitle}
            onChange={(e) =>
              setHeaderData({ ...headerData, subtitle: e.target.value })
            }
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="logoFile" className="block">
            Upload Logo:
          </label>
          <input
            type="file"
            id="logoFile"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </Form>
    </div>
  )
}
