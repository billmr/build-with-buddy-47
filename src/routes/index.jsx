/*
 * ============================================
 * PAGE D'ACCUEIL — /
 * ============================================
 *
 * Cette page est la première page que les visiteurs voient.
 * Elle présente la marque et affiche quelques produits phares.
 *
 * Métadonnées SEO : titre, description, og:title, og:description.
 */

import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { products } from "../lib/products";

// Déclaration de la route pour la page d'accueil
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bill Store — Streetwear minimaliste" },
      { name: "description", content: "Découvre Bill Store, la boutique de streetwear et accessoires urbains minimalistes." },
      { property: "og:title", content: "Bill Store — Streetwear minimaliste" },
      { property: "og:description", content: "Découvre Bill Store, la boutique de streetwear et accessoires urbains minimalistes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  // On affiche les 3 premiers produits comme produits phares
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Section Hero */}
      <section className="bg-hero py-20 md:py-32">
        <div className="container-shop text-center">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Nouvelle collection
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-hero-foreground md:text-6xl">
            Style urbain,
            <br />
            simplicité intemporelle.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Bill Store propose des vêtements et accessoires minimalistes conçus pour durer et s'adapter à ton quotidien.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Découvrir le catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
            >
              Notre histoire
            </Link>
          </div>
        </div>
      </section>

      {/* Section Produits phares */}
      <section className="container-shop py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Produits phares
            </h2>
            <p className="mt-2 text-muted-foreground">
              Nos pièces les plus appréciées cette saison.
            </p>
          </div>

          <Link
            to="/products"
            className="hidden text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:inline-flex"
          >
            Voir tout
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            Voir tout le catalogue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container-shop">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Matières durables</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Des tissus sélectionnés pour leur résistance et leur confort.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Design minimaliste</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Des pièces intemporelles qui passent au-delà des tendances.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Livraison soignée</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Emballage minimal et responsable, expédition rapide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
