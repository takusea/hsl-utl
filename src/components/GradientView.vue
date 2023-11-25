<script setup lang="ts">
import { HSL } from "../types/color.ts";
import { useSelector } from "../stores/useSelector";

defineProps<{
  hue: number;
  colors: HSL[];
}>();

const emit = defineEmits<{
  (e: "color", index: number, color: HSL): void;
}>();

const selector = useSelector();

const onMouseMove = (event: MouseEvent) => {
  const pressed = event.buttons !== 0;
  const unSelected = selector.selectedIndexes.length === 0;
  if (!pressed || unSelected) {
    return;
  }

  const target = event.currentTarget as HTMLInputElement;
  const newColor = {
    h: 0,
    s: (event.movementX / target.clientWidth) * 100,
    l: -(event.movementY / target.clientHeight) * 100,
  };

  selector.selectedIndexes.forEach((selectedIndex) => {
    emit("color", selectedIndex, newColor);
  });
};
</script>

<template>
  <div
    class="gradient"
    :style="{ '--hue': hue }"
    @mousemove="onMouseMove($event)"
  >
    <div
      v-for="(color, index) in colors"
      :key="index"
      class="indicator-container"
      :style="{ '--satuetion': `${color.s}%`, '--light': `${color.l}%` }"
      @mousedown="
        $event.ctrlKey ? selector.addIndex(index) : selector.setIndex(index)
      "
    >
      <div
        class="indicator"
        :class="{ selected: selector.selectedIndexes.includes(index) }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.gradient {
  --color: hsl(var(--hue) 100% 50%);

  position: relative;
  height: 240px;
  background: linear-gradient(to bottom, #fff 0%, #8880 50%, #000 100%),
    linear-gradient(to right, #888 0%, var(--color) 100%);
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px #0002;
}

.indicator-container {
  --size: 16px;

  position: absolute;
  bottom: calc(var(--light) - var(--size) / 2);
  left: calc(var(--satuetion) - var(--size) / 2);
  display: grid;
  place-content: center;
  width: var(--size);
  height: var(--size);
}

.indicator {
  width: 8px;
  height: 8px;
  border: 1px solid #fff8;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #0008;
}

.indicator.selected {
  border: 1px solid #fff;
  box-shadow: 0 0 0 1px #000;
}
</style>
