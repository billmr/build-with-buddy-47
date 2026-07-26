/*
 * ============================================
 * PAGE CATALOGUE — /products
 * ============================================
 *
 * Cette page affiche tous les produits disponibles dans la boutique.
 * Elle utilise le composant ProductCard pour chaque produit.
 *
 * Métadonnées SEO : titre, description, og:title, og:description.
 */

import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "../components/ProductCard";
import { products } from "../lib/products";

// Déclaration de la route pour TanStack Router
export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Catalogue — Bill Store" },
      { name: "description", content: "Découvre tous nos produits streetwear et accessoires urbains." },
      { property: "og:title", content: "Catalogue — Bill Store" },
      { property: "og:description", content: "Découvre tous nos produits streetwear et accessoires urbains." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <main className="min-h-screen">
      {/* En-tête de la page */}
      <section className="bg-hero py-16">
        <div className="container-shop text-center">
          <h1 className="text-3xl font-bold tracking-tight text-hero-foreground md:text-4xl">
            Notre catalogue
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Une sélection de pièces minimalistes pensées pour le quotidien urbain.
          </p>
        </div>
      </section>

      {/* Grille de produits */}
      <section className="container-shop py-12">
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground">Aucun produit disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProductsPage;
