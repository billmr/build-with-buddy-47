import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Mentalité Zéro — Atelier Zéro" },
      { name: "description", content: "La mission et les fondations d'Atelier Zéro." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const foundations = [
    {
      chapter: "Chapter 01",
      title: "Le point de départ.",
      label: "Void",
      text: "L’espace où le bruit disparaît, où l’ego s’efface et où la création peut recommencer.",
    },
    {
      chapter: "Chapter 02",
      title: "La rupture nécessaire.",
      label: "Impact",
      text: "L’énergie cinétique qui permet de briser les anciennes habitudes et de provoquer le changement.",
    },
    {
      chapter: "Chapter 03",
      title: "La reconstruction.",
      label: "Structure",
      text: "La discipline transforme le vide en fondation, puis la fondation en identité.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="container-az py-24">
        <p className="text-label mb-8 text-white/50">The Foundation</p>
        <h1 className="text-display text-5xl md:text-7xl lg:text-8xl">The Zero Mindset</h1>
      </section>

      <section className="container-az py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-label mb-4 text-white/50">Brand Mission</p>
            <h2 className="text-display text-3xl md:text-5xl">
              Nous ne vendons pas seulement des vêtements.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-white/70">
              Atelier Zéro fournit une armure à celles et ceux qui ont le courage de recommencer. Chaque pièce traduit le passage du vide à la structure, puis de la structure à l’impact.
            </p>
          </div>
        </div>
      </section>

      <section className="container-az py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {foundations.map((f) => (
            <div key={f.label} className="border-t border-white/10 pt-8">
              <p className="text-label mb-4 text-white/40">{f.chapter}</p>
              <h3 className="text-lg font-bold uppercase tracking-widest">{f.title}</h3>
              <p className="mt-2 text-2xl font-bold uppercase tracking-tighter">{f.label}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{f.text}</p>
              <ArrowUpRight className="mt-6 h-5 w-5 text-white/40" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-az py-24 text-center">
        <blockquote className="text-2xl font-bold italic text-white/80 md:text-4xl">
          “The exact moment when nothing becomes everything.”
        </blockquote>
        <p className="mt-6 text-label text-white/40">Atelier Ø</p>
      </section>

      <section className="container-az py-16 text-center">
        <h2 className="text-display text-4xl md:text-6xl">Start from nothing.</h2>
        <h2 className="text-display text-4xl md:text-6xl text-white/40">Become everything.</h2>
        <Link to="/shop" className="az-button-outline mx-auto mt-10">Shop</Link>
      </section>
    </main>
  );
}

export default AboutPage;
