/*
 * ============================================
 * PIED DE PAGE — Footer
 * ============================================
 *
 * Ce composant affiche le pied de page du site.
 * Il est visible sur toutes les pages car il est inclus dans __root.tsx.
 */

import React from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  // Année actuelle pour le copyright (généré côté client)
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container-shop py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Colonne 1 : Marque et description */}
          <div>
            <Link to="/" className="text-lg font-bold text-foreground">
              Bill Store
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Streetwear et accessoires urbains minimalistes. Style épuré, qualité durable.
            </p>
          </div>

          {/* Colonne 2 : Liens utiles */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Liens</h3>
            <nav className="mt-4 flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Accueil
              </Link>
              <Link to="/products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Catalogue
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                À propos
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>

          {/* Colonne 3 : Réseaux sociaux */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Suivez-nous</h3>
            <div className="mt-4 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {currentYear} Bill Store. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
