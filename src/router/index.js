import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../configs/firebase";

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
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "shopping-cart" */ "../pages/PageShoppingCart"
      )
  },
  {
    path: "/registration",
    name: "PageRegistration",
    meta: { requiresUnauthorizedUser: true },
    component: () =>
      import(/* webpackChunkName: "registration" */ "../pages/PageRegistration")
  },
  {
    path: "/authorization",
    name: "PageAuthorization",
    meta: { requiresUnauthorizedUser: true },
    component: () =>
      import(
        /* webpackChunkName: "authorization" */ "../pages/PageAuthorization"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const routeRequiresUnauthorizedUser = to.matched.some(
    record => record.meta.requiresUnauthorizedUser
  );
  const userIsAuthorized = await auth.getCurrentUser();
  if (userIsAuthorized) {
    routeRequiresUnauthorizedUser ? next("/") : next();
  } else {
    routeRequiresAuth ? next("/authorization") : next();
  }
});

export default router;
