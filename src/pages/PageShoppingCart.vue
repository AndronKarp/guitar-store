<template>
  <b-row cols="1">
    <b-col>
      <ShoppingCart v-show="!isCartEmpty" />
      <b-alert :show="isCartEmpty" variant="info">
        <p class="mb-0">The cart is empty for now!</p>
      </b-alert>
    </b-col>
  </b-row>
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
