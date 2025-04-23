<template>
  <v-card class="pt-2 px-2" border="thin" variant="outlined" min-width="600">
    <v-card-item>
      <v-card-title>기본 정보</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-text-field
        v-model="name"
        label="협력사명"
        variant="outlined"
        density="compact"
        :rules="[rules.required]"
      />
      <v-text-field
        v-model="ceoName"
        label="대표자명"
        variant="outlined"
        density="compact"
        :rules="[rules.required]"
      />
      <v-text-field
        v-model="salesRepName"
        label="영업대표명"
        variant="outlined"
        density="compact"
        :rules="[rules.required]"
      />
      <v-text-field
        :model-value="formattedSalesRepPhone"
        @input="handlePhoneInput"
        label="영업대표 연락처"
        variant="outlined"
        density="compact"
        :rules="[rules.required, phoneRule]"
      ></v-text-field>
      <v-text-field
        v-model="salesRepEmail"
        label="영업대표 이메일"
        variant="outlined"
        density="compact"
      />
      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="zipcode"
            label="우편번호"
            variant="outlined"
            density="compact"
            :disabled="isAddressLocked"
            readonly
          />
        </v-col>
        <v-col cols="2">
          <v-btn variant="tonal" class="update-btn" @click="openPostcode"> 주소 찾기 </v-btn>
        </v-col>
      </v-row>
      <v-text-field
        v-model="street"
        label="주소"
        variant="outlined"
        density="compact"
        :disabled="isAddressLocked"
        readonly
      />
      <v-text-field v-model="detail" label="상세주소" variant="outlined" density="compact" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineModel, ref, watch } from 'vue'
import {
  formatPhoneNumberInput,
  isValidPhoneNumber,
  standardizePhoneNumber,
} from '@/utils/PhoneUtils.js'

const name = defineModel('name')
const ceoName = defineModel('ceoName')
const salesRepName = defineModel('salesRepName')
const salesRepPhone = defineModel('salesRepPhone')

// Formatted display value for phone
const formattedSalesRepPhone = ref('')

// Format the phone value when it changes
watch(
  salesRepPhone,
  (newValue) => {
    if (newValue) {
      formattedSalesRepPhone.value = formatPhoneNumberInput(newValue)
    }
  },
  { immediate: true },
)

// Handle phone input changes
const handlePhoneInput = (event) => {
  const inputValue = event.target.value
  const standardized = standardizePhoneNumber(inputValue)
  salesRepPhone.value = standardized
  formattedSalesRepPhone.value = formatPhoneNumberInput(standardized)
}
const salesRepEmail = defineModel('salesRepEmail')
const zipcode = defineModel('zipcode')
const street = defineModel('street')
const detail = defineModel('detail')

const isAddressLocked = ref(false)

// 전화번호 유효성 검사 규칙
const phoneRule = (value) =>
  !value || isValidPhoneNumber(value) || '유효한 전화번호를 입력해주세요.'

const rules = {
  required: (value) => !!value || '필수 입력 항목입니다.',
}

const openPostcode = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      console.log(data)
      zipcode.value = data.zonecode
      street.value = data.roadAddress
      isAddressLocked.value = true
    },
  }).open()
}
</script>

<style scoped>
.update-btn {
  background-color: #eb6129;
  color: white;
}
</style>
