<template>
  <VCard variant="outlined" border="thin" class="mt-3 mb-3 pt-2 px-2" min-width="400">
    <VCardItem>
      <VCardTitle>계약정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VTextField
        v-model="joinDate"
        variant="outlined"
        density="compact"
        type="date"
        :rules="[requiredRule]"
      >
        <template v-slot:label> 입사일 <span class="required-field">*</span> </template>
      </VTextField>

      <v-row>
        <v-col cols="10">
          <VTextField
            v-model="leaveDate"
            label="퇴사일"
            variant="outlined"
            density="compact"
            type="date"
          />
        </v-col>
        <v-col cols="2">
          <VBtn @click="handleLeave" v-if="showLeaveButton" elevation="0" class="quit-btn"
            >퇴사 처리</VBtn
          >
        </v-col>
      </v-row>

      <VTextField
        :model-value="formattedSalary"
        @input="handleSalaryInput"
        label="연봉"
        variant="outlined"
        density="compact"
      >
      </VTextField>
      <VTextField
        :model-value="formattedMonthlyPay"
        @input="handleMonthlyPayInput"
        label="월지급액"
        variant="outlined"
        density="compact"
        persistent-hint
      >
      </VTextField>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineEmits, defineModel, defineProps, ref, watch } from 'vue'
import { formatPrice } from '@/utils/MoneyUtils.js'

const joinDate = defineModel('joinDate')
const leaveDate = defineModel('leaveDate')
const salary = defineModel('salary')
const monthlyPay = defineModel('monthlyPay')

// Formatted display values
const formattedSalary = ref('')
const formattedMonthlyPay = ref('')

// Format the input values when they change
watch(
  salary,
  (newValue) => {
    if (newValue) {
      formattedSalary.value = formatPrice(newValue, { showCurrency: false })
    }
  },
  { immediate: true },
)

watch(
  monthlyPay,
  (newValue) => {
    if (newValue) {
      formattedMonthlyPay.value = formatPrice(newValue, { showCurrency: false })
    }
  },
  { immediate: true },
)

// Parse the formatted input back to a number
const parseFormattedValue = (formattedValue) => {
  if (!formattedValue) return ''
  // Remove all non-numeric characters except decimal point
  return formattedValue.replace(/[^\d.]/g, '')
}

// Handle input changes
const handleSalaryInput = (event) => {
  const parsed = parseFormattedValue(event.target.value)
  salary.value = parsed
  if (parsed) {
    formattedSalary.value = formatPrice(parsed, { showCurrency: false })
  } else {
    formattedSalary.value = ''
  }
}

const handleMonthlyPayInput = (event) => {
  const parsed = parseFormattedValue(event.target.value)
  monthlyPay.value = parsed
  if (parsed) {
    formattedMonthlyPay.value = formatPrice(parsed, { showCurrency: false })
  } else {
    formattedMonthlyPay.value = ''
  }
}

const props = defineProps({
  showLeaveButton: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['leave'])

// 필수 입력 규칙: 값이 없으면 에러 메시지 표시
const requiredRule = (value) => !!value || '필수 입력 항목입니다.'

const handleLeave = () => {
  console.log('퇴사 처리 버튼 클릭')
  emits('leave')
}
</script>

<style scoped>
.small-card {
  max-width: 600px;
  margin: auto;
}
.quit-btn {
  background-color: #eb6129;
  color: white;
}

.required-field {
  color: red;
}
</style>
