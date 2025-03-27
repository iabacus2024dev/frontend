<template>
  <v-card class="mt-3" variant="outlined" elevation="0" border="thin">
    <v-toolbar class="d-flex justify-space-between align-center">
      <v-toolbar-title>
        <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>
        <span class="text-lg-h6">{{ title }}</span>
      </v-toolbar-title>
      <v-btn
        class="me-5"
        text="신규 등록"
        color="#EB6129"
        @click="$emit('openDialog')"
        prepend-icon="mdi-plus"
        variant="flat"
      />
    </v-toolbar>

    <v-data-table-server
      :headers="headers"
      :items="items"
      :loading="loading"
      :page="page"
      :items-length="length"
      @update:items-per-page="$emit('update:size', $event)"
      @click:row="(event, { item }) => $emit('clickRow', item)"
      @update:options="
        ({ page, itemsPerPage, sortBy }) => $emit('loadItems', page, itemsPerPage, sortBy)
      "
      :items-per-page-options="[
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
      ]"
      density="comfortable"
      hover
    >
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="item.status === '진행중' ? 'success' : 'info'"
          size="small"
          text-color="white"
        >
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  headers: Array,
  items: Array,
  page: Number,
  length: Number,
  title: String,
  loading: Boolean,
})
</script>

<style scoped></style>
