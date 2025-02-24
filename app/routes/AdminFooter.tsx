import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"
import EditFooter from "~/components/edit/EditFooter"
import { useEffect, useState } from "react"

interface FooterData {
  id: number
  companyname: string
  phone: string
  logourl: string
  address: string
  country: string
  postal: string
  email: string
}

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase
    .from("footer")
    .select("*")
    .eq("id", 1)
    .single()

  if (error) {
    console.error("Error fetching footer data:", error)
    throw new Error(error.message)
  }

  return json(data)
}

export default function AdminFooter() {
  const loaderData = useLoaderData<FooterData>()
  const fetcher = useFetcher()
  const [footerData, setFooterData] = useState<FooterData>(loaderData)
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }
  useEffect(() => {
    if (fetcher.data && typeof fetcher.data === "object" && "id" in fetcher.data) {
      setFooterData(fetcher.data as FooterData)
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
      <h1 className="text-2xl font-bold mb-4">Panel de Administración - Footer</h1>
      <EditFooter initialData={footerData} onSave={() => fetcher.load("/adminFooter")} />
    </div>
  )
}
