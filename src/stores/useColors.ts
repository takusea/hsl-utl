import { ref } from "vue";
import { HSL } from "../types/color";
import { defineStore } from "pinia";

export const useColors = defineStore("colors", () => {
  const init = () => {
    const ns = [...Array(9)].map((_, i) => i);
    return ns.map((n) => {
      return {
        h: 0,
        s: 50,
        l: (n + 1) * 10,
      };
    });
  };

  const colors = ref<HSL[]>(init());

  const addColor = (color: HSL) => {
    colors.value.push(color);
  };

  const removeColor = (index: number) => {
    colors.value.splice(index, 1);
  };

  const setHue = (hue: number) => {
    colors.value = colors.value.map((color) => {
      return {
        ...color,
        h: hue,
      };
    });
  };

  const setSaturation = (saturation: number) => {
    colors.value = colors.value.map((color) => {
      return {
        ...color,
        s: saturation,
      };
    });
  };

  return {
    colors,
    addColor,
    removeColor,
    setSaturation,
    setHue,
  };
});
