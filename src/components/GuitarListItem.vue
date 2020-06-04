<template>
  <b-col>
    <b-card
      class="m-2"
      style="min-width: 280px;"
      :img-src="require('../assets/' + guitar.image)"
      :img-alt="guitar.model"
    >
      <b-card-title>{{ guitar.brand }} {{ guitar.model }}</b-card-title>
      <b-card-text>Price: ${{ guitar.price }}</b-card-text>
    </b-card>
  </b-col>
</template>

<script>
export default {
  props: {
    guitar: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
