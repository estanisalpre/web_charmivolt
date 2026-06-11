export const products = [
  {
    id: 'CHV-001',
    name: 'Cartera Noche Eterna',
    price: 32000,
    compareAtPrice: null,
    category: 'carteras',
    description: `Una cartera de cuero genuino con herrajes plateados y detalles góticos grabados a mano. Diseñada para quienes llevan la oscuridad con elegancia.

Medidas: 28 cm x 18 cm x 8 cm
Material: Cuero genuino
Cierre: Magnético con broche de seguridad
Correa: Ajustable y desmontable`,
    images: ['product001.jpg'],
    stock: 5,
    featured: true,
    tags: ['cartera', 'cuero', 'gótico'],
  },
  {
    id: 'CHV-002',
    name: 'Cartera Cruz de Hierro',
    price: 45000,
    compareAtPrice: 52000,
    category: 'carteras',
    description: `Cartera artesanal con cruz de hierro forjado como cierre central. Acabado envejecido, tela interior de terciopelo negro.

Medidas: 22 cm x 15 cm x 6 cm
Material: Cuero PU de alta calidad
Interior: Terciopelo negro con divisiones
Herraje: Cruz de zinc bañada en antique silver`,
    images: ['product002.jpg'],
    stock: 3,
    featured: true,
    tags: ['cartera', 'artesanal', 'cruz'],
  },
  {
    id: 'CHV-003',
    name: 'Bolso Pentagrama Oscuro',
    price: 38500,
    compareAtPrice: null,
    category: 'bolsos',
    description: `Bolso de hombro con pentagrama en relieve sobre cuero color carbón. Ideal para el día a día con actitud.

Medidas: 35 cm x 25 cm x 10 cm
Material: Cuero sintético premium
Cierre: Cremallera YKK negra
Correa: Cadena metálica desmontable`,
    images: ['product003.jpg'],
    stock: 0,
    featured: true,
    tags: ['bolso', 'hombro', 'pentagrama'],
  },
  {
    id: 'CHV-004',
    name: 'Clutch Muerte y Rosas',
    price: 18000,
    compareAtPrice: null,
    category: 'clutches',
    description: `Clutch bordado a mano con motivo de rosas y calaveras sobre fondo negro. Pieza única, producción muy limitada.

Medidas: 20 cm x 12 cm
Material: Tela bordada con marco rígido
Cierre: Broche dorado vintage`,
    images: ['product004.jpg'],
    stock: 2,
    featured: false,
    tags: ['clutch', 'bordado', 'limitado'],
  },
]

export const productById = Object.fromEntries(products.map(p => [p.id, p]))
