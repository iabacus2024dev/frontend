<template>
  <div class="text-center mt-3">
    <v-pagination
      :model-value="page"
      :length="length"
      :total-visible="10"
      density="default"
      @update:modelValue="handleUpdate"
    />
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps(['page', 'length'])
let emits = defineEmits(['change-page'])

const handleUpdate = (value) => {
  emits('change-page', value)
}
</script>

<style scoped></style>
