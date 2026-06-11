export const config = {
  whatsapp: {
    phone: '5491112345678',
    message: 'Hola! Me interesa un producto de Charmivolt 🖤',
  },
  store: {
    name: 'Charmivolt',
    email: 'contacto@charmivolt.com',
    instagram: 'https://instagram.com/charmivolt',
    city: 'Buenos Aires, Argentina',
  },
  shipping: {
    methods: [
      {
        name: 'Envío estándar',
        description: 'Entrega en 5 a 10 días hábiles',
        price: 3500,
      },
      {
        name: 'Envío express',
        description: 'Entrega en 24 a 48 hs hábiles',
        price: 7500,
      },
      {
        name: 'Retiro en punto de entrega',
        description: 'Coordinar por WhatsApp',
        price: 0,
      },
    ],
  },
}
