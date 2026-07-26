import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const CART_KEY = "atelier-zero-cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("Erreur lors de la lecture du panier", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Erreur lors de l'enregistrement du panier", e);
    }
  }, [items]);

  const addToCart = useCallback((product, options) => {
    const { color, size } = options;
    const key = `${product.id}:${color}:${size}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) => (item.key === key ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          color,
          size,
          quantity: 1,
          image: product.images[color]?.front || Object.values(product.images)[0]?.front,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity < 1) {
      removeFromCart(key);
      return;
    }
    setItems((prev) => prev.map((item) => (item.key === key ? { ...item, quantity } : item)));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const buildWhatsAppMessage = useCallback(() => {
    if (items.length === 0) return "";
    const lines = items.map((item) => {
      return `- ${item.name} | ${item.color.toUpperCase()} | ${item.size} | Qté: ${item.quantity} | ${item.price.toLocaleString()} ${item.currency}`;
    });
    const total = `Total: ${totalPrice.toLocaleString()} ${items[0]?.currency}`;
    return `Bonjour Atelier Zéro, je souhaite commander:\n${lines.join("\n")}\n${total}`;
  }, [items, totalPrice]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, buildWhatsAppMessage }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans un CartProvider");
  return context;
}

export default CartProvider;
