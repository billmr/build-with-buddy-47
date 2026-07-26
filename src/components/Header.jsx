/*
 * ============================================
 * EN-TÊTE — Header
 * ============================================
 *
 * Ce composant affiche la barre de navigation en haut du site.
 * Il est visible sur toutes les pages car il est inclus dans __root.tsx.
 *
 * Contenu :
 * - Logo / nom de la boutique à gauche
 * - Liens de navigation au centre (desktop)
 * - Icône du panier avec le nombre d'articles à droite
 * - Menu burger pour mobile
 */

import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "./CartProvider";

export function Header() {
  // État pour afficher/masquer le menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Récupération du nombre d'articles dans le panier
  const { totalItems } = useCart();

  // Liens de navigation principaux
  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/products", label: "Catalogue" },
    { to: "/about", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-shop flex h-16 items-center justify-between">
        {/* Logo / nom de la boutique */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-muted-foreground"
        >
          Bill Store
        </Link>

        {/* Navigation desktop (visible à partir de md) */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "font-semibold text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-sm transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Panier + bouton menu mobile */}
        <div className="flex items-center gap-4">
          {/* Lien vers le panier avec badge */}
          <Link
            to="/cart"
            className="relative rounded-full p-2 text-foreground transition-colors hover:bg-secondary"
            aria-label="Voir le panier"
          >
            <ShoppingBag className="h-5 w-5" />

            {/* Badge indiquant le nombre d'articles */}
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Bouton menu burger (visible seulement sur mobile) */}
          <button
            type="button"
            className="rounded-md p-2 text-foreground hover:bg-secondary md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile (visible uniquement quand isMobileMenuOpen est true) */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-shop flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-base text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
