import type { Config } from '../types/index'

export const config: Config = {
  whatsapp: {
    phone: "542364240354",
    message: "¡Hola! Me interesa un producto de Charmivolt",
  },
  store: {
    name: "Charmivolt",
    email: "charmivolt@gmail.com",
    instagram: "https://www.instagram.com/charmivolt?utm_source=qr",
    city: "Junín, Buenos Aires, Argentina",
  },
  shipping: {
    methods: [
      {
        name: "Envío estándar",
        description: "Entrega entre 24 a 48hs hábiles.",
        price: 9990,
      },
      {
        name: "¿Sos de Junín? No cobramos envío",
        description:
          "Si sos de Junín, el envío es gratis o podes pasar a retirarlo.",
        price: 0,
      },
    ],
  },
};
