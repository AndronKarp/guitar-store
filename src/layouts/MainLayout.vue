<template>
  <div class="d-flex flex-column h-100">
    <TheNavbar />
    <b-container class="mt-3 flex-fill d-flex" fluid>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar";

export default {
  components: {
    TheNavbar
  }
};
</script>

<style></style>
