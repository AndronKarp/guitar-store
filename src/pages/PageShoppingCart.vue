<template>
  <b-container fluid class="mt-3">
    <b-table outlined hover striped :items="cart" :fields="fields">
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template v-slot:cell(price)="data">
        {{ data.item.price | currency }}
      </template>
    </b-table>
    <p>Total: {{ cartTotal | currency }}</p>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fields: ["index", "brand", "model", "quantity", "price"]
    };
  },
  computed: {
    ...mapGetters(["cart", "cartTotal"])
  }
};
</script>

<style></style>
