/*
 * ============================================
 * DONNÉES DES PRODUITS — ATELIER ZÉRO
 * ============================================
 *
 * Reproduction des produits extraits du site cible.
 * Chaque produit possède des variantes (couleur + taille) et une galerie.
 */

export const products = [
  {
    id: "genotype-0",
    name: "GENOTYPE 0",
    chapter: "Chapter 0",
    collection: "Project Genesis",
    price: 25000,
    currency: "FCFA",
    category: "T-shirts",
    soldOut: false,
    shortDescription:
      "GENOTYPE 0 incarne l’identité brute d’Atelier Zéro. Confectionné en coton premium, il associe une coupe structurée à une esthétique graphique affirmée.",
    description:
      "Pensé comme une évolution du premier chapitre Atelier Zéro, GENOTYPE 0 associe confort, résistance et identité visuelle. Sa construction en coton offre un tombé structuré et agréable au quotidien. Une pièce conçue pour symboliser la transformation, la discipline et la création d’une nouvelle version de soi.",
    images: {
      black: {
        front: "/assets/products/genotype-0-black/front.jpg",
        side: "/assets/products/genotype-0-black/side.jpg",
        back: "/assets/products/genotype-0-black/back.jpg",
        worn: "/assets/products/genotype-0-black/worn.jpeg",
        worn2: "/assets/products/genotype-0-black/worn2.jpeg",
      },
      red: {
        front: "/assets/products/genotype-0-red/front.jpg",
        side: "/assets/products/genotype-0-red/side.jpg",
        back: "/assets/products/genotype-0-red/back.jpg",
        worn: "/assets/products/genotype-0-red/worn.jpeg",
        worn2: "/assets/products/genotype-0-red/worn2.jpeg",
      },
    },
    colors: [
      { id: "black", name: "Noir", hex: "#000000" },
      { id: "red", name: "Rouge", hex: "#e63946" },
    ],
    sizes: ["M", "L", "XL"],
    details: [
      { label: "Détails du produit", content: "Coton premium, finitions renforcées, graphisme Atelier Zéro original." },
      { label: "Coupe et taille", content: "Coupe structurée légèrement oversize. Le mannequin porte une taille L." },
      { label: "Composition", content: "100 % coton. Grammage 240 g/m²." },
      { label: "Conseils d'entretien", content: "Lavage 30°C. Retourner le vêtement avant lavage. Ne pas utiliser de javel." },
      { label: "Livraison internationale", content: "Expédition sous 48h. Frais de livraison confirmés sur WhatsApp." },
    ],
  },
  {
    id: "t-shirt-made-from-nothing",
    name: "T-shirt Made From Nothing",
    chapter: "Chapter 0",
    collection: "Project Genesis",
    price: 20000,
    currency: "FCFA",
    category: "T-shirts",
    soldOut: true,
    shortDescription:
      "Le T-shirt Made From Nothing incarne le point de départ de la Mentalité Zéro. Pièce streetwear minimaliste marquée par le symbole Atelier Zéro.",
    description:
      "Pensé comme une pièce centrale du premier chapitre Atelier Zéro, le T-shirt Made From Nothing associe une silhouette streetwear à des détails graphiques inspirés de la reconstruction. Le marquage arrière rappelle que toute évolution commence à zéro : Made From Nothing, From Zero to Everything.",
    images: {
      black: {
        front: "/assets/products/made-from-nothing-black/front.jpg",
        side: "/assets/products/made-from-nothing-black/side.jpg",
        back: "/assets/products/made-from-nothing-black/back.jpg",
        worn: "/assets/products/made-from-nothing-black/worn.jpeg",
      },
      white: {
        front: "/assets/products/made-from-nothing-white/front.jpg",
        side: "/assets/products/made-from-nothing-white/side.jpg",
        back: "/assets/products/made-from-nothing-white/back.jpg",
        worn: "/assets/products/made-from-nothing-white/worn.jpeg",
      },
    },
    colors: [
      { id: "black", name: "Noir", hex: "#000000" },
      { id: "white", name: "Blanc", hex: "#f2f1ed" },
    ],
    sizes: ["M", "L", "XL"],
    details: [
      { label: "Détails du produit", content: "Symbole Atelier Zéro brodé sur la poitrine, composition graphique au dos." },
      { label: "Coupe et taille", content: "Coupe streetwear légèrement oversize. Le mannequin porte une taille M." },
      { label: "Composition", content: "100 % coton peigné. Grammage 220 g/m²." },
      { label: "Conseils d'entretien", content: "Lavage 30°C. Séchage à l'air libre recommandé." },
      { label: "Livraison internationale", content: "Expédition sous 48h. Frais de livraison confirmés sur WhatsApp." },
    ],
  },
];

export function getProductById(id) {
  return products.find((product) => product.id === id) || null;
}

export function formatPrice(price, currency = "FCFA") {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price) + ` ${currency}`;
}

export function formatPriceCompact(price, currency = "FCFA") {
  return `${price.toLocaleString("fr-FR")} ${currency}`;
}
