<template>
  <b-form @submit.prevent="register">
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
      >Sign Up</b-button
    >
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import * as validators from "vuelidate/lib/validators";
import CustomInput from "../components/CustomInput";
import formValidation from "../mixins/form-validation";
import { auth } from "../configs/firebase";

export default {
  data() {
    return {
      form: {
        name: {
          meta: {
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
            }
          },
          value: ""
        },
        email: {
          meta: {
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
                rule: validators.required,
                errorMessage: "Required field"
              },
              alphaNum: {
                rule: validators.alphaNum,
                errorMessage:
                  "Password must contain only letters and/or numbers"
              },
              minLength: {
                rule: validators.minLength(6),
                errorMessage: "Password must contain at least 6 characters"
              }
            }
          },
          value: ""
        },
        confirmPassword: {
          meta: {
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
  components: {
    CustomInput
  },
  mixins: [validationMixin, formValidation]
};
</script>

<style></style>
