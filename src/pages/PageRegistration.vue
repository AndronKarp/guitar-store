<template>
  <b-form @submit.prevent="register">
    <b-form-group v-for="(field, index) in Object.keys(form)" :key="index">
      <b-form-input
        :placeholder="form[field].placeholder"
        :type="form[field].type"
        v-model="$v.form[field].value.$model"
        :state="validationState(field)"
      ></b-form-input>
      <b-form-invalid-feedback :state="validationState(field)">
        {{ validationErrorMessage(field) }}
      </b-form-invalid-feedback>
    </b-form-group>
    <b-button
      :class="{ 'bg-info': !$v.$invalid }"
      :disabled="$v.$invalid"
      type="submit"
      >Sign Up</b-button
    >
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import * as validators from "vuelidate/lib/validators";
import formValidation from "../mixins/form-validation";
import { auth } from "../configs/firebase";

export default {
  data() {
    return {
      form: {
        name: {
          type: "text",
          placeholder: "Your name...",
          validations: {
            required: {
              rule: validators.required,
              errorMessage: "Required field"
            },
            alpha: {
              rule: validators.alpha,
              errorMessage: "Name must contain only letters"
            },
            minLength: {
              rule: validators.minLength(2),
              errorMessage: "Name must have at least 2 characters"
            }
          },
          value: ""
        },
        email: {
          type: "email",
          placeholder: "Your e-mail...",
          validations: {
            required: {
              rule: validators.required,
              errorMessage: "Required field"
            },
            email: {
              rule: validators.email,
              errorMessage: "Invalid e-mail"
            }
          },
          value: ""
        },
        password: {
          type: "password",
          placeholder: "Your password...",
          validations: {
            required: {
              rule: validators.required,
              errorMessage: "Required field"
            },
            alphaNum: {
              rule: validators.alphaNum,
              errorMessage: "Password must contain only letters and/or numbers"
            },
            minLength: {
              rule: validators.minLength(6),
              errorMessage: "Password must contain at least 6 characters"
            }
          },
          value: ""
        },
        confirmPassword: {
          type: "password",
          placeholder: "Confirm password...",
          validations: {
            required: {
              rule: validators.required,
              errorMessage: "Required field"
            },
            sameAsPassword: {
              rule: validators.sameAs(function() {
                return this.form.password.value;
              }),
              errorMessage: "Passwords don't match"
            }
          },
          value: ""
        }
      }
    };
  },
  validations() {
    return { form: this.setValidations() };
  },
  computed: {
    validationState: () =>
      function(field) {
        const { $dirty, $error } = this.$v.form[field].value;
        return $dirty ? !$error : null;
      },
    validationErrorMessage: () =>
      function(field) {
        const errors = [];
        if (!this.$v.form[field].value.$dirty) return errors;
        const validations = Object.entries(this.form[field].validations);
        validations.forEach(([name, validation]) => {
          !this.$v.form[field].value[name] &&
            errors.push(validation.errorMessage);
        });
        return errors[errors.length - 1];
      }
  },
  methods: {
    async register() {
      await auth().createUserWithEmailAndPassword(
        this.form.email.value,
        this.form.password.value
      );
      const currentUser = auth().currentUser;
      await currentUser.updateProfile({ displayName: this.form.name.value });
      this.$router.push("/");
    }
  },
  mixins: [validationMixin, formValidation]
};
</script>

<style></style>
