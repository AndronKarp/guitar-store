<template>
  <b-navbar type="dark" variant="info">
    <b-navbar-brand class="guitar-store-page-link" to="/"
      >Guitar Store</b-navbar-brand
    >

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>Contact Us!</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-if="currentUser" class="ml-auto">
        <b-nav-item to="/cart">
          <b-icon-cart4></b-icon-cart4>
        </b-nav-item>
        <b-dropdown :text="currentUser.displayName" variant="info">
          <b-dropdown-item>Profile</b-dropdown-item>
          <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
        </b-dropdown>
      </b-navbar-nav>

      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item>
          <b-button to="/registration" variant="info">Sign Up</b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button to="/authorization" variant="outline-light"
            >Sign In</b-button
          >
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import { auth } from "../configs/firebase";

export default {
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    signOut() {
      auth().signOut();
      this.$router.push("/authorization");
    }
  }
};
</script>

<style></style>
