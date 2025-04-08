<script setup>
import {computed, ref, watch} from "vue";

const props = defineProps({
  title: String,
  viewAuth: Boolean,
  editAuth: Boolean,
  authRange: String
});
const emit = defineEmits(['viewAuth', 'editAuth', 'authRange'])

const checkView = computed({
  get: () => props.viewAuth,
  set: (val) => emit('viewAuth', val)
});

const checkEdit = computed({
  get: () => props.editAuth,
  set: (val) => {
    emit('editAuth', val);
    emit('viewAuth', val ? true : props.viewAuth);
  }
});

const showEdit = props.title !== '매출 관리';

const select = computed({
  get: () => props.authRange ?? null,
  set: (val) => emit('authRange', val)
});

const items = [
  '전체',
  '소속 팀',
  '투입 프로젝트',
  '본인',
];
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
