/*
 * ============================================
 * PAGE DÉTAIL PRODUIT — /products/$id
 * ============================================
 *
 * Cette page affiche les détails d'un produit sélectionné.
 * L'identifiant du produit est récupéré depuis l'URL grâce à TanStack Router.
 *
 * Si le produit n'existe pas, on affiche un message d'erreur clair.
 */

import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useCart } from "../components/CartProvider";
import { getProductById, formatPrice } from "../lib/products";

// Déclaration de la route avec paramètre dynamique $id
export const Route = createFileRoute("/products/$id")({
  head: () => ({
    meta: [
      { title: "Produit — Bill Store" },
      { name: "description", content: "Détails du produit sélectionné." },
      { property: "og:title", content: "Produit — Bill Store" },
      { property: "og:description", content: "Détails du produit sélectionné." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  // Récupération du paramètre id depuis l'URL
  const { id } = Route.useParams();

  // Recherche du produit correspondant
  const product = getProductById(id);

  // Accès aux fonctions du panier
  const { addToCart, updateQuantity, cart } = useCart();

  // État pour afficher la quantité sélectionnée avant d'ajouter au panier
  const [quantity, setQuantity] = useState(1);

  // État pour afficher un message de confirmation après ajout
  const [added, setAdded] = useState(false);

  // Si le produit n'existe pas, on affiche un message
  if (!product) {
    return (
      <main className="container-shop py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">Produit introuvable</h1>
        <p className="mt-4 text-muted-foreground">
          Le produit que tu cherches n'existe pas ou a été retiré.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour au catalogue
        </Link>
      </main>
    );
  }

  // Quantité actuelle du produit dans le panier
  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Ajoute la quantité sélectionnée au panier
  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container-shop">
        {/* Lien retour */}
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour au catalogue
        </Link>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Image du produit */}
          <div className="overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Informations du produit */}
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">{product.category}</span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-semibold text-foreground">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Sélecteur de quantité */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Quantité</span>
              <div className="flex items-center gap-2 rounded-md border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bouton Ajouter au panier */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  Ajouté au panier
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  Ajouter au panier
                </>
              )}
            </button>

            {/* Message si le produit est déjà dans le panier */}
            {quantityInCart > 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                Déjà {quantityInCart} dans ton panier.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailPage;
