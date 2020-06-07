<template>
  <b-container fluid class="d-flex mt-3">
    <img
      :src="require(`../assets/${guitar.image}`)"
      :alt="guitar.model"
      style="width: 700px"
    />
    <b-container class="d-flex flex-column">
      <h4>{{ guitar.brand }} {{ guitar.model }}</h4>
      <p>{{ guitar.description }}</p>
      <p class="text-success" v-if="isGuitarInStock(guitar.id)">In Stock</p>
      <p class="text-danger" v-else>Out Of Stock</p>
      <b-button
        :class="{ 'bg-info': isGuitarInStock(guitar.id) }"
        :disabled="!isGuitarInStock(guitar.id)"
        @click="addGuitarToCart(guitar)"
        >Add To Cart</b-button
      >
    </b-container>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    guitar: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["isGuitarInStock"])
  },
  methods: {
    addGuitarToCart(guitar) {
      this.$store.dispatch("addGuitarToCart", guitar);
      this.$store.dispatch("updateGuitarQuantity", guitar.id);
    }
  }
};
</script>

<style></style>
