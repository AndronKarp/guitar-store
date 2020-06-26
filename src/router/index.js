import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PageGuitarStore",
    component: () =>
      import(/* webpackChunkName: "guitar-store" */ "../pages/PageGuitarStore")
  },
  {
    path: "/details/:slug",
    name: "PageGuitarDetails",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "guitar-details" */ "../pages/PageGuitarDetails"
      )
  },
  {
    path: "/cart",
    name: "PageShoppingCart",
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
