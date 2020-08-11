<template>
  <div class="d-flex flex-fill justify-content-center align-items-center">
    <b-form
      class="d-flex flex-column w-25"
      style="min-width: 280px"
      @submit.prevent="signIn"
    >
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
      >
        <b-spinner
          v-if="isFormSubmitting"
          label="Loading..."
          variant="light"
          small
        ></b-spinner
        ><template v-else>Sign In</template>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { auth } from "../configs/firebase";
import moveToPage from "../mixins/move-to-page";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      authState: null,
      isFormSubmitting: false
    };
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },
  methods: {
    signIn() {
      this.authState = null;
      this.isFormSubmitting = true;
      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => this.moveTo("PageGuitarStore"))
        .catch(() => (this.authState = false))
        .finally(() => (this.isFormSubmitting = false));
    }
  },
  mixins: [validationMixin, moveToPage]
};
</script>

<style></style>
