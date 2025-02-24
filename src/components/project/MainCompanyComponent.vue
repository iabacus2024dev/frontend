<template>
  <VCard variant="outlined" class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>원청사</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="v-row--no-gutters">
        <VCol cols="12" md="12">
          <VTextField
            v-model="mainCompanyData.mainCompany"
            label="원청사"
            variant="outlined"
            density="compact"
          />
        </VCol>

        <VCol cols="12" md="12">
          <VTextField
            v-model="mainCompanyData.mainCompanyRepName"
            label="담당자명"
            variant="outlined"
            density="compact"
          />
        </VCol>

        <VCol cols="12" md="12">
          <VTextField
            v-model="mainCompanyData.mainCompanyRepPhone"
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

const mainCompanyData = defineModel()
</script>

<style scoped></style>
