import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/productos',
    name: 'products',
    component: () => import('../pages/ProductsPage.vue'),
  },
  {
    path: '/producto/:id',
    name: 'product-detail',
    component: () => import('../pages/ProductDetailPage.vue'),
    props: true,
  },
  {
    path: '/carrito',
    name: 'cart',
    component: () => import('../pages/CartPage.vue'),
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import('../pages/ContactPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})
