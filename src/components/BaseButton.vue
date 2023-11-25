<script setup lang="ts">
defineProps<{
  label: string;
}>();

defineEmits<{
  click: [payload: MouseEvent];
}>();
</script>

<template>
  <button
    class="button"
    type="button"
    @click="(payload) => $emit('click', payload)"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  background-color: #eee;
  border: 1px solid #0002;
  border-radius: 4px;
}
</style>
