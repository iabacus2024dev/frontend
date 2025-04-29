<template>
  <v-card class="mt-3" variant="outlined" elevation="0" border="thin">
    <v-toolbar class="d-flex justify-space-between align-center">
      <v-toolbar-title>
        <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>
        <span class="text-lg-h6">{{ title }}</span>
      </v-toolbar-title>
      <v-btn
        v-if="showButton"
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
      :items-per-page="size"
      :sort-by="sort"
      :hide-default-footer="showFooter"
      @update:items-per-page="(newSize) => (size = newSize)"
      @click:row="(event, { item }) => $emit('clickRow', item)"
      @update:options="
        ({ page, itemsPerPage, sortBy }) => {
          size = itemsPerPage
          sort = sortBy
          $emit('loadItems', page, itemsPerPage, sortBy)
        }
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
          :color="
            item.status === '진행중' || item.status === '재직'
              ? 'info'
              : item.status === '완료' || item.status === '퇴사'
                ? 'error'
                : 'success'
          "
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
import { computed, defineProps, ref, watch } from 'vue'

const props = defineProps({
  headers: Array,
  items: Array,
  page: Number,
  length: Number,
  title: String,
  loading: Boolean,
  size: Number,
  showFooter: {
    type: Boolean,
    default: false, // 기본은 footer을 보이도록
  },
  showButton: {
    type: Boolean,
    default: true, // 기본은 버튼을 보이도록
  },
})

const size = ref(
  localStorage.getItem('itemsPerPage')
    ? Number(localStorage.getItem('itemsPerPage'))
    : props.size || 10,
)

watch(
  () => props.size,
  (newSize) => {
    size.value = newSize
  },
)

watch(size, (newSize) => {
  localStorage.setItem('itemsPerPage', newSize)
})

const sortKey = computed(() => props.title + ' sort')

const storedSort = localStorage.getItem(sortKey.value)
const sort = ref(storedSort ? JSON.parse(storedSort) : [])

watch(sort, (newSort) => {
  localStorage.setItem(sortKey.value, JSON.stringify(newSort))
})
</script>

<style scoped></style>
