<template>
  <VCard variant="outlined" class="mt-3 pt-2 px-2 small-card">
    <VCardItem>
      <VCardTitle>개인정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow no-gutters="0">
        <VCol cols="9" class="mt-3">
          <VRow>
            <VTextField v-model="email" label="이메일" variant="outlined" density="compact" />
            <VBtn
              flat="0"
              v-if="showCheckEmail"
              @click="handleCheckEmail"
              class="ml-3 check-mail-btn"
              >중복확인</VBtn
            >
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-3">
          <VRow
            ><VTextField v-model="name" label="이름" variant="outlined" density="compact" />
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-3">
          <VRow>
            <VTextField v-model="phone" label="전화번호" variant="outlined" density="compact" />
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-3">
          <VRow>
            <VTextField
              v-model="birthDate"
              label="생년월일"
              variant="outlined"
              density="compact"
              type="date"
            />
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel, defineProps } from 'vue'

const email = defineModel('email')
const name = defineModel('name')
const phone = defineModel('phone')
const birthDate = defineModel('birthDate')

const props = defineProps({
  showCheckEmail: {
    type: Boolean,
    default: true,
  },
})

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
