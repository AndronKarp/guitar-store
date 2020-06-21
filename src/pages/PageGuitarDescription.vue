<template>
  <b-container fluid class="d-flex mt-2">
    <img
      :src="require(`../assets/${guitar.image}`)"
      :alt="guitar.model"
      style="width: 700px"
    />
    <b-container class="d-flex flex-column">
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
    </b-container>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

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
      this.$store.dispatch("updateGuitarQuantity", {
        guitarId: guitar.id,
        extraQuantity: -1
      });
    }
  }
};
</script>

<style></style>
