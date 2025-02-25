<template>
<!-- 페이지 헤더 -->
<v-container class="page-header">
  <h1>테이블 컴포넌트를 테스트하는 페이지</h1>
</v-container>

<!-- 테이블 컴포넌트 -->
<v-container class="box">
  <TableEventComponent
    :tableDataEvent="tableDataEventCondition"
    @create-data-button-click="fnCreateData"
  />

  <TableComponent
    :tableTitle="tableTitleResponse"
    :tableData="tableDataResponse"
  />

  <TableEventComponent
    :tableExcelEvent="tableExcelEventCondition"
    @excel-upload-button-click="fnExcelUpload"
  />
</v-container>
</template>

<script setup>
import { ref } from 'vue';

import TableComponent from '@/components/table/TableComponent.vue';
import TableEventComponent from '@/components/table/TableEventComponent.vue';

/* todo: api 통신으로 실제 데이터를 가져오기 */
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
  {
    menuName: '카푸치노',
    menuDescription: '에스프레소 위에 스팀밀크와 풍부한 양의 우유거품을 올린 에스프레소 음료',
    calories: '145',
    sugar: '9',
    caffeine: '184'
  },
  {
    menuName: '에스프레소',
    menuDescription: '달콤쌉싸름한 맛을 느낄 수 있는 깊고 진한 풍미의 에스프레소 음료',
    calories: '5',
    sugar: '0',
    caffeine: '92'
  },
  {
    menuName: '카페 모카',
    menuDescription: '진한 초콜릿 모카 시럽과 에스프레스를 스팀밀크와 혼합하여 부드러운 휘핑크림을 올린 에스프레소 음료',
    calories: '310',
    sugar: '30',
    caffeine: '192'
  },
  {
    menuName: '바닐라 라떼',
    menuDescription: '에스프레소와 바닐라 시럽, 스팀밀크가 어우러진 부드러운 라떼',
    calories: '210',
    sugar: '22',
    caffeine: '150'
  },
  {
    menuName: '돌체 라떼',
    menuDescription: '깊고 진한 에스프레소에 달콤한 연유를 넣어 부드럽고 달콤한 맛이 특징인 라떼',
    calories: '250',
    sugar: '28',
    caffeine: '170'
  },
  {
    menuName: '흑당 버블 라떼',
    menuDescription: '쫀득한 타피오카 펄과 고소한 우유, 진한 흑당 시럽이 조화를 이루는 라떼',
    calories: '320',
    sugar: '38',
    caffeine: '75'
  },
  {
    menuName: '제주 말차 라떼',
    menuDescription: '고소한 우유와 진한 제주산 말차가 조화를 이루는 부드러운 라떼',
    calories: '180',
    sugar: '18',
    caffeine: '70'
  },
  {
    menuName: '초콜릿 모카',
    menuDescription: '깊고 진한 에스프레소에 달콤한 초콜릿이 어우러진 부드러운 모카 음료',
    calories: '340',
    sugar: '35',
    caffeine: '160'
  },
  {
    menuName: '민트 초코 라떼',
    menuDescription: '상쾌한 민트와 달콤한 초콜릿이 조화를 이루는 라떼',
    calories: '280',
    sugar: '33',
    caffeine: '80'
  },
  {
    menuName: '카라멜 마끼아또',
    menuDescription: '바닐라향이 가미된 스팀밀크 위에 에스프레소와 달콤한 카라멜 시럽이 어우러진 음료',
    calories: '250',
    sugar: '30',
    caffeine: '150'
  }
]);

/* desc: 필요한 테이블 이벤트만 true로 명시 */
// 테이블 데이터 관련 이벤트
const tableDataEventCondition = ref({
  createData: true,
});

// 테이블 엑셀 관련 이벤트
const tableExcelEventCondition = ref({
  excelUpload: true,
  excelDownload: true,
});


const fnCreateData = () => {
  console.log('fnCreateData >>>', 'todo: 데이터 등록 팝업창 뜨기');
};

const fnExcelUpload = () => {
  console.log('fnExcelUpload >>>', 'todo: 엑셀 업로드 실행');
}
</script>

<style scoped></style>
