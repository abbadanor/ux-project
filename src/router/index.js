import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Cakes from '@/views/Cakes.vue';
import About from '@/views/About.vue';
import Cake from '@/views/Cake.vue';
import Orders from '@/views/Orders.vue';
import Profile from '@/views/Profile.vue';
import Cart from '@/views/Cart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cakes',
    name: 'Cakes',
    component: Cakes,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/cake/:id',
    name: 'Cake',
    component: Cake,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
