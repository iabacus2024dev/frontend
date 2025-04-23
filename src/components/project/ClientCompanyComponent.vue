<template>
  <VCard variant="outlined" border="thin" class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>발주사</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="v-row--no-gutters">
        <VCol cols="12" md="12">
          <VTextField
            v-model="clientCompany"
            label="발주사명"
            variant="outlined"
            density="compact"
          />
        </VCol>

        <VCol cols="12" md="12">
          <VTextField
            v-model="clientCompanyRep"
            label="담당자명"
            variant="outlined"
            density="compact"
          />
        </VCol>

        <VCol cols="12" md="12">
          <VTextField
            :model-value="formattedClientCompanyRepPhone"
            @input="handlePhoneInput"
            label="연락처"
            variant="outlined"
            density="compact"
            :rules="[phoneRule]"
          ></VTextField>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel, ref, watch } from 'vue'
import {
  formatPhoneNumberInput,
  isValidPhoneNumber,
  standardizePhoneNumber,
} from '@/utils/PhoneUtils.js'

const clientCompany = defineModel('clientCompany')
const clientCompanyRep = defineModel('clientCompanyRep')
const clientCompanyRepPhone = defineModel('clientCompanyRepPhone')

// Formatted display value for phone
const formattedClientCompanyRepPhone = ref('')

// Format the phone value when it changes
watch(
  clientCompanyRepPhone,
  (newValue) => {
    if (newValue) {
      formattedClientCompanyRepPhone.value = formatPhoneNumberInput(newValue)
    }
  },
  { immediate: true },
)

// Handle phone input changes
const handlePhoneInput = (event) => {
  const inputValue = event.target.value
  const standardized = standardizePhoneNumber(inputValue)
  clientCompanyRepPhone.value = standardized
  formattedClientCompanyRepPhone.value = formatPhoneNumberInput(standardized)
}

// 전화번호 유효성 검사 규칙
const phoneRule = (value) =>
  !value || isValidPhoneNumber(value) || '유효한 전화번호를 입력해주세요.'
</script>

<style scoped></style>
