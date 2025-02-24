import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"
import EditAboutUs from "~/components/edit/EditAboutUs"
import { useEffect, useState } from "react"

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

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase
    .from("about")
    .select("*")
    .eq("id", 1)
    .single()

  if (error) {
    console.error("Error fetching about data:", error)
    throw new Error(error.message)
  }

  return json(data)
}

export default function AdminAboutUs() {
  const loaderData = useLoaderData<AboutData>()
  const fetcher = useFetcher()
  const [aboutData, setAboutData] = useState<AboutData>(loaderData)

  useEffect(() => {
    if (fetcher.data && typeof fetcher.data === "object" && "id" in fetcher.data) {
      setAboutData(fetcher.data as AboutData)
    }
  }, [fetcher.data])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración - Sobre Nosotros</h1>
      <EditAboutUs initialData={aboutData} onSave={() => fetcher.load("/adminAboutUs")} />
    </div>
  )
}
