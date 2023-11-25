<script setup lang="ts">
import { ref, watch } from "vue";

import { useColors } from "./stores/useColors.ts";
import { HSL } from "./types/color";

import GradientView from "./components/GradientView.vue";
import SaturationBar from "./components/SaturationBar.vue";
import HueBar from "./components/HueBar.vue";
import ColorList from "./components/ColorList.vue";

const colors = useColors();

const name = ref<string>("primary");
const hue = ref<number>(0);
const saturation = ref<number>(50);

watch(hue, (hue) => {
  colors.setHue(hue);
});

watch(saturation, (saturation) => {
  colors.setSaturation(saturation);
});

const a = (index: number, newColor: HSL) => {
  colors.colors[index] = {
    h: colors.colors[index].h,
    s: Math.min(Math.max(newColor.s + colors.colors[index].s, 0), 100),
    l: Math.min(Math.max(newColor.l + colors.colors[index].l, 0), 100),
  };
};
</script>

<template>
  <div class="main">
    <div class="inner">
      <div class="column">
        <GradientView :hue="hue" :colors="colors.colors" @color="a" />
        <SaturationBar v-model:saturation="saturation" :hue="hue" />
        <HueBar v-model:hue="hue" />
      </div>
      <ColorList :name="name" />
    </div>
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  user-select: none;
  background-color: hsl(0deg 0% 98%);
}

.inner {
  display: grid;
  grid-template-columns: 480px auto;
  gap: 16px;
  width: fit-content;
  padding: 32px;
  margin: auto;
}

.header {
  display: flex;
  gap: 8px;
}

.name {
  flex-grow: 1;
}

.title {
  display: grid;
  place-content: center;
  width: 48px;
  height: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
