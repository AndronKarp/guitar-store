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
import { validationMixin } from "vuelidate";
import * as validators from "vuelidate/lib/validators";
import CustomInput from "../components/CustomInput";

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
    const form = {};
    const formFields = Object.entries(this.form);
    formFields.forEach(([fieldName, field]) => {
      const value = {};
      const validations = Object.entries(field.meta.validations);
      validations.forEach(([validationName, validation]) => {
        value[validationName] = validation.rule;
      });
      form[fieldName] = { value };
    });
    return { form };
  },
  components: {
    CustomInput
  },
  mixins: [validationMixin]
};
</script>

<style></style>
