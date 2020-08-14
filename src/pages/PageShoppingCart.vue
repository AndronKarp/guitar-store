<template>
  <div
    class="d-flex flex-column w-100"
    :class="{ 'justify-content-center': !isCartFetched }"
  >
    <ShoppingCart v-if="isCartFetched" />
    <b-spinner
      v-else
      class="align-self-center"
      label="Loading..."
      variant="info"
    ></b-spinner>
  </div>
</template>

<script>
import ShoppingCart from "../components/ShoppingCart";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isCartFetched"])
  },
  components: {
    ShoppingCart
  }
};
</script>

<style></style>
