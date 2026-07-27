/*
 * ============================================
 * CARTE PRODUIT — ATELIER ZÉRO
 * ============================================
 *
 * Affiche un produit avec ses variantes de couleur.
 * Cliquer sur un rond de couleur change l'image affichée
 * et le nom de la couleur, sans recharger la page.
 */

import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatPriceCompact } from "../lib/products";

export function ProductCard({ product }) {
  // Couleur actuellement sélectionnée (par défaut : la première de la liste)
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id || "black");

  // Objet couleur complet (id, name, hex) correspondant à la sélection
  const selectedColor =
    product.colors.find((color) => color.id === selectedColorId) || product.colors[0];

  // Image "front" de la couleur sélectionnée (avec repli si jamais absente)
  const image =
    product.images[selectedColorId]?.front || Object.values(product.images)[0]?.front;

  return (
    <article className="group relative">
      <Link to="/product/$slug" params={{ slug: product.id }} className="relative block aspect-[4/5] overflow-hidden bg-[#e5e5e5]">
        <img
          src={image}
          alt={`${product.name} — ${selectedColor?.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
          {product.chapter}
        </span>
        {product.soldOut && (
          <span className="absolute right-4 top-4 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            Sold Out
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-sm font-bold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
          Voir le produit
        </span>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-black/50">{product.collection}</p>
          <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-black">
            <Link to="/product/$slug" params={{ slug: product.id }}>
              {product.name}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-2">
            {product.colors.map((color) => {
              const isSelected = color.id === selectedColorId;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColorId(color.id)}
                  aria-label={color.name}
                  aria-pressed={isSelected}
                  className={`h-3.5 w-3.5 rounded-full border transition-all ${
                    isSelected
                      ? "border-black ring-1 ring-black ring-offset-2 ring-offset-[#f2f1ed]"
                      : "border-black/20"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              );
            })}
            <span className="text-[10px] uppercase tracking-widest text-black/60">
              {selectedColor?.name}
            </span>
          </div>
        </div>
        <span className="text-sm font-bold text-black">{formatPriceCompact(product.price)}</span>
      </div>
    </article>
  );
}

export default ProductCard;