/*
 * ============================================
 * PAGE À PROPOS — /about
 * ============================================
 *
 * Cette page présente la marque et son histoire.
 * Elle est simple, informative et facile à personnaliser.
 */

import React from "react";
import { createFileRoute } from "@tanstack/react-router";

// Déclaration de la route
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — Bill Store" },
      { name: "description", content: "Découvre l'histoire et les valeurs de Bill Store." },
      { property: "og:title", content: "À propos — Bill Store" },
      { property: "og:description", content: "Découvre l'histoire et les valeurs de Bill Store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero de la page */}
      <section className="bg-hero py-16">
        <div className="container-shop text-center">
          <h1 className="text-3xl font-bold tracking-tight text-hero-foreground md:text-4xl">
            À propos de Bill Store
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Une marque née de l'envie de proposer un style urbain simple, durable et accessible.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="container-shop py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Notre histoire</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Bill Store a été créée pour offrir des vêtements et accessoires urbains qui allient
              minimalisme et qualité. Nous croyons qu'un style épuré ne doit pas être synonyme de
              banalité. Chaque pièce est pensée pour durer, aussi bien dans le temps que dans les
              tendances.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">Nos valeurs</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
              <li>Qualité avant tout : matières durables et finitions soignées.</li>
              <li>Design minimaliste : des pièces intemporelles faciles à porter.</li>
              <li>Accessibilité : un style urbain à prix juste.</li>
              <li>Responsabilité : nous privilégions les matériaux et procédés respectueux.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">Pourquoi choisir Bill Store ?</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Parce que nous construisons une garde-robe pensée pour ceux qui bougent, créent et
              explorent la ville. Nos produits sont conçus pour être portés au quotidien, en toute
              occasion.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
