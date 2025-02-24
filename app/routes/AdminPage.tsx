"use client"

import { Link } from "@remix-run/react"

const AdminButton = ({ title, href }: { title: string; href: string }) => (
  <Link
    to={href}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg text-center"
  >
    {title}
  </Link>
)

export default function AdminPage() {
  const adminLinks = [
    { title: "Administrar Header", path: "/adminHeader" },
    { title: "Administrar Hero Imagen", path: "/adminHero" },
    { title: "Administrar Galería", path: "/AdminAboutUs" },
    { title: "Administrar Servicios", path: "/AdminOffer" },
    { title: "Administrar Galleria", path: "/AdminGallery" },
    { title: "Administrar Footer", path: "/AdminFooter" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Panel de Administración
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminLinks.map((link, index) => (
            <AdminButton key={index} title={link.title} href={link.path} />
          ))}
        </div>
      </div>
    </div>
  )
}
