/*
 * ============================================
 * PAGE PANIER — /cart
 * ============================================
 *
 * Cette page affiche les produits ajoutés au panier.
 * L'utilisateur peut modifier les quantités, supprimer des articles
 * et voir le total de la commande.
 *
 * Comme le site est une vitrine sans paiement, le bouton de paiement
 * affiche un message expliquant que la commande se fait manuellement.
 */

import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../components/CartProvider";
import { formatPrice } from "../lib/products";

// Déclaration de la route
export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Panier — Bill Store" },
      { name: "description", content: "Consulte et modifie ton panier Bill Store." },
      { property: "og:title", content: "Panier — Bill Store" },
      { property: "og:description", content: "Consulte et modifie ton panier Bill Store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <main className="min-h-screen py-8">
      <div className="container-shop">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Ton panier</h1>

        {cart.length === 0 ? (
          // Panier vide
          <div className="mt-12 rounded-lg border border-border bg-card p-8 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold text-card-foreground">
              Ton panier est vide
            </h2>
            <p className="mt-2 text-muted-foreground">
              Découvre nos produits et ajoute tes favoris ici.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Parcourir le catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          // Panier avec des articles
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Liste des articles */}
            <div className="lg:col-span-2">
              <div className="divide-y divide-border rounded-lg border border-border bg-card">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                  >
                    {/* Image du produit */}
                    <Link
                      to="/products/$id"
                      params={{ id: item.id }}
                      className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    {/* Nom et prix */}
                    <div className="flex-1">
                      <Link
                        to="/products/$id"
                        params={{ id: item.id }}
                        className="font-medium text-card-foreground transition-colors hover:text-muted-foreground"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Contrôles de quantité */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
                        aria-label="Supprimer l'article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Récapitulatif de la commande */}
            <div className="h-fit rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-card-foreground">Récapitulatif</h2>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Nombre d'articles</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-card-foreground">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={() =>
                  alert(
                    "Ceci est une vitrine sans paiement en ligne. Pour passer commande, contacte-nous via la page Contact."
                  )
                }
              >
                Finaliser la commande
              </button>

              <p className="mt-4 text-xs text-muted-foreground">
                Paiement en ligne non activé. Pour commander, utilise la page Contact.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
