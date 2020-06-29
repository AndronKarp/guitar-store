<template>
  <b-form-group>
    <b-form-input
      v-model="field.validations.$model"
      :type="field.type"
      :placeholder="field.placeholder"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
