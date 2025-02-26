<template>
  <VCard class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>기본 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="gap-4">
        <VCol cols="12" md="12">
          <VTextField
            v-model="name"
            label="협력사명"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
        <VCol cols="12" md="12">
          <VTextField
            v-model="ceoName"
            label="대표자명"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
        <VCol cols="12" md="12">
          <VTextField
            v-model="salesRepName"
            label="영업대표명"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
        <VCol cols="12" md="12">
          <VTextField
            v-model="salesRepPhone"
            label="영업대표 연락처"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
        <VCol cols="12" md="12">
          <VTextField
            v-model="salesRepEmail"
            label="영업대표 이메일"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
        <VCol cols="8">
          <VTextField
            v-model="zipcode"
            label="우편번호"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
        <VCol cols="4">
          <VBtn v-if="!isReadOnly" variant="tonal" density="comfortable" class="update-btn ml-2">
            주소 찾기
          </VBtn>
        </VCol>
        <VCol cols="12" md="12">
          <VTextField
            v-model="street"
            label="주소"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
        <VCol cols="12" md="12">
          <VTextField
            v-model="detail"
            label="상세주소"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineProps, defineModel } from 'vue'

const props = defineProps({
  isReadOnly: Boolean,
})

const name = defineModel('name')
const ceoName = defineModel('ceoName')
const salesRepName = defineModel('salesRepName')
const salesRepPhone = defineModel('salesRepPhone')
const salesRepEmail = defineModel('salesRepEmail')
const zipcode = defineModel('zipcode')
const street = defineModel('street')
const detail = defineModel('detail')
</script>

<style scoped>
.update-btn {
  background-color: #eb6129;
  color: white;
}
</style>
