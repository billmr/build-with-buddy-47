/*
 * ============================================
 * PAGE CONTACT — /contact
 * ============================================
 *
 * Cette page affiche un formulaire de contact simple.
 * Pour l'instant, le formulaire affiche une alerte de confirmation
 * car il n'y a pas de backend connecté.
 *
 * Tu pourras plus tard remplacer l'alerte par un envoi réel d'email.
 */

import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send } from "lucide-react";

// Déclaration de la route
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bill Store" },
      { name: "description", content: "Contacte Bill Store pour toute question ou commande personnalisée." },
      { property: "og:title", content: "Contact — Bill Store" },
      { property: "og:description", content: "Contacte Bill Store pour toute question ou commande personnalisée." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  // État du formulaire
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // État de soumission
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Met à jour les champs du formulaire
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Gère la soumission du formulaire
  function handleSubmit(event) {
    event.preventDefault();

    // Ici, tu pourras plus tard envoyer les données à un backend
    // Pour l'instant, on affiche simplement une confirmation
    setIsSubmitted(true);

    // Réinitialise le formulaire après 3 secondes
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container-shop">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Contacte-nous</h1>
        <p className="mt-2 text-muted-foreground">
          Une question, une commande spéciale ou un partenariat ? Écris-nous.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Informations de contact */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-start gap-4">
              <div className="rounded-md bg-secondary p-3">
                <Mail className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <p className="text-sm text-muted-foreground">contact@billstore.example</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-md bg-secondary p-3">
                <Phone className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Téléphone</h3>
                <p className="text-sm text-muted-foreground">+33 1 23 45 67 89</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-md bg-secondary p-3">
                <MapPin className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Adresse</h3>
                <p className="text-sm text-muted-foreground">
                  12 rue du Style
                  <br />
                  75000 Paris, France
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-border bg-card p-6"
            >
              {isSubmitted && (
                <div className="mb-6 rounded-md bg-secondary p-4 text-sm text-secondary-foreground">
                  Merci pour ton message ! Nous te répondrons dès que possible.
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-card-foreground">
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                    placeholder="Ton nom"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-card-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                    placeholder="ton@email.com"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-card-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                  placeholder="Écris ton message ici..."
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
