<template>
<VCard
  variant="outlined"
  class="pt-2 px-2"
>
  <VCardItem>
    <VCardTitle>계약 정보</VCardTitle>
  </VCardItem>
  <VCardText>
    <VRow no-gutters="0">
      <VCol
        cols="12"
        md="12"
      >
        <VTextField
          v-model="contractCode"
          label="계약코드"
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
          label="계약시작일자"
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
          label="계약종료일자"
          type="date"
          variant="outlined"
          density="compact">
        </VTextField>
      </VCol>
  </VRow>
  </VCardText>
</VCard>
</template>

<script setup>
import { defineModel } from 'vue';

const contractCode = defineModel('contractCode');
const startDate = defineModel('startDate');
const endDate = defineModel('endDate');

</script>

<style scoped>
</style>
