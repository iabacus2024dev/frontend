<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <PartnersInfoComponent
          class="ma-3 pa-3"
          v-model:name="partnersCreate.name"
          v-model:ceoName="partnersCreate.ceoName"
          v-model:salesRepName="partnersCreate.salesRepName"
          v-model:salesRepPhone="partnersCreate.salesRepPhone"
          v-model:salesRepEmail="partnersCreate.salesRepEmail"
          v-model:zipcode="partnersCreate.zipcode"
          v-model:street="partnersCreate.street"
          v-model:detail="partnersCreate.detail"
        />
        <ContractInfoComponent
          class="ma-3 pa-3"
          v-model:grade="partnersCreate.grade"
          v-model:commissionRate="partnersCreate.commissionRate"
        />
        <AdditionalInfoComponent class="ma-3 pa-3" v-model:comment="partnersCreate.comment" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { defineExpose, ref } from 'vue'
import PartnersInfoComponent from '@/components/partners/PartnersInfoComponent.vue'
import ContractInfoComponent from '@/components/partners/ContractInfoComponent.vue'
import AdditionalInfoComponent from '@/components/partners/AdditionalInfoComponent.vue'

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
  return partnersCreate.value
}

// `DialogComponent.vue`에서 `getFormData`를 사용할 수 있도록 노출
defineExpose({
  getFormData,
})
</script>

<style scoped></style>
