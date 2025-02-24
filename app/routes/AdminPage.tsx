"use client"

import { useState } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("page1");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "page1":
        return <Page1 />;
      case "page2":
        return <Page2 />;
      case "page3":
        return <Page3 />;
      case "page4":
        return <Page4 />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("page1")}
          className={`px-4 py-2 rounded ${
            activeTab === "page1" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
          }`}
        >
          Página 1
        </button>
        <button
          onClick={() => setActiveTab("page2")}
          className={`px-4 py-2 rounded ${
            activeTab === "page2" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
          }`}
        >
          Página 2
        </button>
        <button
          onClick={() => setActiveTab("page3")}
          className={`px-4 py-2 rounded ${
            activeTab === "page3" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
          }`}
        >
          Página 3
        </button>
        <button
          onClick={() => setActiveTab("page4")}
          className={`px-4 py-2 rounded ${
            activeTab === "page4" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
          }`}
        >
          Página 4
        </button>
      </div>
      <div>{renderActiveTab()}</div>
    </div>
  );
}

function Page1() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Contenido de Página 1</h2>
      <p>Aquí va el contenido de la primera página.</p>
    </div>
  );
}

function Page2() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Contenido de Página 2</h2>
      <p>Aquí va el contenido de la segunda página.</p>
    </div>
  );
}

function Page3() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Contenido de Página 3</h2>
      <p>Aquí va el contenido de la tercera página.</p>
    </div>
  );
}

function Page4() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Contenido de Página 4</h2>
      <p>Aquí va el contenido de la cuarta página.</p>
    </div>
  );
}
