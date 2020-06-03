<template>
  <div id="app">
    <TheNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";

export default {
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
