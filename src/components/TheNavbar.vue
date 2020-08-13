<template>
  <b-navbar sticky type="dark" variant="info">
    <b-navbar-brand class="guitar-store-page-link" to="/"
      >Guitar Store</b-navbar-brand
    >

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <template v-if="currentUser">
          <b-nav-item class="shopping-cart-page-link" to="/cart">
            <b-icon-cart4></b-icon-cart4>
          </b-nav-item>
          <b-dropdown :text="currentUser.displayName" variant="info">
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-dropdown>
        </template>

        <template v-else>
          <b-button
            class="sign-up-button mr-2"
            to="/join"
            squared
            variant="info"
            >Sign Up</b-button
          >
          <b-button
            class="sign-in-button"
            to="/login"
            squared
            variant="outline-light"
            >Sign In</b-button
          >
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import { auth } from "../configs/firebase";
import moveToPage from "../mixins/move-to-page";

export default {
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    async signOut() {
      await auth.signOut();
      this.moveTo("PageSignIn");
      this.$store.dispatch("clearCart");
    }
  },
  mixins: [moveToPage]
};
</script>

<style></style>
