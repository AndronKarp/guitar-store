<template>
  <b-row class="mb-3" cols-lg="2" cols="1">
    <b-col class="mb-3 mb-lg-0">
      <b-img
        fluid-grow
        :src="require(`../assets/${guitar.model}.png`)"
        :alt="guitar.model"
      />
    </b-col>
    <b-col>
      <h4>{{ guitar.brand }} {{ guitar.model }}</h4>
      <p>{{ guitar.description }}</p>
      <p class="text-success" v-if="isGuitarInStock(guitar)">In Stock</p>
      <p class="text-danger" v-else>Out Of Stock</p>
      <b-button
        :class="{ 'bg-info': isGuitarInStock(guitar) }"
        :disabled="!isGuitarInStock(guitar)"
        @click="addToCart(guitar)"
        >Add To Cart</b-button
      >
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import { guitarsRef } from "../configs/firebase";

export default {
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["guitars"]),
    guitar() {
      return this.guitars.find(guitar => guitar.slug === this.slug);
    },
    isGuitarInStock() {
      return guitar => guitar.quantity > 0;
    }
  },
  methods: {
    addToCart(guitar) {
      this.$store.dispatch("addToCart", guitar);
      guitarsRef
        .child(guitar.id)
        .update({ quantity: this.guitar.quantity - 1 });
    }
  }
};
</script>

<style></style>
