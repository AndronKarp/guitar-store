<template>
  <div
    class="d-flex flex-column w-100"
    :class="{ 'justify-content-center align-items-center': !areGuitarsFetched }"
  >
    <b-row v-if="areGuitarsFetched" class="mb-3" cols-lg="2" cols="1">
      <b-col xl="5" class="mb-2 mb-lg-0">
        <b-img
          fluid-grow
          :src="require(`../assets/${guitar.model}.png`)"
          :alt="guitar.model"
          rounded
        />
      </b-col>
      <b-col xl="7">
        <h4>{{ guitar.brand }} {{ guitar.model }}</h4>
        <p>{{ guitar.description }}</p>
        <p class="text-success" v-if="isGuitarInStock(guitar)">In Stock</p>
        <p class="text-danger" v-else>Out Of Stock</p>
        <b-button
          v-if="currentUser"
          :class="{ 'bg-info': isGuitarInStock(guitar) }"
          :disabled="!isGuitarInStock(guitar)"
          @click="addToCart(guitar)"
          >Add To Cart</b-button
        >
        <p class="text-muted" v-else>
          You must be signed in to make purchases!
        </p>
      </b-col>
    </b-row>
    <b-spinner v-else label="Loading..." variant="info"></b-spinner>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { guitarsRef } from "../configs/firebase";
import notifications from "../mixins/notifications";

export default {
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["guitars", "cart", "currentUser", "areGuitarsFetched"]),
    guitar() {
      return this.guitars.find(guitar => guitar.slug === this.slug);
    },
    isGuitarInStock() {
      return guitar => guitar.quantity > 0;
    }
  },
  methods: {
    async addToCart(guitar) {
      const cartItem = this.cart.find(cartItem => cartItem.id === guitar.id);
      cartItem
        ? await this.$store.dispatch("updateCartItemQuantity", {
            cartItemId: cartItem.id,
            value: cartItem.quantity + 1
          })
        : await this.$store.dispatch("addToCart", guitar);
      this.showNotification({
        message: `${guitar.brand} ${guitar.model} added to cart!`,
        type: "success"
      });
      guitarsRef.child(guitar.id).update({ quantity: guitar.quantity - 1 });
    }
  },
  mixins: [notifications]
};
</script>

<style></style>
