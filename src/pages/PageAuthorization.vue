<template>
  <b-form @submit.prevent="authorize">
    <b-form-group>
      <b-form-input
        placeholder="Enter your e-mail..."
        type="email"
        v-model="$v.form.email.$model"
      ></b-form-input>
    </b-form-group>
    <b-form-group>
      <b-form-input
        placeholder="Enter your password..."
        type="password"
        v-model="$v.form.password.$model"
      ></b-form-input>
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
import formValidation from "../mixins/form-validation";
import { validationMixin } from "vuelidate";
import { auth } from "../configs/firebase";

export default {
  data() {
    return {
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
      auth().signInWithEmailAndPassword(this.form.email, this.form.password);
    }
  },
  mixins: [validationMixin, formValidation]
};
</script>

<style></style>
