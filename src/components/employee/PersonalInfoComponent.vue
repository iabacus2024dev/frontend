<template>
  <VCard variant="outlined" border="thin" class="mt-3 pt-2 px-2" min-width="400">
    <VCardItem>
      <VCardTitle>개인정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <v-row>
        <v-col cols="9">
          <VTextField
            v-model="email"
            label="이메일"
            variant="outlined"
            density="compact"
            :rules="[requiredRule]"
          />
        </v-col>
        <v-col cols="3">
          <VBtn v-if="showCheckEmail" @click="handleCheckEmail" class="check-mail-btn">
            중복확인
          </VBtn>
        </v-col>
      </v-row>
      <VTextField
        v-model="name"
        label="이름"
        variant="outlined"
        density="compact"
        :rules="[requiredRule]"
      />
      <VTextField
        :model-value="formattedPhone"
        @input="handlePhoneInput"
        label="전화번호"
        variant="outlined"
        density="compact"
        :rules="[requiredRule, phoneRule]"
      ></VTextField>
      <VTextField
        v-model="birthDate"
        label="생년월일"
        variant="outlined"
        density="compact"
        type="date"
        :rules="[requiredRule]"
      />
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel, defineProps, ref, watch } from 'vue'
import {
  formatPhoneNumberInput,
  isValidPhoneNumber,
  standardizePhoneNumber,
} from '@/utils/PhoneUtils.js'

const email = defineModel('email')
const name = defineModel('name')
const phone = defineModel('phone')
const birthDate = defineModel('birthDate')

// Formatted display value for phone
const formattedPhone = ref('')

// Format the phone value when it changes
watch(
  phone,
  (newValue) => {
    if (newValue) {
      formattedPhone.value = formatPhoneNumberInput(newValue)
    }
  },
  { immediate: true },
)

// Handle phone input changes
const handlePhoneInput = (event) => {
  const inputValue = event.target.value
  const standardized = standardizePhoneNumber(inputValue)
  phone.value = standardized
  formattedPhone.value = formatPhoneNumberInput(standardized)
}

const props = defineProps({
  showCheckEmail: {
    type: Boolean,
    default: true,
  },
})

// 필수 입력 규칙: 값이 없으면 에러 메시지 출력
const requiredRule = (value) => !!value || '필수 입력 항목입니다.'

// 전화번호 유효성 검사 규칙
const phoneRule = (value) => isValidPhoneNumber(value) || '유효한 전화번호를 입력해주세요.'

const handleCheckEmail = () => {
  console.log('중복 확인 버튼 클릭')
}
</script>

<style scoped>
.small-card {
  max-width: 600px;
  margin: auto;
}

.check-mail-btn {
  background-color: #eb6129;
  color: white;
}
</style>
