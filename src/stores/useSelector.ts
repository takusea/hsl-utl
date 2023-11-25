import { ref } from "vue";
import { defineStore } from "pinia";

export const useSelector = defineStore("selector", () => {
  const selectedIndexes = ref<number[]>([]);

  const addIndex = (index: number) => {
    if (selectedIndexes.value.includes(index)) {
      return;
    }
    selectedIndexes.value.unshift(index);
  };

  const addBetweenIndexes = (index: number) => {
    if (selectedIndexes.value.length === 0) {
      setIndex(index);
    }

    const min = Math.min(selectedIndexes.value[0], index);
    const max = Math.max(selectedIndexes.value[0], index);

    const arr = [...Array(max - min + 1)].map((_, i) => i + min);

    selectedIndexes.value = [selectedIndexes.value[0]];
    arr.forEach((index) => {
      if (selectedIndexes.value.includes(index)) {
        return;
      }
      selectedIndexes.value.push(index);
    });
  };

  const removeIndex = (index: number) => {
    selectedIndexes.value.splice(index, 1);
  };

  const setIndex = (index: number) => {
    selectedIndexes.value = [index];
  };

  return {
    selectedIndexes,
    addIndex,
    addBetweenIndexes,
    removeIndex,
    setIndex,
  };
});
