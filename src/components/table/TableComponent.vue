<template>
  <v-sheet border rounded>
    <v-data-table :headers="headers" :items="items" hide-default-footer hover @click:row="clickRow">
    </v-data-table>
  </v-sheet>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  headers: Array,
  tableData: Array,
  items: Array,
})

const emit = defineEmits(['clickRow'])

const clickRow = (event, { item }) => {
  emit('clickRow', item)
}
</script>

<style scoped></style>
