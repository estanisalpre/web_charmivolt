export interface Product {
  id: string
  name: string
  price: number
  compareAtPrice: number | null
  category: string
  description: string
  images: string[]
  stock: number
  featured: boolean
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Slide {
  id: number
  noText: boolean
  image: string
  title: string
  subtitle: string
  link: string
  cta: string
}

export interface ShippingMethod {
  name: string
  description: string
  price: number
}

export interface Config {
  whatsapp: {
    phone: string
    message: string
  }
  store: {
    name: string
    email: string
    instagram: string
    city: string
  }
  shipping: {
    methods: ShippingMethod[]
  }
}
