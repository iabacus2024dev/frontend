<template>
  <v-container>
    <h1>트랜스퍼 리스트 테스트</h1>
  </v-container>
  <v-container>
    <TransferListComponent :rawDataProps="rawDataResponse" :test="testResponse" />
  </v-container>

</template>

<script setup>
import { ref } from 'vue';

import TransferListComponent from '@/components/common/TransferListComponent.vue';

/* 실제로는 조직원들 데이터 가져오는 api 통신해야됨 */
const rawDataResponse = ref({
  "통신사업본부": {
    "통신이행담당":  {
      "가입정보팀": ["양정호 팀장", "김봉진 수석"],
      "고갹정보팀": ["김정옥 팀장", "김은미 책임"],
      "빌링시스템팀": ["최경묵 팀장", "김현우 수석"],
    },
    "경영빌림당당":{
      "경영플랫폼팀": ["이용설 팀장", "지정현 책임"],
      "CRM팀": ["김태종 팀장", "김도연 책임"],
    }
  },
  "미래사업본부": {
    "전략사업담당":  {
      "컨버저스사업팀": ["채은희 팀장", "나성연 책임"],
      "핀테크사업팀": ["고영석 팀장", "김동수 책임"],
    },
    "AI/DATA사업담당":{
      "Data플랫폼사업팀": ["조창원 팀장", "최정웅 수석"],
      "지능플랫폼사업팀": ["금정우 팀장", "김도연 책임"],
    }
  },
});

const testResponse = ref(
  ["hhtest", "123123"]
);

</script>

<style scoped>
.v-container {
  padding: 10px;
}

</style>
