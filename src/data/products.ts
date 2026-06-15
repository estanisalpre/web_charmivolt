import type { Product } from '../types/index'

export const products: Product[] = [
  {
    id: "CHV-001",
    name: "Mini bag",
    price: 15000,
    compareAtPrice: null,
    category: "minibags",
    description: ``,
    images: ["product1-001.jpeg", "product1-002.jpeg"],
    stock: 0,
    featured: true,
    tags: ["cartera", "cuero", "gótico"],
  },
  {
    id: "CHV-002",
    name: "Mini bag peluchito",
    price: 32000,
    compareAtPrice: null,
    category: "minibags",
    description: `Cartera de peluche con charms de estrella y cadenas.`,
    images: ["product2-001.jpeg", "product2-002.jpeg"],
    stock: 1,
    featured: true,
    tags: ["cartera", "artesanal", "cruz"],
  },
  {
    id: "CHV-003",
    name: "Mini bag cuero",
    price: 29000,
    compareAtPrice: null,
    category: "minibags",
    description: `Cartera de peluche con charms de estrella y cadenas.`,
    images: ["product3-001.jpeg", "product3-002.jpeg"],
    stock: 0,
    featured: true,
    tags: ["bolso", "hombro", "pentagrama"],
  },
  {
    id: "CHV-004",
    name: "Bag de jean",
    price: 38000,
    compareAtPrice: null,
    category: "bags",
    description: `Clutch bordado a mano con motivo de rosas y calaveras sobre fondo negro. Pieza única, producción muy limitada.`,
    images: ["product4-001.jpeg", "product4-002.jpeg"],
    stock: 0,
    featured: false,
    tags: ["clutch", "bordado", "limitado"],
  },
];

export const productById: Record<string, Product> = Object.fromEntries(
  products.map(p => [p.id, p])
)
