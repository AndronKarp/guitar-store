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
import { auth } from "./configs/firebase";

export default {
  computed: {
    ...mapGetters(["areGuitarsFetched"])
  },
  created() {
    this.setAuthObserver();
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchGuitars");
    this.$store.dispatch("setGuitarsRefChildChangedObserver");
  },
  methods: {
    setAuthObserver() {
      auth.onAuthStateChanged(user => {
        this.$store.dispatch("updateCurrentUser", user);
        if (user) this.fetchCart(user.uid);
      });
    },
    fetchCart(userId) {
      this.$store.dispatch("setCartChildAddedListener", userId);
      this.$store.dispatch("setCartChildUpdatedListener", userId);
      this.$store.dispatch("setCartChildRemovedListener", userId);
    }
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
