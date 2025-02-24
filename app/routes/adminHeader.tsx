import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"
import EditHeader from "~/components/edit/EditHeader"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

interface HeaderData {
  id: number
  title: string
  subtitle: string
  logoUrl: string
}

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase.from("header").select("*").eq("id", 1).single()

  if (error) {
    console.error("Error fetching header data:", error)
    throw new Error(error.message)
  }

  return json(data)
}

export default function AdminPanel() {
  const loaderData = useLoaderData<HeaderData>()
  const fetcher = useFetcher()
  const [headerData, setHeaderData] = useState<HeaderData>(loaderData)
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }
  useEffect(() => {
    if (fetcher.data && typeof fetcher.data === 'object' && 'id' in fetcher.data) {
      setHeaderData(fetcher.data as HeaderData)
    }
  }, [fetcher.data])

  return (
    <div className="container mx-auto p-4">
      <button 
  onClick={handleGoBack} 
  className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
  aria-label="Go back"
>
  <ArrowLeft size={24} />
</button>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <EditHeader initialData={headerData} onSave={() => fetcher.load("/admin")} />
    </div>
  )
}
