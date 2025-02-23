"use client";

import { useState, useEffect } from "react";
import { supabase } from "~/lib/supabaseClient"; // Asegúrate de usar la ruta correcta

interface HeaderData {
  title: string;
  subtitle: string;
  logoUrl: string;
}

export default function Header() {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      const { data, error } = await supabase
        .from("header")
        .select("*")
        .single();

      if (error) {
        console.error("Error loading header data:", error);
      } else {
        setHeaderData(data);
        localStorage.setItem("headerData", JSON.stringify(data));
      }
    };

    fetchHeaderData();

    // Opcional: refrescar cada 5 segundos
    const intervalId = setInterval(fetchHeaderData, 5000);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "headerData") {
        const newData = JSON.parse(event.newValue || "null");
        setHeaderData(newData);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!headerData) return <div>Loading...</div>;

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <img src={headerData.logoUrl || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
        <div>
          <h1 className="text-2xl font-bold">{headerData.title}</h1>
          <p>{headerData.subtitle}</p>
        </div>
      </div>
    </header>
  );
}
