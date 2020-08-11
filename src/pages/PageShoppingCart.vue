<template>
  <div class="w-100">
    <ShoppingCart v-show="!isCartEmpty" />
    <b-alert :show="isCartEmpty" variant="info">
      <p class="mb-0">The cart is empty for now!</p>
    </b-alert>
  </div>
</template>

<script>
import ShoppingCart from "../components/ShoppingCart";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isCartEmpty"])
  },
  components: {
    ShoppingCart
  }
};
</script>

<style></style>
