/*
 * ============================================
 * CARTE PRODUIT — ATELIER ZÉRO
 * ============================================
 */

import React from "react";
import { Link } from "@tanstack/react-router";
import { formatPriceCompact } from "../lib/products";

export function ProductCard({ product }) {
  const firstColor = product.colors[0]?.id || "black";
  const image = product.images[firstColor]?.front || Object.values(product.images)[0]?.front;

  return (
    <article className="group relative bg-[#111]">
      <Link to="/product/$slug" params={{ slug: product.id }} className="relative block aspect-[4/5] overflow-hidden bg-[#e5e5e5]">
        <img
          src={image}
          alt={product.name}
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
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/50">{product.collection}</p>
          <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-white">
            <Link to="/product/$slug" params={{ slug: product.id }}>
              {product.name}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-2">
            {product.colors.map((color) => (
              <span
                key={color.id}
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60"
              >
                <span
                  className="inline-block h-3 w-3 rounded-full border border-white/20"
                  style={{ backgroundColor: color.hex }}
                />
              </span>
            ))}
            <span className="text-[10px] uppercase tracking-widest text-white/60">{product.colors[0]?.name}</span>
          </div>
        </div>
        <span className="text-sm font-bold text-white">{formatPriceCompact(product.price)}</span>
      </div>
    </article>
  );
}

export default ProductCard;
