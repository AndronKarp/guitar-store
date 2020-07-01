<template>
  <b-form-group>
    <b-form-input
      :placeholder="meta.placeholder"
      :type="meta.type"
      :value="value"
      @input="onInput"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: String,
    meta: {
      type: Object,
      required: true
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style></style>
