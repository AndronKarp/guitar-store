<template>
  <div id="app">
    <TheNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";
import { guitarsRef } from "./configs/firebase";

export default {
  created() {
    this.setFirebaseEvents();
  },
  methods: {
    setFirebaseEvents() {
      guitarsRef.on("child_added", snapshot => {
        this.$store.dispatch("addGuitar", snapshot.val());
      });
    }
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
}
</style>
