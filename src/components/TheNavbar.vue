<template>
  <b-navbar type="dark" variant="info">
    <b-navbar-brand :to="{ name: 'PageGuitarStore' }">Guitar Store</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>Contact Us!</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item
          class="d-flex align-items-center"
          right
          :to="{ name: 'PageShoppingCart' }"
          ><b-icon icon="cart4"></b-icon
        ></b-nav-item>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <b-avatar variant="primary" text="JD"></b-avatar>
          </template>
          <b-dropdown-item>Profile</b-dropdown-item>
          <b-dropdown-item>Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style></style>
