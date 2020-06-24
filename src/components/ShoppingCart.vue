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
          tdClass: "d-flex justify-content-between"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["cart", "cartTotal"])
  },
  methods: {
    removeFromCart(cartItem) {
      this.$store.dispatch("removeCartItem", cartItem);
      this.$store.dispatch("updateGuitarQuantity", {
        guitarId: cartItem.id,
        extraQuantity: cartItem.quantity
      });
    }
  }
};
</script>

<style></style>
