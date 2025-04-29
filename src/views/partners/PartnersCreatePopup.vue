<template>
  <v-form v-model="formValid">
    <v-row class="mt-3">
      <v-col cols="12" md="6">
        <partners-info-component
          v-model:name="partnersCreate.name"
          v-model:ceoName="partnersCreate.ceoName"
          v-model:salesRepName="partnersCreate.salesRepName"
          v-model:salesRepPhone="partnersCreate.salesRepPhone"
          v-model:salesRepEmail="partnersCreate.salesRepEmail"
          v-model:zipcode="partnersCreate.zipcode"
          v-model:street="partnersCreate.street"
          v-model:detail="partnersCreate.detail"
        />
      </v-col>
      <v-col cols="12" md="6">
        <contract-info-component
          class="mb-4"
          v-model:grade="partnersCreate.grade"
          v-model:commissionRate="partnersCreate.commissionRate"
        />
        <additional-info-component v-model:comment="partnersCreate.comment" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { defineExpose, ref } from 'vue'
import PartnersInfoComponent from '@/components/partners/PartnersInfoComponent.vue'
import ContractInfoComponent from '@/components/partners/ContractInfoComponent.vue'
import AdditionalInfoComponent from '@/components/partners/AdditionalInfoComponent.vue'

const formValid = ref(false)

const partnersCreate = ref({
  name: '',
  ceoName: '',
  salesRepName: '',
  salesRepPhone: '',
  salesRepEmail: '',
  zipcode: '',
  street: '',
  detail: '',
  grade: '',
  commissionRate: '',
  comment: '',
})

// `DialogComponent.vue`에서 접근할 수 있도록 데이터 반환하는 함수 노출
const getFormData = () => {
  if (!formValid.value) {
    // 폼이 유효하지 않으면 null 반환
    return null
  }

  // 빈 값을 제외한 새 객체 생성
  const filteredData = {}

  // 모든 필드를 순회하며 빈 값이 아닌 경우만 새 객체에 추가
  Object.entries(partnersCreate.value).forEach(([key, value]) => {
    // 빈 문자열이 아닌 경우에만 추가
    if (value !== '') {
      filteredData[key] = value
    }
  })

  return filteredData
}

// `DialogComponent.vue`에서 `getFormData`를 사용할 수 있도록 노출
defineExpose({
  getFormData,
  get formValid() {
    return formValid.value
  },
})
</script>

<style scoped></style>
