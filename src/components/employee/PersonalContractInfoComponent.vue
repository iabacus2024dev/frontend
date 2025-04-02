<template>
  <VCard variant="outlined" class="mt-3 mb-3 pt-2 px-2">
    <VCardItem>
      <VCardTitle>계약정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow no-gutters="0">
        <VCol cols="9" class="mt-3">
          <VRow>
            <VTextField
              v-model="joinDate"
              label="입사일"
              variant="outlined"
              density="compact"
              type="date"
              :rules="[requiredRule]"
            />
          </VRow>
        </VCol>

        <VCol cols="9" class="mt-10" v-if="showLeaveButton">
          <VRow>
            <VTextField
              v-model="leaveDate"
              label="퇴사일"
              variant="outlined"
              density="compact"
              type="date"
            />
            <VBtn flat="0" @click="handleLeave" class="ml-3 quit-btn">퇴사처리</VBtn>
          </VRow>
        </VCol>

        <VCol cols="9" class="mt-10">
          <VRow>
            <VTextField v-model="salary" label="연봉" variant="outlined" density="compact" />
            <VLabel class="ml-3">(단위: 천)</VLabel>
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-10">
          <VRow>
            <VTextField
              v-model="monthlyPay"
              label="월지급액"
              variant="outlined"
              density="compact"
            />
            <VLabel class="ml-3">(단위: 천)</VLabel>
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineEmits, defineModel, defineProps } from 'vue'

const joinDate = defineModel('joinDate')
const leaveDate = defineModel('leaveDate')
const salary = defineModel('salary')
const monthlyPay = defineModel('monthlyPay')

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
</style>
