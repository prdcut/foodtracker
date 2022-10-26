import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import DashboardView from "../views/DashboardView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/diary",
    name: "diary",
    component: () => import("../views/DiaryView.vue"),
  },
  {
    path: "/foods",
    name: "foods",
    component: () => import("../views/FoodsView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
