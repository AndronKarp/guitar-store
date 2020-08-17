<template>
  <div class="d-flex flex-column align-items-center">
    <h1 v-if="$scopedSlots.icon">
      <slot name="icon"></slot>
    </h1>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
