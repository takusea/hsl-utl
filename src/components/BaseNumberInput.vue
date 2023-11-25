<script setup lang="ts">
defineProps<{
  number?: number;
}>();

defineEmits<{
  (e: "update:number", number: number): void;
}>();
</script>

<template>
  <input
    class="input"
    type="number"
    :value="number"
    @input="
      $emit(
        'update:number',
        Number(($event.currentTarget as HTMLInputElement).value),
      )
    "
    @focus="($event.currentTarget as HTMLInputElement).select()"
  />
</template>

<style scoped>
.input {
  height: 32px;
  padding: 4px;
  font-family: hackgen, monospace;
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
