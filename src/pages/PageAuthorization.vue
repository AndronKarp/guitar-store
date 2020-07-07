<template>
  <b-form @submit.prevent="authorize">
    <custom-input
      v-for="(field, index) in Object.keys(form)"
      :key="index"
      v-model="$v.form[field].value.$model"
      :meta="form[field].meta"
      :validations="$v.form[field].value"
    ></custom-input>
    <b-button
      :class="{ 'bg-info': !$v.$invalid }"
      :disabled="$v.$invalid"
      type="submit"
      >Sign In</b-button
    >
  </b-form>
</template>

<script>
import CustomInput from "../components/CustomInput";
import { required } from "vuelidate/lib/validators";
import formValidation from "../mixins/form-validation";
import { validationMixin } from "vuelidate";
import { auth } from "../configs/firebase";

export default {
  data() {
    return {
      form: {
        email: {
          meta: {
            type: "email",
            placeholder: "Your e-mail...",
            validations: {
              required: {
                rule: required,
                errorMessage: "Required field"
              }
            }
          },
          value: ""
        },
        password: {
          meta: {
            type: "password",
            placeholder: "Your password...",
            validations: {
              required: {
                rule: required,
                errorMessage: "Required field"
              }
            }
          },
          value: ""
        }
      }
    };
  },
  validations() {
    return { form: this.getValidations() };
  },
  methods: {
    async authorize() {
      await auth().signInWithEmailAndPassword(
        this.form.email.value,
        this.form.password.value
      );
      this.$router.push("/");
    }
  },
  components: {
    CustomInput
  },
  mixins: [validationMixin, formValidation]
};
</script>

<style></style>
