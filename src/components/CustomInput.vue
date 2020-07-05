<template>
  <b-form-group>
    <b-form-input
      :placeholder="meta.placeholder"
      :type="meta.type"
      :value="value"
      @input="onInput"
      :state="inputState"
    ></b-form-input>
    <b-form-invalid-feedback :state="inputState">
      {{ validationErrorMessage }}
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import { validationMixin } from "vuelidate";

export default {
  props: {
    value: String,
    meta: {
      type: Object,
      required: true
    },
    validations: {
      type: Object,
      required: true
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  computed: {
    inputState() {
      return this.validations.$dirty ? !this.validations.$invalid : null;
    },
    validationErrorMessage() {
      const errors = [];
      if (!this.validations.$dirty) return errors;
      const validations = Object.entries(this.meta.validations);
      validations.forEach(([name, validation]) => {
        !this.validations[name] && errors.push(validation.errorMessage);
      });
      return errors[errors.length - 1];
    }
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
