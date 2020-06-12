<template>
  <b-table
    class="m-2"
    responsive
    outlined
    striped
    :items="cart"
    :fields="fields"
  >
    <template v-slot:cell(№)="data">
      {{ data.index + 1 }}
    </template>
    <template v-slot:cell(price)="data">
      {{ data.item.price | currency }}
    </template>
    <template v-slot:custom-foot>
      <b-tr>
        <b-th colspan="5">Total: {{ cartTotal | currency }}</b-th>
      </b-tr>
    </template>
  </b-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fields: ["№", "brand", "model", "quantity", "price"]
    };
  },
  computed: {
    ...mapGetters(["cart", "cartTotal"])
  }
};
</script>

<style></style>
