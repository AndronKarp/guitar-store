<template>
  <div id="app" :class="{ 'justify-content-center': !areGuitarsFetched }">
    <MainLayout v-if="areGuitarsFetched" />
    <b-spinner
      v-else
      class="align-self-center"
      label="Loading..."
      variant="info"
    ></b-spinner>
  </div>
</template>

<script>
import MainLayout from "./layouts/MainLayout";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["areGuitarsFetched"])
  },
  created() {
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("setAuthObserver");
    this.$store.dispatch("fetchGuitars");
    this.$store.dispatch("setGuitarsRefChildChangedObserver");
  },
  components: {
    MainLayout
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}
</style>
