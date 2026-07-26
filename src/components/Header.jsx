/*
 * ============================================
 * EN-TÊTE — ATELIER ZÉRO
 * ============================================
 *
 * Header fixe noir avec navigation Accueil / Shop / Mentalité Zéro
 * et accès au panier (drawer latéral).
 */

import React, { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "./CartProvider";

export function Header({ onOpenCart }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  const links = [
    { to: "/", label: "Accueil" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "Mentalité Zéro" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] bg-black transition-colors"
      style={{ backgroundColor: isHome ? "transparent" : "#000000" }}
    >
      <div className="container-az flex h-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/logo-white.png"
            alt="Atelier Zéro"
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs font-medium uppercase tracking-[0.14em] text-white/80 transition-colors hover:text-white"
              activeProps={{ className: "text-white underline underline-offset-8" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white"
            aria-label="Ouvrir le panier"
          >
            <span className="hidden sm:inline">Panier</span>
            <ShoppingBag className="h-5 w-5" />
            <span className="font-mono tabular-nums">{String(totalItems).padStart(2, "0")}</span>
          </button>

          <button
            type="button"
            className="text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <nav className="container-az flex flex-col gap-4 py-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.14em] text-white/80"
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
