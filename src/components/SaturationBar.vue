<script setup lang="ts">
import BaseSlider from "./BaseSlider.vue";

defineProps<{
  hue: number;
  saturation: number;
}>();

defineEmits<{
  (e: "update:saturation", saturation: number): void;
}>();
</script>

<template>
  <BaseSlider
    class="bar"
    :min="0"
    :max="100"
    :value="saturation"
    :style="{ '--hue': `${hue}`, '--saturation': `${saturation}%` }"
    @update:value="$emit('update:saturation', $event)"
  />
</template>

<style scoped>
.bar::-webkit-slider-runnable-track {
  --color: hsl(var(--hue) 100% 50%);

  background: linear-gradient(to right, #888 0%, var(--color) 100%);
}
</style>
