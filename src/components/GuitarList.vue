<template>
  <b-container fluid class="mt-3">
    <b-row cols-xl="4" cols-lg="3" cols-md="2" cols="1">
      <GuitarListItem
        v-for="(guitar, index) in guitars"
        :key="index"
        :guitar="guitar"
      />
    </b-row>
  </b-container>
</template>

<script>
import GuitarListItem from "./GuitarListItem";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["guitars"])
  },
  components: {
    GuitarListItem
  }
};
</script>

<style></style>
