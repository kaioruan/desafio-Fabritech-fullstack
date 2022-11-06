import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/admin",
    name: "Admin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
