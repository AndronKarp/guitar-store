import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/PageHome")
  },
  {
    path: "/:path",
    name: "GuitarDescription",
    props: true,
    component: () => import("../pages/PageGuitarDescription")
  },
  {
    path: "/cart",
    name: "ShoppingCart",
    component: () => import("../pages/PageShoppingCart")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
