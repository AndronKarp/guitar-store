<template>
  <b-form>
    <custom-input
      v-for="(field, index) in Object.keys(form)"
      :key="index"
      v-model="$v.form[field].value.$model"
      :meta="form[field].meta"
      :validations="$v.form[field].value"
    ></custom-input>
  </b-form>
</template>

<script>
import CustomInput from "../components/CustomInput";
import { required } from "vuelidate/lib/validators";
import formValidation from "../mixins/form-validation";
import { validationMixin } from "vuelidate";

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
  components: {
    CustomInput
  },
  mixins: [validationMixin, formValidation]
};
</script>

<style></style>
