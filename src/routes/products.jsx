/*
 * ============================================
 * LAYOUT CATALOGUE — /products
 * ============================================
 *
 * Ce fichier est un layout de route pour la section "products".
 * Il ne rend pas de contenu lui-même, mais affiche les pages enfants
 * grâce à <Outlet />.
 *
 * Les pages enfants :
 * - /products                 -> src/routes/products.index.jsx
 * - /products/$id             -> src/routes/products.$id.jsx
 */

import React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

// Déclaration du layout de route pour TanStack Router
export const Route = createFileRoute("/products")({
  component: ProductsLayout,
});

function ProductsLayout() {
  return (
    <>
      {/* Outlet est l'endroit où les pages enfants s'affichent */}
      <Outlet />
    </>
  );
}

export default ProductsLayout;
