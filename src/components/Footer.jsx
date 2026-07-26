/*
 * ============================================
 * PIED DE PAGE — ATELIER ZÉRO
 * ============================================
 */

import React from "react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-16 text-white">
      <div className="container-az">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link to="/" className="text-2xl font-bold uppercase tracking-tighter">
              Atelier Ø
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Start from nothing.
              <br />
              Become everything.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-label text-white/40">Navigation</span>
            <Link to="/shop" className="text-sm uppercase tracking-widest text-white/80 hover:text-white">
              Shop
            </Link>
            <Link to="/about" className="text-sm uppercase tracking-widest text-white/80 hover:text-white">
              La marque
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-widest text-white/80 hover:text-white"
            >
              Instagram
            </a>
            <a
              href="mailto:contact@atelierzero.fr"
              className="text-sm uppercase tracking-widest text-white/80 hover:text-white"
            >
              Contact
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-label text-white/40">Informations</span>
            <p className="text-sm uppercase tracking-widest text-white/80">Livraison internationale</p>
            <p className="text-sm uppercase tracking-widest text-white/80">Paiement sécurisé</p>
            <p className="text-sm uppercase tracking-widest text-white/80">Retours sous 14 jours</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs uppercase tracking-widest text-white/40">
            © 2026 Atelier Zéro — France / Worldwide
          </p>
          <p className="text-xs uppercase tracking-widest text-white/40">Version 01</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
