/*
 * ============================================
 * PANIER LATÉRAL (DRAWER) — ATELIER ZÉRO
 * ============================================
 *
 * S'ouvre en glissant depuis la droite quand on clique sur "Panier"
 * dans le Header. Affiche les articles ajoutés, un petit formulaire
 * (nom, pays, ville, adresse) et un bouton pour envoyer la commande
 * directement sur WhatsApp (pas de paiement en ligne).
 */

import React, { useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "../lib/products";

const WHATSAPP_NUMBER = "22953475058"; // ⚠️ à remplacer par ton numéro réel

export function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, updateQuantity, totalPrice, buildWhatsAppMessage } = useCart();

  const [form, setForm] = useState({ name: "", country: "", city: "", address: "" });

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleWhatsAppOrder() {
    const baseMessage = buildWhatsAppMessage();
    const clientInfo = `\nNom: ${form.name}\nPays: ${form.country}\nVille: ${form.city}\nAdresse: ${form.address}`;
    const fullMessage = `${baseMessage}${clientInfo}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, "_blank");
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-md transform bg-[#f2f1ed] text-black shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between border-b border-black/10 p-6">
            <div>
              <p className="text-label text-black/50">Votre sélection</p>
              <h2 className="text-display text-4xl">Panier</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le panier"
              className="p-1 text-black/60 hover:text-black"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <p className="text-sm text-black/60">Le panier est encore vide.</p>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden bg-[#e5e5e5]">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold uppercase">{item.name}</h3>
                      <p className="mt-1 text-xs uppercase tracking-widest text-black/50">
                        {item.color} — {item.size}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-black/20">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="p-1.5 hover:bg-black/5"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="p-1.5 hover:bg-black/5"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.key)}
                          className="p-1.5 text-black/50 hover:text-black"
                          aria-label="Supprimer l'article"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-bold">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-black/10 p-6">
            <div className="flex items-center justify-between">
              <span className="text-label text-black/60">Sous-total</span>
              <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="mt-1 text-xs text-black/50">
              Les frais de livraison seront confirmés sur WhatsApp.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Nom complet"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border border-black/20 bg-white px-3 py-2 text-sm placeholder:text-black/40"
              />
              <input
                type="text"
                placeholder="Pays"
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="border border-black/20 bg-white px-3 py-2 text-sm placeholder:text-black/40"
              />
              <input
                type="text"
                placeholder="Ville"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="border border-black/20 bg-white px-3 py-2 text-sm placeholder:text-black/40"
              />
              <input
                type="text"
                placeholder="Adresse"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="border border-black/20 bg-white px-3 py-2 text-sm placeholder:text-black/40"
              />
            </div>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              disabled={items.length === 0}
              className="az-button mt-4 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              Commander sur WhatsApp
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default CartDrawer;