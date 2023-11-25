<script setup lang="ts">
import { HSL, HEX } from "../types/color.ts";
import { HSLToHEX, HEXToHSL } from "../services/ColorConverter.ts";

import BaseInput from "./BaseInput.vue";
import BaseNumberInput from "./BaseNumberInput.vue";
import BaseButton from "./BaseButton.vue";

defineProps<{
  color: HSL;
  index: number;
  selected: boolean;
}>();

const emit = defineEmits<{
  (e: "update:color", color: HSL): void;
  (e: "click", payload: MouseEvent): void;
  (e: "remove"): void;
}>();

const updateHex = (text: string) => {
  const hex = text as HEX;
  if (hex == null) return;
  emit("update:color", HEXToHSL(hex) as HSL);
};
</script>

<template>
  <div
    class="color-row"
    :class="{ selected: selected }"
    @click="(payload) => $emit('click', payload)"
  >
    <BaseInput class="input-name" />
    <div
      :style="{
        'background-color': `hsl(${color.h}deg,${color.s}%,${color.l}%)`,
      }"
      class="color-preview"
    ></div>
    <BaseInput
      class="input-hex"
      :text="HSLToHEX({ h: color.h, s: color.s, l: color.l })"
      :maxlength="8"
      pattern="[0-9a-fA-F]{3}([0-9a-fA-F]{3})?"
      @update:text="(t: string) => updateHex(t)"
    />
    <BaseNumberInput
      min="0"
      max="360"
      step="1"
      :number="Math.round(color.h)"
      class="input-hsl"
      @update:number="
        (n) => $emit('update:color', { h: n, s: color.s, l: color.l })
      "
    />
    <BaseNumberInput
      min="0"
      max="100"
      step="1"
      :number="Math.round(color.s)"
      class="input-hsl"
      @update:number="
        (n) => $emit('update:color', { h: color.h, s: n, l: color.l })
      "
    />
    <BaseNumberInput
      min="0"
      max="100"
      step="1"
      :number="Math.round(color.l)"
      class="input-hsl"
      @update:number="
        (n) => $emit('update:color', { h: color.h, s: color.s, l: n })
      "
    />
    <BaseButton label="X" @click="$emit('remove')" />
  </div>
</template>

<style scoped>
.color-row {
  display: flex;
  gap: 8px;
  align-items: center;
  height: 48px;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #0002;
  border-radius: 8px;
}

.color-row.selected {
  box-shadow: 0 0 0 2px #80dfdf;
}

.color-preview {
  width: 32px;
  height: 32px;
  border: 1px solid #0002;
  border-radius: 4px;
}

.input-name {
  width: 64px;
}

.input-hex {
  width: 72px;
}

.input-hsl {
  width: 48px;
}
</style>
