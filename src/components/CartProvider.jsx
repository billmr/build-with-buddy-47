/*
 * ============================================
 * CONTEXTE DU PANIER — CartProvider
 * ============================================
 *
 * Ce fichier crée un "Context" React pour partager le panier
 * entre toutes les pages et tous les composants.
 *
 * Grâce à ce contexte, le Header peut afficher le nombre d'articles,
 * la page Produit peut ajouter un article, et la page Panier peut
 * afficher/modifier le contenu.
 *
 * Le panier est aussi sauvegardé dans le localStorage du navigateur
 * pour qu'il ne soit pas perdu en rechargeant la page.
 */

import React, { createContext, useContext, useEffect, useState } from "react";

// Création du contexte React (vide au départ)
const CartContext = createContext(null);

/*
 * Clé utilisée pour stocker le panier dans le localStorage du navigateur.
 * Tu peux changer ce nom si tu veux.
 */
const CART_STORAGE_KEY = "bill-store-cart";

/*
 * Hook personnalisé pour utiliser le panier facilement dans n'importe quel composant.
 * Exemple d'utilisation : const { cart, addToCart } = useCart();
 */
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>");
  }

  return context;
}

/*
 * Composant fournisseur qui enveloppe l'application et fournit le panier.
 * Il doit être placé dans src/routes/__root.tsx autour de <Outlet />.
 */
export function CartProvider({ children }) {
  // État du panier : un tableau d'articles.
  // Chaque article = { id, name, price, image, quantity }
  const [cart, setCart] = useState([]);

  // Indique si le composant est bien chargé côté client
  // (évite les problèmes de rendu serveur vs client avec le localStorage)
  const [isHydrated, setIsHydrated] = useState(false);

  /*
   * Au chargement du composant (côté client uniquement),
   * on récupère le panier sauvegardé dans le localStorage.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du panier :", error);
    }

    setIsHydrated(true);
  }, []);

  /*
   * À chaque modification du panier, on le sauvegarde dans le localStorage.
   */
  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du panier :", error);
    }
  }, [cart, isHydrated]);

  /*
   * Ajoute un produit au panier.
   * Si le produit existe déjà, on augmente juste la quantité.
   */
  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  }

  /*
   * Supprime complètement un article du panier.
   */
  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  }

  /*
   * Change la quantité d'un article.
   * Si la quantité passe à 0 ou moins, on supprime l'article.
   */
  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  /*
   * Vide entièrement le panier.
   */
  function clearCart() {
    setCart([]);
  }

  /*
   * Nombre total d'articles dans le panier (compte toutes les quantités).
   */
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  /*
   * Prix total du panier, en centimes.
   */
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Valeur fournie aux composants enfants
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isHydrated,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
