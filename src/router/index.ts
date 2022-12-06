import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DashboardView from '../views/DashboardView/DashboardView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/diary',
    name: 'diary',
    component: () => import('../views/DiaryView/DiaryView.vue'),
  },
  {
    path: '/foods',
    name: 'foods',
    component: () => import('../views/FoodsView/FoodsView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
