import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useCart } from "../components/CartProvider";
import { getProductById, formatPriceCompact } from "../lib/products";
import { ProductCard } from "../components/ProductCard";
import { products } from "../lib/products";

export const Route = createFileRoute("/product/$slug")({
  head: () => ({
    meta: [
      { title: "Produit — Atelier Zéro" },
      { name: "description", content: "Détails du produit Atelier Zéro." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProductById(slug);
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.id || "black");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "M");
  const [activeImage, setActiveImage] = useState("front");
  const [openDetail, setOpenDetail] = useState(null);

  if (!product) {
    return (
      <main className="container-az py-24 text-white">
        <h1 className="text-2xl font-bold">Produit introuvable</h1>
        <Link to="/shop" className="mt-4 inline-block text-sm underline">Retour au shop</Link>
      </main>
    );
  }

  const images = product.images[selectedColor] || Object.values(product.images)[0];
  const galleryKeys = Object.keys(images);
  const related = products.filter((p) => p.id !== product.id);

  return (
    <main className="min-h-screen bg-[#f2f1ed] pb-24 text-black">
      <section className="container-az py-12">
        <p className="text-label mb-4 text-black/50">
          {product.chapter} / {product.category}
        </p>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Galerie */}
          <div>
            <div className="relative aspect-[4/5] bg-[#e5e5e5]">
              {product.soldOut && (
                <span className="absolute right-4 top-4 z-10 bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                  Sold Out
                </span>
              )}
              <img
                src={images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {galleryKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveImage(key)}
                  className={`aspect-square overflow-hidden border-2 bg-[#e5e5e5] ${activeImage === key ? "border-black" : "border-transparent"}`}
                >
                  <img src={images[key]} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Informations */}
          <div className="flex flex-col">
            <h1 className="text-display text-5xl md:text-6xl">{product.name}</h1>
            <p className="mt-6 text-xl font-bold">{formatPriceCompact(product.price)}</p>
            <p className="mt-6 leading-relaxed text-black/70">{product.shortDescription}</p>

            {/* Couleur */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-label text-black/60">Couleur</span>
                <span className="text-sm font-bold uppercase">{product.colors.find((c) => c.id === selectedColor)?.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border ${selectedColor === color.id ? "border-black" : "border-black/20"}`}
                    aria-label={color.name}
                  >
                    <span className="h-5 w-5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Taille */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-label text-black/60">Sélectionner une taille</span>
                <span className="text-xs underline">Guide des tailles</span>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 w-12 border text-sm font-bold uppercase ${selectedSize === size ? "bg-black text-white" : "border-black/20 text-black"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton */}
            {product.soldOut ? (
              <button disabled className="mt-8 w-full bg-black/30 py-4 text-xs font-bold uppercase tracking-widest text-white/60 cursor-not-allowed">
                Sold Out
              </button>
            ) : (
              <button
                onClick={() => addToCart(product, { color: selectedColor, size: selectedSize })}
                className="mt-8 w-full bg-black py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-black/80"
              >
                Ajouter au panier
              </button>
            )}

            {/* Accordéon détails */}
            <div className="mt-10 border-t border-black/10">
              {product.details.map((detail) => (
                <div key={detail.label} className="border-b border-black/10">
                  <button
                    onClick={() => setOpenDetail(openDetail === detail.label ? null : detail.label)}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-bold uppercase tracking-widest"
                  >
                    {detail.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${openDetail === detail.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDetail === detail.label && (
                    <p className="pb-4 text-sm leading-relaxed text-black/70">{detail.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vous aimerez aussi */}
      <section className="container-az py-16">
        <p className="text-label mb-8 text-black/50">Continue the Chapter</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
