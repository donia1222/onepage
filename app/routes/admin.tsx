import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { supabase } from "~/lib/supabaseClient";
import EditHeader from "~/components/edit/EditHeader";

interface HeaderData {
  id?: number;
  title: string;
  subtitle: string;
  logoUrl: string;
}

export const loader: LoaderFunction = async () => {
  // Filtramos por id = 1 para obtener un único registro
  const { data, error } = await supabase
    .from("header")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching header data:", error);
    throw new Error(error.message);
  }

  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const headerData: HeaderData = {
    id: 1, // Se asume que actualizamos siempre el registro con id 1
    title: formData.get("title") as string,
    subtitle: formData.get("subtitle") as string,
    logoUrl: formData.get("logoUrl") as string,
  };

  const { data, error } = await supabase
    .from("header")
    .upsert(headerData)
    .single();

  if (error) {
    console.error("Error saving header data:", error);
    return json({ error: "Failed to save header data" }, { status: 500 });
  }

  return json(data);
};

export default function AdminPanel() {
  const loaderData = useLoaderData<HeaderData>();
  const actionData = useActionData<HeaderData>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <EditHeader initialData={loaderData} actionData={actionData} />
    </div>
  );
}
