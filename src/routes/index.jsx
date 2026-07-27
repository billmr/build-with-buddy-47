import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "../components/ProductCard";
import { products } from "../lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Zéro — Start From Nothing. Become Everything." },
      { name: "description", content: "Project Genesis / V.1.0 — Drop 001 disponible." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main className="bg-black text-white">
      {/* Hero vidéo */}
      <section className="relative -mt-[var(--header-height)] flex h-screen flex-col overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/assets/teaser-chapter-0.png"
        >
          <source src="/assets/videos/hero-atelier-zero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />

        {/* Contenu du Hero, en colonne, réparti du haut vers le bas */}
        <div className="container-az relative z-10 flex h-full flex-col justify-between py-32">
          {/* Ligne du haut : nom de l'atelier / version du projet */}
          <div className="flex items-start justify-between">
            <p className="text-label text-white/70">Atelier Ø — Paris</p>
            
          </div>

          {/* Bloc central : badge, eyebrow, titre, tagline, boutons */}
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-white/30 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-label text-white">Drop 001 — Available Now</span>
            </div>
            <p className="text-label mb-3 text-white/70">Chapter 0 — Genesis</p>
            <h1 className="text-display text-5xl text-white md:text-7xl lg:text-8xl">
              Project Genesis
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Start from nothing. Become everything.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/shop" className="az-button">
                Shop the Collection
              </Link>
              <Link to="/about" className="az-button-outline">
                Discover the Mindset
              </Link>
            </div>
          </div>

          {/* Ligne du bas : accroche + indicateur de scroll */}
          <div className="flex items-end justify-between">
            <p className="text-label text-white/70">Streetwear Engineered For Resilience</p>
            <p className="text-label text-white/70">Scroll to enter ↓</p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-white/10 bg-black py-4">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-sm font-bold uppercase tracking-widest text-white/60">
              Start from nothing — Become everything —
            </span>
          ))}
        </div>
      </div>

      {/* Current chapter */}
      <section className="container-az py-24">
        <p className="text-label mb-8 text-white/50">The Current Chapter</p>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-display text-6xl text-white md:text-8xl">Project Genesis</h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-white/70">
              Atelier Zéro ne considère pas le vêtement comme une simple pièce textile. Chaque création devient une structure, une protection et le symbole d’un nouveau départ.
            </p>
            <Link to="/about" className="mt-8 text-sm font-bold uppercase tracking-widest text-white underline underline-offset-8">
              Discover our foundation →
            </Link>
          </div>
        </div>
      </section>

      {/* Drop 001 */}
      <section className="bg-[#f2f1ed] py-24 text-black">
        <div className="container-az">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-label mb-2 text-black/50">Drop 001</p>
              <h2 className="text-display text-4xl md:text-6xl">Shop the Genesis Drop</h2>
            </div>
            <Link to="/shop" className="hidden text-sm font-bold uppercase tracking-widest underline underline-offset-8 sm:block">
              View All Pieces →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative overflow-hidden bg-black py-32 text-white">
        <img
          src="/assets/visual-nothing-everything.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative z-10 container-az">
          <h2 className="text-display max-w-5xl text-5xl md:text-7xl lg:text-8xl">
            We don’t sell clothing. We engineer resilience.
          </h2>
          <Link to="/about" className="mt-10 inline-block border border-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black">
            Read the Manifesto
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;