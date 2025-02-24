"use client"

import { useState, useCallback } from "react";

export default function NavigationPanel() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
      setMenuOpen(false); // Cierra el menú después del scroll en móviles
    }
  }, []);

  return (
    <nav className="bg-gray-700 p-4">
      <div className="flex items-center justify-between">
   
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Menú para móviles */}
      {menuOpen && (
        <div className="mt-4 md:hidden">
          <ul className="flex flex-col space-y-2">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
                className="block text-gray-300 hover:text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className="block text-gray-300 hover:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
                className="block text-gray-300 hover:text-white"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("gallery");
                }}
                className="block text-gray-300 hover:text-white"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="block text-gray-300 hover:text-white"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/AdminPage"
                className="block text-gray-300 hover:text-white"
              >
                Admin
              </a>
            </li>
          </ul>
        </div>
      )}
      {/* Menú para pantallas grandes */}
      <ul className="hidden md:flex space-x-4">
        <li>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="text-gray-300 hover:text-white"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            className="text-gray-300 hover:text-white"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
            }}
            className="text-gray-300 hover:text-white"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("gallery");
            }}
            className="text-gray-300 hover:text-white"
          >
            Gallery
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="text-gray-300 hover:text-white"
          >
            Contact
          </a>
        </li>
        <li>
          <a href="/AdminPage" className="text-gray-300 hover:text-white">
            Admin
          </a>
        </li>
      </ul>
    </nav>
  );
}
