<script setup lang="ts">
defineProps<{
  text?: string;
  maxlength?: number;
}>();

defineEmits<{
  (e: "update:text", text: string): void;
}>();
</script>

<template>
  <input
    :maxlength="maxlength"
    class="input"
    type="text"
    :value="text"
    @input="
      $emit('update:text', ($event.currentTarget as HTMLInputElement).value)
    "
    @focus="($event.currentTarget as HTMLInputElement).select()"
  />
</template>

<style scoped>
.input {
  height: 32px;
  padding: 4px;
  font-family: hackgen, monospace;
  background-color: #fff;
  border: 1px solid #0002;
  border-radius: 4px;
}

.input:read-only {
  background-color: #eee;
}

.input:invalid {
  border: 2px solid #d12e2e;
}
</style>
