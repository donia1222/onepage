"use client";

import { useState, useCallback } from "react";
import { FiHome, FiUser, FiBriefcase, FiImage, FiMail, FiTool } from "react-icons/fi"; // Íconos para las secciones
import { FiMenu, FiX } from "react-icons/fi"; // Íconos para el menú hamburguesa

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
    <nav className="p-4  text-white">
      <div className="flex items-center justify-between">
        {/* Botón de menú para móviles */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
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
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <FiHome /> <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <FiUser /> <span>About</span>
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <FiTool /> <span>Services</span>
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("gallery");
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <FiImage /> <span>Gallery</span>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <FiMail /> <span>Contact</span>
              </a>
            </li>
            <li>
              <a
                href="/AdminPage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <FiBriefcase /> <span>Admin</span>
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Menú para pantallas grandes */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <FiHome /> <span>Home</span>
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <FiUser /> <span>About</span>
          </a>
        </li>
        <li>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
            }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <FiTool /> <span>Services</span>
          </a>
        </li>
        <li>
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("gallery");
            }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <FiImage /> <span>Gallery</span>
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <FiMail /> <span>Contact</span>
          </a>
        </li>
        <li>
          <a
            href="/AdminPage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <FiBriefcase /> <span>Admin</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
