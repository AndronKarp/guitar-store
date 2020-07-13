<template>
  <b-form @submit.prevent="authorize">
    <b-form-group>
      <b-form-input
        placeholder="Enter your e-mail..."
        type="email"
        v-model="$v.form.email.$model"
        :state="authState"
      ></b-form-input>
    </b-form-group>
    <b-form-group>
      <b-form-input
        placeholder="Enter your password..."
        type="password"
        v-model="$v.form.password.$model"
        :state="authState"
      ></b-form-input>
      <b-form-invalid-feedback :state="authState">
        Invalid e-mail or password
      </b-form-invalid-feedback>
    </b-form-group>
    <b-button
      :class="{ 'bg-info': !$v.$invalid }"
      :disabled="$v.$invalid"
      type="submit"
      >Sign In</b-button
    >
  </b-form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { auth } from "../configs/firebase";

export default {
  data() {
    return {
      authState: null,
      form: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },
  methods: {
    authorize() {
      this.authState = null;
      auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => this.$router.push("/"))
        .catch(() => (this.authState = false));
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
