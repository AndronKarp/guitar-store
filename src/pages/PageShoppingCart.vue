<template>
  <div
    class="d-flex flex-column w-100"
    :class="{
      'justify-content-center align-items-center': !isCartFetched || isCartEmpty
    }"
  >
    <template v-if="isCartFetched">
      <custom-alert v-if="isCartEmpty">
        <template #icon>
          <b-icon-cart-check variant="success"></b-icon-cart-check>
        </template>
        <h3>Your cart is empty!</h3>
        <b-link to="/">Continue shopping</b-link>
      </custom-alert>
      <ShoppingCart v-else />
    </template>
    <b-spinner v-else label="Loading..." variant="info"></b-spinner>
  </div>
</template>

<script>
import ShoppingCart from "../components/ShoppingCart";
import CustomAlert from "../components/CustomAlert";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isCartFetched", "isCartEmpty"])
  },
  components: {
    ShoppingCart,
    CustomAlert
  }
};
</script>

<style></style>
