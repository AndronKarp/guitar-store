<template>
  <div id="app">
    <TheNavbar />
    <b-container class="mt-3 flex-fill d-flex" fluid>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";
import { auth } from "./configs/firebase";

export default {
  created() {
    this.setAuthObserver();
    this.$store.dispatch("fetchGuitars");
    this.$store.dispatch("setGuitarsRefChildChangedObserver");
  },
  methods: {
    setAuthObserver() {
      auth.onAuthStateChanged(user => {
        this.$store.dispatch("updateCurrentUser", user);
        if (user) this.loadUserCart({ cartId: user.uid });
      });
    },
    loadUserCart({ cartId }) {
      this.$store.dispatch("updateCartId", cartId);
      this.$store.dispatch("fetchCart");
    }
  },
  components: {
    TheNavbar
  }
};
</script>

<style lang="scss">
#app {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}
</style>
