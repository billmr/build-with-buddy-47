Plan de construction d'une vitrine e-commerce "Bill Store"

1. Décisions retenues
   - Nom : Bill Store
   - Produits : streetwear et accessoires urbains (6 produits de démo)
   - Style : minimaliste et épuré, couleurs neutres (gris clair, noir, blanc)
   - Stack : React + Vite + TanStack Start (déjà en place), fichiers en JavaScript (.jsx)
   - Pas de paiement en ligne pour l'instant (Option B : vitrine)

2. Structure des pages (routes TanStack Start)
   - src/routes/index.jsx        -> Page d'accueil (hero + produits phares)
   - src/routes/products.jsx     -> Catalogue de tous les produits
   - src/routes/products.$id.jsx -> Page détail d'un produit
   - src/routes/cart.jsx         -> Page panier
   - src/routes/about.jsx        -> Page "À propos"
   - src/routes/contact.jsx      -> Page "Contact" avec formulaire simple
   - Suppression du src/routes/index.tsx actuel (placeholder)

3. Composants partagés à créer
   - src/components/Header.jsx       -> Navigation principale responsive
   - src/components/Footer.jsx       -> Pied de page
   - src/components/ProductCard.jsx  -> Carte produit réutilisable
   - src/components/CartProvider.jsx -> Contexte React pour le panier
   - src/components/MobileMenu.jsx   -> Menu burger pour mobile

4. Données et utilitaires
   - src/lib/products.js             -> Liste des produits de démo
   - src/lib/utils.js                -> Helper formatPrice (déjà présent, on l'utilise)
   - src/lib/cart.js                 -> Fonctions de gestion du panier (add/remove/update)

5. Design system
   - Modification de src/styles.css pour définir un thème minimaliste propre au e-commerce
   - Couleurs : background clair, foreground sombre, primary noir, accent gris doux
   - Typographie : Tailwind par défaut, tailles aérées, espacement généreux
   - Pas de dark mode forcé (optionnel plus tard)

6. Modifications du projet existant
   - src/routes/__root.tsx : remplacer le layout minimal actuel par Header + Outlet + Footer
   - src/routes/index.tsx : supprimer car remplacé par src/routes/index.jsx
   - src/routeTree.gen.ts : régénéré automatiquement par TanStack Router

7. SEO / métadonnées
   - Chaque route aura son propre head() avec titre et description uniques
   - Pas d'og:image personnalisé pour l'instant (utilisation de l'image par défaut du hosting)

8. Résultat attendu
   - Un site e-commerce vitrine responsive avec navigation fluide
   - Un panier fonctionnel en mémoire (ajout/suppression/quantité)
   - Des pages claires et professionnelles, faciles à personnaliser

9. Personnalisation possible pour l'utilisateur
   - Modifier les produits dans src/lib/products.js
   - Changer les couleurs dans src/styles.css
   - Modifier le nom "Bill Store" dans Header, Footer et pages
   - Ajouter des sections dans les pages existantes

10. Prochaines étapes futures (optionnelles)
    - Connexion Shopify pour un vrai catalogue
    - Ajout des paiements via Stripe/Paddle
    - Page de commande et confirmation
