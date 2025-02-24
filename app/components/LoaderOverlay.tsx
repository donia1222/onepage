// app/components/LoaderOverlay.tsx
"use client"

export default function LoaderOverlay() {
  return (
    <div className="fixed inset-0 bg-blue-500 flex items-center justify-center z-50">
      {/* Puedes personalizar el spinner o mensaje */}
      <div className="text-white text-2xl font-bold">
        Cargando...
      </div>
    </div>
  )
}
