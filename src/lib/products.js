/*
 * ============================================
 * DONNÉES DES PRODUITS — Bill Store
 * ============================================
 *
 * Ce fichier contient la liste des produits affichés sur le site.
 * C'est ici que tu peux ajouter, modifier ou supprimer des produits.
 *
 * Chaque produit est un objet avec les propriétés suivantes :
 * - id              : identifiant unique du produit (utilisé dans l'URL)
 * - name            : nom du produit
 * - price           : prix en centimes (100 = 1,00 €) pour éviter les erreurs de décimales
 * - category        : catégorie affichée (ex: "T-shirts", "Accessoires")
 * - description     : description longue du produit
 * - shortDescription: description courte pour les cartes
 * - image           : chemin vers l'image du produit (dans le dossier public/)
 * - badge           : (optionnel) petit badge promotionnel comme "Nouveau" ou "Promo"
 */

export const products = [
  {
    id: "tee-bill-classic",
    name: "T-shirt Bill Classic",
    price: 3500,
    category: "T-shirts",
    shortDescription: "T-shirt coupe droite en coton bio, logo Bill Store brodé.",
    description:
      "Le T-shirt Bill Classic est un essentiel de la garde-robe. Fabriqué en coton 100 % bio, il offre une coupe droite confortable et un logo Bill Store brodé discrètement sur la poitrine. Parfait pour un look urbain minimaliste au quotidien.",
    image: "/images/tee-bill-classic.jpg",
    badge: "Nouveau",
  },
  {
    id: "hoodie-urban",
    name: "Hoodie Urban",
    price: 7900,
    category: "Sweats",
    shortDescription: "Sweat à capuche oversize, intérieur doux et chaud.",
    description:
      "Le Hoodie Urban allie confort et style. Sa coupe oversize moderne et son intérieur brossé te gardent au chaud. Poche kangourou, cordons de serrage et finitions renforcées pour une durabilité optimale.",
    image: "/images/hoodie-urban.jpg",
  },
  {
    id: "casquette-street",
    name: "Casquette Street",
    price: 2900,
    category: "Accessoires",
    shortDescription: "Casquette 6 panneaux ajustable, broderie minimaliste.",
    description:
      "Casquette 6 panneaux en coton durable avec fermeture ajustable à l'arrière. La broderie minimaliste Bill Street apporte la touche finale à ton look.",
    image: "/images/casquette-street.jpg",
    badge: "Promo",
  },
  {
    id: "sac-tote-bill",
    name: "Sac Tote Bill",
    price: 2400,
    category: "Accessoires",
    shortDescription: "Tote bag en toile épaisse, anses robustes.",
    description:
      "Le Sac Tote Bill est réalisé en toile épaisse et durable. Idéal pour les courses, la plage ou le quotidien. Anses renforcées et poche intérieure pour tes petits objets.",
    image: "/images/sac-tote-bill.jpg",
  },
  {
    id: "jogger-cargo",
    name: "Jogger Cargo",
    price: 6500,
    category: "Pantalons",
    shortDescription: "Jogger cargo avec poches multiples, coupe ajustée.",
    description:
      "Jogger cargo en coton mélangé pour un confort optimal. Poches cargo latérales, élastique à la taille et chevilles ajustées pour un style urbain fonctionnel.",
    image: "/images/jogger-cargo.jpg",
    badge: "Best-seller",
  },
  {
    id: "socks-essential",
    name: "Lot de 3 paires de chaussettes Essential",
    price: 1800,
    category: "Accessoires",
    shortDescription: "Lot de 3 chaussettes en coton, confortables et résistantes.",
    description:
      "Le pack Essential comprend 3 paires de chaussettes en coton peigné. Confortables, résistantes et avec un renfort au niveau du talon et de la pointe.",
    image: "/images/socks-essential.jpg",
  },
];

/*
 * Fonction utilitaire pour récupérer un produit par son identifiant.
 * Utilisée sur la page détail d'un produit.
 */
export function getProductById(id) {
  return products.find((product) => product.id === id) || null;
}

/*
 * Fonction utilitaire pour formater un prix en euros.
 * Le prix est stocké en centimes, donc on divise par 100.
 */
export function formatPrice(priceInCents) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceInCents / 100);
}
