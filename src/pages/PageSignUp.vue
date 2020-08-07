<template>
  <div class="d-flex flex-fill justify-content-center align-items-center">
    <b-form
      @submit.prevent="signUp"
      class="d-flex flex-column w-25"
      style="min-width: 280px"
    >
      <b-form-group v-for="(field, index) in Object.keys(form)" :key="index">
        <b-form-input
          :id="form[field].id"
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
      >
        <b-spinner
          v-if="isFormSubmitting"
          label="Loading..."
          variant="light"
          small
        ></b-spinner>
        <template v-else>Sign Up</template>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import * as validators from "vuelidate/lib/validators";
import { auth, usersRef } from "../configs/firebase";
import { mapGetters } from "vuex";
import moveToHome from "../mixins/move-to-home";

export default {
  data() {
    return {
      form: {
        name: {
          id: "name",
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
          id: "email",
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
            },
            unique: {
              rule(email) {
                return !this.isEmailTaken(email);
              },
              errorMessage: "E-mail is already taken"
            }
          },
          value: ""
        },
        password: {
          id: "password",
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
          id: "confirm-password",
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
      },
      isFormSubmitting: false
    };
  },
  validations() {
    const form = {};
    const formFields = Object.entries(this.form);
    formFields.forEach(([fieldName, field]) => {
      const value = {};
      const validations = Object.entries(field.validations);
      validations.forEach(([validationName, validation]) => {
        value[validationName] = validation.rule;
      });
      form[fieldName] = { value };
    });
    return { form };
  },
  computed: {
    ...mapGetters(["currentUser", "isEmailTaken"]),
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
        return errors.length ? errors[errors.length - 1] : null;
      }
  },
  methods: {
    async signUp() {
      this.isFormSubmitting = true;
      await auth.createUserWithEmailAndPassword(
        this.form.email.value,
        this.form.password.value
      );
      await this.$store.dispatch("updateUserDisplayName", this.form.name.value);
      this.isFormSubmitting = false;
      this.moveToHomePage();
      this.addNewUserToDatabase();
    },
    addNewUserToDatabase() {
      usersRef.child(this.currentUser.uid).set({
        name: this.currentUser.displayName,
        email: this.currentUser.email
      });
    }
  },
  mixins: [validationMixin, moveToHome]
};
</script>

<style></style>
