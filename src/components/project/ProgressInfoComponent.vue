<template>
  <VCard variant="outlined" border="thin" class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>진행 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow no-gutters="0">
        <VCol cols="12" md="12">
          <VSelect
            v-model="status"
            :items="progressStatusItems"
            label="진행상태"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="6" class="pr-2">
          <VTextField
            v-model="startDate"
            label="투입시작일자"
            type="date"
            variant="outlined"
            density="compact"
            :rules="[dateRangeRule]"
          >
          </VTextField>
        </VCol>
        <VCol cols="12" md="6" class="pl-2">
          <VTextField
            v-model="endDate"
            label="투입종료일자"
            type="date"
            variant="outlined"
            density="compact"
            :rules="[dateRangeRule]"
          >
          </VTextField>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
  <!-- 추후에 시작날짜가 종료일자를 앞질러 나가지 못하도록 막을 필요 있음 -->
</template>

<script setup>
import { defineModel, watch } from 'vue'

const status = defineModel('status')
const startDate = defineModel('startDate')
const endDate = defineModel('endDate')

const progressStatusItems = ['예약', '진행중', '완료']
const statusMap = {
  IN_PROGRESS: '진행중',
  RESERVED: '예약',
  COMPLETED: '완료',
}

/* 상태 영한 변환 (ex: IN_PROGRESS -> 진행중) */
watch(
  () => status.value,
  (newVal) => {
    if (newVal) {
      status.value = statusMap[newVal] || newVal // 한글로 변환
    }
  },
)

// 날짜 범위 유효성 검사 규칙
const dateRangeRule = (value) => {
  if (!value) return true // 값이 없으면 통과 (필수 항목이 아님)

  // 시작일과 종료일이 모두 있는 경우에만 검사
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value)
    const end = new Date(endDate.value)

    // 시작일이 종료일보다 늦으면 에러
    if (start > end) {
      return '시작일은 종료일보다 빨라야 합니다.'
    }
  }

  return true
}
</script>

<style scoped></style>
