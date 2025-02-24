<template>
  <VCard variant="outlined" class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>발주사</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="v-row--no-gutters">
        <VCol cols="12" md="12">
          <VTextField
            v-model="orderingCompanyData.orderingCompany"
            label="발주사명"
            variant="outlined"
            density="compact"
          />
        </VCol>

        <VCol cols="12" md="12">
          <VTextField
            v-model="orderingCompanyData.orderingCompanyRepName"
            label="담당자명"
            variant="outlined"
            density="compact"
          />
        </VCol>

        <VCol cols="12" md="12">
          <VTextField
            v-model="orderingCompanyData.orderingCompanyRepPhone"
            label="연락처"
            variant="outlined"
            density="compact"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel } from 'vue'

const orderingCompanyData = defineModel()
</script>

<style scoped></style>
