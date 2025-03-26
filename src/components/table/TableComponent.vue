<template>
  <v-card class="mt-3" variant="outlined" elevation="0" border="thin">
    <div class="d-flex justify-space-between align-center pa-4 border-b">
      <h2>{{ title }}</h2>
      <div>
        <v-btn color="#EB6129" @click="openDialog" prepend-icon="mdi-plus" variant="flat">
          신규 등록
        </v-btn>
      </div>
    </div>
    <v-data-table-server
      :headers="headers"
      :items="items"
      :loading="loading"
      :page="page"
      :items-length="length"
      v-model:items-per-page="size"
      @click:row="clickRow"
      @update:options="loadItems"
      density="comfortable"
      hover
    >
    </v-data-table-server>
  </v-card>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  headers: Array,
  tableData: Array,
  items: Array,
  page: Number,
  length: Number,
  title: String,
  loading: Boolean,
})

const size = ref(10)
const emits = defineEmits(['clickRow', 'loadItems'])

const clickRow = (event, { item }) => {
  emits('clickRow', item)
}

const loadItems = ({ page, itemsPerPage, sortBy }) => {
  emits('loadItems', page, itemsPerPage, sortBy)
}

const openDialog = () => {}
</script>

<style scoped></style>
