<template>
<VCard
  variant="outlined"
  class="pt-2 px-2"
>
  <VCardItem>
    <VCardTitle>진행 정보</VCardTitle>
  </VCardItem>
  <VCardText>
    <VRow no-gutters="0">
    <VCol
      cols="12"
      md="12"
    >
      <VSelect
        v-model="status"
        :items="progressStatusItems"
        label="진행상태"
        variant="outlined"
        density="compact"/>
    </VCol>
    <VCol
      cols="12"
      md="6"
      class="pr-2"
    >
      <VTextField
        v-model="startDate"
        label="투입시작일자"
        type="date"
        variant="outlined"
        density="compact">
      </VTextField>
    </VCol>
    <VCol
      cols="12"
      md="6"
      class="pl-2"
    >
      <VTextField
        v-model="endDate"
        label="투입종료일자"
        type="date"
        variant="outlined"
        density="compact">
      </VTextField>
    </VCol>
  </VRow>
  </VCardText>
</VCard>
<!-- 추후에 시작날짜가 종료일자를 앞질러 나가지 못하도록 막을 필요 있음 -->
</template>

<script setup>
import { defineModel } from 'vue';

const progressStatusItems = ['예약', "진행중", "완료"];

const status = defineModel('status');
const startDate = defineModel('startDate');
const endDate = defineModel('endDate');

</script>

<style scoped>
</style>
