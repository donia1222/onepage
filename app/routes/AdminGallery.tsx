import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"
import EditGalleryCarousel from "~/components/edit/EditGalleryCarousel"
import { useEffect, useState } from "react"



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

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("id", 1)
    .single()

  if (error) {
    console.error("Error fetching gallery data:", error)
    throw new Error(error.message)
  }

  return json(data)
}

export default function AdminGallery() {
  const loaderData = useLoaderData<GalleryData>()
  const fetcher = useFetcher()
  const [galleryData, setGalleryData] = useState<GalleryData>(loaderData)
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }


  useEffect(() => {
    if (fetcher.data && typeof fetcher.data === "object" && "id" in fetcher.data) {
      setGalleryData(fetcher.data as GalleryData)
    }
  }, [fetcher.data])

  return (
    <div className="container mx-auto p-4">
      <button 
  onClick={handleGoBack} 
  className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
  aria-label="Go back"
>

</button>
      <h1 className="text-2xl font-bold mb-4">Panel de Administración - Galería</h1>
      <EditGalleryCarousel initialData={galleryData} onSave={() => fetcher.load("/adminGallery")} />
    </div>
  )
}
