<template>
  <div id="app">
    <TheNavbar />
    <b-container
      class="d-flex flex-column flex-fill mt-3"
      :class="{ 'justify-content-center': !areGuitarsFetched }"
      fluid
    >
      <router-view v-if="areGuitarsFetched"></router-view>
      <b-spinner
        v-else
        class="align-self-center"
        label="Loading..."
        variant="info"
      ></b-spinner>
    </b-container>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["areGuitarsFetched"])
  },
  created() {
    this.$store.dispatch("fetchGuitars");
  },
  components: {
    TheNavbar
  }
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}
</style>
