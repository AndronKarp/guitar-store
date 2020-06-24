<template>
  <b-col>
    <router-link
      :to="{
        name: 'PageGuitarDescription',
        params: { slug: guitar.slug }
      }"
    >
      <b-card
        class="mb-3"
        style="min-width: 280px;"
        :img-src="require(`../assets/${guitar.model}.png`)"
        :img-alt="guitar.model"
      >
        <b-card-title>{{ guitar.brand }} {{ guitar.model }}</b-card-title>
        <b-card-text>{{ guitar.price | currency }}</b-card-text>
      </b-card>
    </router-link>
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
