<script setup lang="ts">
import { ref } from "vue";

import { useColors } from "../stores/useColors.ts";
import { useSelector } from "../stores/useSelector";

import ColorListHeader from "./ColorListHeader.vue";
import ColorListItem from "./ColorListItem.vue";
import { HSL } from "../types/color";

defineProps<{
  name: string;
}>();

const colors = useColors();
const selector = useSelector();

const hue = ref<number>(0);
const saturation = ref<number>(50);

const clickAddButton = () => {
  colors.addColor({
    h: hue.value,
    s: saturation.value,
    l: 50,
  });
};

const clickRow = (event: MouseEvent, index: number) => {
  if (event.shiftKey) {
    selector.addBetweenIndexes(index);
  } else if (event.ctrlKey) {
    selector.addIndex(index);
  } else {
    selector.setIndex(index);
  }
};

const updateColor = (color: HSL) => {
  selector.selectedIndexes.forEach((index) => {
    colors.colors[index] = color;
  });
};
</script>

<template>
  <div class="list">
    <ColorListHeader :name="name" @add="clickAddButton" />
    <ColorListItem
      v-for="(_, index) in colors.colors"
      :key="index"
      :index="index"
      :color="colors.colors[index]"
      :selected="selector.selectedIndexes.includes(index)"
      @update:color="(color) => updateColor(color)"
      @remove="colors.removeColor(index)"
      @click="(event) => clickRow(event, index)"
    />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
