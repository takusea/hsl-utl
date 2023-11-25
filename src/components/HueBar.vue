<script setup lang="ts">
import BaseSlider from "./BaseSlider.vue";

defineProps<{
  hue: number;
}>();

defineEmits<{
  (e: "update:hue", hue: number): void;
}>();
</script>

<template>
  <BaseSlider
    class="bar"
    :min="0"
    :max="360"
    :value="hue"
    :style="{ '--hue': `${hue}%` }"
    @update:value="$emit('update:hue', $event)"
  />
</template>

<style scoped>
.bar::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    red 0%,
    #ff0 17%,
    lime 33%,
    cyan 50%,
    blue 66%,
    #f0f 83%,
    red 100%
  );
}
</style>
