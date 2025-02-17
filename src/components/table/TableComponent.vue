<template>
  <v-table
    fixed-header
    height="315px"
    class="table-component"
  >
    <thead>
      <tr>
        <th v-for="(title, index) in tableTitle" :key="index">
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in tableData" :key="index">
        <td v-for="(value, key) in data" :key="key">
          {{value}}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  tableTitle: Array,
  tableData: Array,
})
</script>

<style scoped>
.table-component {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
}
</style>
