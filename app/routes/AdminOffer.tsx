import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"
import EditWhatWeOffer from "~/components/edit/EditWhatWeOffer"
import { useEffect, useState } from "react"



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

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase
    .from("offer")
    .select("*")
    .eq("id", 1)
    .single()

  if (error) {
    console.error("Error fetching offer data:", error)
    throw new Error(error.message)
  }

  return json(data)
}

export default function AdminOffer() {
  const loaderData = useLoaderData<OfferData>()
  const fetcher = useFetcher()
  const [offerData, setOfferData] = useState<OfferData>(loaderData)

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }


  useEffect(() => {
    if (fetcher.data && typeof fetcher.data === "object" && "id" in fetcher.data) {
      setOfferData(fetcher.data as OfferData)
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
      <h1 className="text-2xl font-bold mb-4">Panel de Administración - Lo que Ofrecemos</h1>
      <EditWhatWeOffer initialData={offerData} onSave={() => fetcher.load("/adminOffer")} />
    </div>
  )
}
