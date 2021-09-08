import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Cakes from '@/views/Cakes.vue';
import About from '@/views/About.vue';
import Cake from '@/views/Cake.vue';

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
