<script setup lang="ts">
defineProps<{
  value: number;
  min: number;
  max: number;
}>();

defineEmits<{
  (e: "update:value", value: number): void;
}>();
</script>

<template>
  <input
    type="range"
    :value="value"
    :min="min"
    :max="max"
    @input="
      $emit(
        'update:value',
        Number(($event.currentTarget as HTMLInputElement).value),
      )
    "
  />
</template>

<style scoped>
::-webkit-slider-runnable-track {
  height: 16px;
  margin: 8px 0;
  background: #0002;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px #0002;
}

::-webkit-slider-thumb {
  width: 4px;
  height: 100%;
  appearance: none;
  border: 1px solid #fff8;
  border-radius: 2px;
  box-shadow: 0 0 0 1px #0008;
}
</style>
