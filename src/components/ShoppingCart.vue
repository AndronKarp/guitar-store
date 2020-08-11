<template>
  <b-table borderless responsive :items="cart" :fields="fields">
    <template v-slot:cell(№)="data">
      {{ data.index + 1 }}
    </template>
    <template v-slot:cell(price)="data">
      <p class="mb-0">{{ data.item.price | currency }}</p>
      <b-icon
        @click="removeFromCart(data.item)"
        class="ml-3"
        style="cursor: pointer; width: 24px; height: 24px"
        icon="x"
      ></b-icon>
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
import { guitarsRef } from "../configs/firebase";

export default {
  data() {
    return {
      fields: [
        "№",
        "brand",
        "model",
        "quantity",
        {
          key: "price",
          label: "Unit price",
          tdClass: "d-flex justify-content-between"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["cart", "cartTotal", "guitars"])
  },
  methods: {
    removeFromCart(cartItem) {
      this.$store.dispatch("removeFromCart", cartItem);
      const guitar = this.guitars.find(guitar => guitar.id === cartItem.id);
      guitarsRef
        .child(guitar.id)
        .update({ quantity: guitar.quantity + cartItem.quantity });
    }
  }
};
</script>

<style></style>
