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
            :model-value="formattedMainCompanyRepPhone"
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

const mainCompany = defineModel('mainCompany')
const mainCompanyRep = defineModel('mainCompanyRep')
const mainCompanyRepPhone = defineModel('mainCompanyRepPhone')

// Formatted display value for phone
const formattedMainCompanyRepPhone = ref('')

// Format the phone value when it changes
watch(
  mainCompanyRepPhone,
  (newValue) => {
    if (newValue) {
      formattedMainCompanyRepPhone.value = formatPhoneNumberInput(newValue)
    }
  },
  { immediate: true },
)

// Handle phone input changes
const handlePhoneInput = (event) => {
  const inputValue = event.target.value
  const standardized = standardizePhoneNumber(inputValue)
  mainCompanyRepPhone.value = standardized
  formattedMainCompanyRepPhone.value = formatPhoneNumberInput(standardized)
}

// 전화번호 유효성 검사 규칙
const phoneRule = (value) =>
  !value || isValidPhoneNumber(value) || '유효한 전화번호를 입력해주세요.'
</script>

<style scoped></style>
