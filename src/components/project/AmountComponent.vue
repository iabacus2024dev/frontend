<template>
  <VCard variant="outlined" border="thin" class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>금액 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="v-row--no-gutters">
        <VCol cols="12" md="6" class="pr-4">
          <VTextField
            :model-value="formattedExpectedAmount"
            @input="handleExpectedAmountInput"
            label="예상계약금액"
            variant="outlined"
            density="compact"
            hint="숫자만 입력하세요"
            persistent-hint
          >
            <template v-slot:prepend>
              <v-icon>mdi-currency-krw</v-icon>
            </template>
          </VTextField>
        </VCol>

        <VCol cols="12" md="6">
          <VTextField
            :model-value="formattedContractAmount"
            @input="handleContractAmountInput"
            label="계약금액"
            variant="outlined"
            density="compact"
            hint="숫자만 입력하세요"
            persistent-hint
          >
            <template v-slot:prepend>
              <v-icon>mdi-currency-krw</v-icon>
            </template>
          </VTextField>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel, ref, watch } from 'vue'
import { formatPrice } from '@/utils/MoneyUtils.js'

const expectedAmount = defineModel('expectedAmount')
const contractAmount = defineModel('contractAmount')

// Formatted display values
const formattedExpectedAmount = ref('')
const formattedContractAmount = ref('')

// Format the input values when they change
watch(expectedAmount, (newValue) => {
  if (newValue) {
    formattedExpectedAmount.value = formatPrice(newValue, { showCurrency: false })
  }
}, { immediate: true })

watch(contractAmount, (newValue) => {
  if (newValue) {
    formattedContractAmount.value = formatPrice(newValue, { showCurrency: false })
  }
}, { immediate: true })

// Parse the formatted input back to a number
const parseFormattedValue = (formattedValue) => {
  if (!formattedValue) return ''
  // Remove all non-numeric characters except decimal point
  return formattedValue.replace(/[^\d.]/g, '')
}

// Handle input changes
const handleExpectedAmountInput = (event) => {
  const parsed = parseFormattedValue(event.target.value)
  expectedAmount.value = parsed
  if (parsed) {
    formattedExpectedAmount.value = formatPrice(parsed, { showCurrency: false })
  } else {
    formattedExpectedAmount.value = ''
  }
}

const handleContractAmountInput = (event) => {
  const parsed = parseFormattedValue(event.target.value)
  contractAmount.value = parsed
  if (parsed) {
    formattedContractAmount.value = formatPrice(parsed, { showCurrency: false })
  } else {
    formattedContractAmount.value = ''
  }
}
</script>

<style scoped></style>
