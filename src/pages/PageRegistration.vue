<template>
  <b-form>
    <custom-input
      v-for="(field, index) in Object.keys(form)"
      :key="index"
      :field="{ ...form[field].meta, validations: $v.form[field].value }"
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
            validationErrors: {
              required: "Required field",
              alpha: "Name must contain only letters",
              minLength: "Name must have at least 2 characters"
            }
          },
          value: null
        },
        email: {
          meta: {
            type: "email",
            placeholder: "Your e-mail...",
            validationErrors: {
              required: "Required field",
              email: "Invalid e-mail"
            }
          },
          value: null
        },
        password: {
          meta: {
            type: "password",
            placeholder: "Your password...",
            validationErrors: {
              required: "Required field",
              alphaNum: "Password must contain only letters and/or numbers",
              minLength: "Name must have at least 6 characters"
            }
          },
          value: null
        },
        confirmPassword: {
          meta: {
            type: "password",
            placeholder: "Confirm password...",
            validationErrors: {
              required: "Required field",
              sameAsPassword: "Passwords don't match"
            }
          },
          value: null
        }
      }
    };
  },
  validations: {
    form: {
      name: {
        value: {
          required: validators.required,
          alpha: validators.alpha,
          minLength: validators.minLength(2)
        }
      },
      email: {
        value: {
          required: validators.required,
          email: validators.email
        }
      },
      password: {
        value: {
          required: validators.required,
          alphaNum: validators.alphaNum,
          minLength: validators.minLength(6)
        }
      },
      confirmPassword: {
        value: {
          required: validators.required,
          sameAsPassword: validators.sameAs(function() {
            return this.form.password.value;
          })
        }
      }
    }
  },
  components: {
    CustomInput
  },
  mixins: [validationMixin]
};
</script>

<style></style>
