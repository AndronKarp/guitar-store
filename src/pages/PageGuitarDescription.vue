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
    </b-container>
  </b-container>
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
