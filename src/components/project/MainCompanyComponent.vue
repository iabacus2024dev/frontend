<template>
  <VCard variant="outlined" border="thin" class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>원청사</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="v-row--no-gutters">
        <VCol cols="12" md="12">
          <VTextField v-model="mainCompany" label="원청사" variant="outlined" density="compact" />
        </VCol>

        <VCol cols="12" md="12">
          <VTextField
            v-model="mainCompanyRep"
            label="담당자명"
            variant="outlined"
            density="compact"
          />
        </VCol>

        <VCol cols="12" md="12">
          <VTextField
            v-model="mainCompanyRepPhone"
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

const mainCompany = defineModel('mainCompany')
const mainCompanyRep = defineModel('mainCompanyRep')
const mainCompanyRepPhone = defineModel('mainCompanyRepPhone')
</script>

<style scoped></style>
