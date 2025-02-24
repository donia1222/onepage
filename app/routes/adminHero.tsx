import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"
import EditHeroImagen from "~/components/edit/EditHeroImagen"
import { useEffect, useState } from "react"


interface HeroData {
  id: number
  title: string
  subtitle: string
  backgroundUrl: string
}

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase
    .from("hero")
    .select("*")
    .eq("id", 1)
    .single()

  if (error) {
    console.error("Error fetching hero data:", error)
    throw new Error(error.message)
  }

  return json(data)
}

export default function AdminHero() {
  const loaderData = useLoaderData<HeroData>()
  const fetcher = useFetcher()
  const [heroData, setHeroData] = useState<HeroData>(loaderData)

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }
  useEffect(() => {
    if (fetcher.data && typeof fetcher.data === "object" && "id" in fetcher.data) {
      setHeroData(fetcher.data as HeroData)
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
      <h1 className="text-2xl font-bold mb-4">Panel de Administración - Hero</h1>
      <EditHeroImagen initialData={heroData} onSave={() => fetcher.load("/adminHero")} />
    </div>
  )
}
