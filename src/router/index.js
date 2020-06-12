import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../pages/PageHome")
  },
  {
    path: "/description/:slug",
    name: "GuitarDescription",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "guitar-description" */ "../pages/PageGuitarDescription"
      )
  },
  {
    path: "/cart",
    name: "ShoppingCart",
    component: () =>
      import(
        /* webpackChunkName: "shopping-cart" */ "../pages/PageShoppingCart"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
