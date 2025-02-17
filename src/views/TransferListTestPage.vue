<template>
  <v-container>
    <h2>트랜스퍼 리스트 테스트 중입니다.</h2>
  </v-container>

  <!-- 트랜스퍼 리스트 -->
  <v-container>
    <TransferList
      :leftList="leftList"
      :rightList="rightList"
      @updateLeftList="updateLeftList"
      @updateRightList="updateRightList"
    />
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import TransferList from '@/components/TransferList.vue';

const leftList = ref([
  { value: 1, label: "김봉재" },
  { value: 2, label: "김진규" },
  { value: 3, label: "박상철" },
  { value: 7, label: "임세인" },
]);

const rightList = ref([
  { value: 4, label: "유하진" },
  { value: 5, label: "이동욱" },
  { value: 6, label: "이지수" },
]);

// 부모에서 리스트 업데이트
function updateLeftList(updatedList) {
  leftList.value = updatedList;
}

function updateRightList(updatedList) {
  rightList.value = updatedList;
}
</script>

<style scoped>
</style>
