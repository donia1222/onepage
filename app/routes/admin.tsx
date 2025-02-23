import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { supabase } from "~/lib/supabaseClient"
import EditHeader from "~/components/edit/EditHeader"

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <EditHeader initialData={loaderData} />
    </div>
  )
}

