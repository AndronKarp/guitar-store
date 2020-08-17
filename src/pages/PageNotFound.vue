<template>
  <div class="d-flex justify-content-center align-items-center w-100">
    <custom-alert>
      <h1 class="display-3">404</h1>
      <p>Looks like this page doesn't exist.</p>
      <b-link to="/">Back to home</b-link>
    </custom-alert>
  </div>
</template>

<script>
import CustomAlert from "../components/CustomAlert";

export default {
  components: {
    CustomAlert
  }
};
</script>

<style></style>
