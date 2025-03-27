<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  title: String,
  showView: Boolean,
  showEdit: Boolean
});

const select = ref([]);

const items = [
  '전체',
  '소속 팀',
  '투입 프로젝트',
  '본인',
];

const isDisabled = ref(false);

watch(select, (newValue) => {
  if (newValue.includes("전체")) {
    select.value = ["전체"];
    isDisabled.value = true;
  } else {
    isDisabled.value = false;
  }
});
</script>

<template>
  <div class="d-flex align-center justify-space-between position-relative">
    <p>{{ title }}</p>
    <div class="checkbox-container">
      <div class="checkbox-left">
        <v-checkbox v-if="showView" label="조회"></v-checkbox>
      </div>
      <div class="checkbox-right">
        <v-checkbox v-if="showEdit" label="편집"></v-checkbox>
      </div>
    </div>
    <div class="pt-6 ml-4 combobox-container">
      <v-col cols="12" style="width: 300px;">
        <v-combobox
          v-model="select"
          :items="items"
          chips
          multiple
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="item === '전체'" closable @click:close="select = []">
              {{ item }}
            </v-chip>
            <v-chip v-else-if="!isDisabled" closable @click:close="select.splice(index, 1)">
              {{ item }}
            </v-chip>
          </template>

          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :disabled="isDisabled && item !== '전체'">
              {{ item }}
            </v-list-item>
          </template>
        </v-combobox>
      </v-col>
    </div>
  </div>
</template>

<style scoped>
.position-relative {
  position: relative;
}

.checkbox-container {
  position: absolute;
  top: 30%;
  left: 38%;
  transform: translateX(-50%);
  display: flex;
  width: 200px;
  justify-content: space-between;
  align-items: center;
}
</style>
