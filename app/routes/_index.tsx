import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Heroimage from "~/components/HeroImagen";
import About from "~/components/AboutUs";
import Offer from "~/components/WhatWeOffer";
import Gallery from "~/components/GalleryCarousel";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" },
];

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div id="home">
        <Header />
        <Heroimage />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Offer />
      </div>
      <div id="gallery">
        <Gallery />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
