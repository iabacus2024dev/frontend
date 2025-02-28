<template>
  <v-card class="pt-2 px-2">
    <v-card-item>
      <v-card-title>기본 정보</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-row class="gap-4">
        <v-col cols="12">
          <v-text-field v-model="name" label="협력사명" variant="outlined" density="compact" />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="ceoName" label="대표자명" variant="outlined" density="compact" />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="salesRepName"
            label="영업대표명"
            variant="outlined"
            density="compact"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="salesRepPhone"
            label="영업대표 연락처"
            variant="outlined"
            density="compact"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="salesRepEmail"
            label="영업대표 이메일"
            variant="outlined"
            density="compact"
          />
        </v-col>

        <v-col cols="8">
          <v-text-field
            v-model="zipcode"
            label="우편번호"
            variant="outlined"
            density="compact"
            :disabled="isAddressLocked"
          />
        </v-col>

        <v-col cols="4">
          <v-btn
            variant="tonal"
            density="comfortable"
            class="update-btn ml-2"
            @click="openPostcode"
          >
            주소 찾기
          </v-btn>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="street"
            label="주소"
            variant="outlined"
            density="compact"
            :disabled="isAddressLocked"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="detail" label="상세주소" variant="outlined" density="compact" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, defineModel } from 'vue'

const name = defineModel('name')
const ceoName = defineModel('ceoName')
const salesRepName = defineModel('salesRepName')
const salesRepPhone = defineModel('salesRepPhone')
const salesRepEmail = defineModel('salesRepEmail')
const zipcode = defineModel('zipcode')
const street = defineModel('street')
const detail = defineModel('detail')

const isAddressLocked = ref(false)

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
