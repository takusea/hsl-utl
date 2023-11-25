<script setup lang="ts">
import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";

defineProps<{
  name: string;
}>();

defineEmits<{
  (e: "update:name", name: string): void;
  (e: "add"): void;
}>();
</script>

<template>
  <div class="header">
    <BaseInput :text="name" class="name" />
    <div class="title">色相</div>
    <div class="title">彩度</div>
    <div class="title">明度</div>
    <BaseButton label="追加" @click="$emit('add')" />
  </div>
</template>

<style scoped>
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
</style>
