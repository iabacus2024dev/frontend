<template>
<VContainer class="mt-5">
  <p class="text-h4 font-weight-bold">계약 상세</p>
</VContainer>

<!-- 상세 정보 폼 -->
<VContainer>
  <VRow>
    <VCol cols="12" md="6" >
      <ProjectInfoComponent class="mb-6"/>
      <ContractInfoComponent />
    </VCol>
    <VCol cols="12" md="6" >
      <ProgressInfoComponent style="height: 100%;"/>
    </VCol>
  </VRow>
</VContainer>

<!-- 테이블 -->
<VContainer class="mt-8">
  <p class="text-h4 font-weight-bold">투입 인원 목록</p>
</VContainer>

<VContainer>
  <TableComponent
    :tableTitle="tableTitleResponse"
    :tableData="tableDataResponse" />

  <TableEventComponent
    :tableDataEvent="tableDataEventCondition"
    @create-data-button-click="fnCreateData"/>
</VContainer>

</template>

<script setup>
import { ref } from 'vue';

import TableComponent from '@/components/table/TableComponent.vue';
import TableEventComponent from '@/components/table/TableEventComponent.vue';

import ProjectInfoComponent from '@/components/project/ProjectInfoComponent.vue';
import ContractInfoComponent from '@/components/project/ContractInfoComponent.vue';
import ProgressInfoComponent from '@/components/project/ProgressInfoComponent.vue';

const tableTitleResponse = ref([
  '메뉴명', '메뉴설명', '열량(Kcal)', '당류(g/%)', '카페인(mg/%)'
]);

const tableDataResponse = ref([
  {
    menuName: '아메리카노',
    menuDescription: '진하게 로스팅한 커피 원두에서 풍미를 느낄 수 있는 에스프레소 음료',
    calories: '15',
    sugar: '0',
    caffeine: '184'
  },
  {
    menuName: '카페 라떼',
    menuDescription: '에스프레소와 스팀밀크 위에 부드러운 우유 거품을 살짝 올려준 에스프레소 음료',
    calories: '190',
    sugar: '12',
    caffeine: '184'
  },
]);

const tableDataEventCondition = ref({
  createData: true,
});

</script>

<style scoped>
.v-card {
  border-color: lightgray;
}
</style>
