/*
 * ============================================
 * CARTE PRODUIT — ProductCard
 * ============================================
 *
 * Ce composant affiche un produit sous forme de carte.
 * Il est utilisé sur la page d'accueil et sur la page catalogue.
 *
 * Il affiche :
 * - l'image du produit
 * - un badge optionnel (Nouveau, Promo, etc.)
 * - le nom
 * - la catégorie
 * - le prix
 * - un bouton "Ajouter au panier"
 */

import React from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "../lib/products";

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      {/* Lien cliquable sur l'image et le badge */}
      <Link to="/products/$id" params={{ id: product.id }} className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge promotionnel (optionnel) */}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Contenu de la carte */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs text-muted-foreground">{product.category}</span>

        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="mt-1 text-base font-medium text-card-foreground transition-colors hover:text-muted-foreground"
        >
          {product.name}
        </Link>

        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-semibold text-card-foreground">
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingBag className="h-4 w-4" />
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
