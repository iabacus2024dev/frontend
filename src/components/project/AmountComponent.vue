<template>
  <VCard variant="outlined" class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>금액 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="v-row--no-gutters">
        <VCol cols="12" md="6" class="pr-4">
          <VTextField
            v-model="amountData.expectatedAmount"
            label="예상계금액 (단위:천)"
            variant="outlined"
            density="compact"
          />
        </VCol>

        <VCol cols="12" md="6">
          <VTextField
            v-model="amountData.actualAmount"
            label="예상계금액 (단위:천)"
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

const amountData = defineModel()
</script>

<style scoped></style>
