import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "../components/ProductCard";
import { products } from "../lib/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Atelier Zéro" },
      { name: "description", content: "Collection Project Genesis — pièces streetwear et performance." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="container-az py-16">
        <p className="text-label mb-8 text-white/50">Collection / Project Genesis</p>
        <div className="grid gap-12 lg:grid-cols-2">
          <h1 className="text-display text-6xl md:text-8xl">
            Shop
            <br />
            All
          </h1>
          <div className="flex flex-col justify-end">
            <p className="text-lg leading-relaxed text-white/70">
              Pièces streetwear et performance pensées comme des outils de reconstruction.
            </p>
          </div>
        </div>
      </section>

      <section className="container-az pb-24">
        <div className="mb-8 flex items-center justify-between border-y border-white/10 py-4">
          <div className="flex gap-2">
            <button className="bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black">All</button>
            <button className="border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/60">T-shirts</button>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{products.length} Pièces</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ShopPage;
