<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  title: String
});
const emit = defineEmits(['viewAuth', 'editAuth', 'authRange'])

const checkView = ref(false);
const checkEdit = ref(false);
const showEdit = props.title !== '매출 관리';
const select = ref([]);

const items = [
  '전체',
  '소속 팀',
  '투입 프로젝트',
  '본인',
];

watch(checkView, (check) => {
  emit('viewAuth', check);
})

watch(checkEdit, (check) => {
  checkView.value = !!check;
  emit('viewAuth', checkView.value);
  emit('editAuth', checkEdit.value);
});

watch(select, (newVal) => {
  emit('authRange', newVal);
})
</script>

<template>
  <div class="d-flex align-center justify-space-between position-relative">
    <p>{{ title }}</p>
    <div class="checkbox-container">
      <div class="checkbox-left">
        <v-checkbox v-model="checkView" label="조회"></v-checkbox>
      </div>
      <div class="checkbox-right">
        <v-checkbox v-if="showEdit" v-model="checkEdit" label="편집"></v-checkbox>
      </div>
    </div>
    <div class="pt-6 ml-4 combobox-container">
      <v-col cols="12" style="width: 300px;">
        <v-combobox
          v-model="select"
          :items="items"
          label="권한 범위"
          chips
          item-title="text"
          item-value="value"
        >
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
