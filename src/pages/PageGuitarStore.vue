<template>
  <div
    class="d-flex w-100 h-100"
    :class="{ 'justify-content-center': !areGuitarsFetched }"
  >
    <GuitarList v-if="areGuitarsFetched" />
    <b-spinner
      v-else
      class="align-self-center"
      label="Loading..."
      variant="info"
    ></b-spinner>
  </div>
</template>

<script>
import GuitarList from "../components/GuitarList";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["areGuitarsFetched"])
  },
  components: {
    GuitarList
  }
};
</script>
<style></style>>
