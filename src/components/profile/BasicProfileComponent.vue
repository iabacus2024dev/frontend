<template>
  <v-card border="thin" class="pa-4" variant="outlined">
    <div v-if="loading" class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <v-card-item>
        <template v-slot:prepend>
          <v-avatar size="40" class="mr-4">
            <v-icon size="40" v-if="!user.profileImage">mdi-account</v-icon>
            <img v-else :src="user.profileImage" alt="Profile Image" />
          </v-avatar>
        </template>
        <v-card-title class="text-h5 font-weight-bold">{{ user.name || '사용자' }}</v-card-title>
        <v-card-subtitle>
          <v-chip color="primary" size="small" class="mr-2">{{
            user.teamName || '팀 정보 없음'
          }}</v-chip>
          <v-chip v-if="user.rank" color="secondary" size="small">{{ user.rank }}</v-chip>
        </v-card-subtitle>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="primary" class="mr-3">mdi-email-outline</v-icon>
              <div>
                <div class="text-caption text-grey">이메일</div>
                <div>{{ user.email || '정보 없음' }}</div>
              </div>
            </div>

            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="primary" class="mr-3">mdi-phone</v-icon>
              <div>
                <div class="text-caption text-grey">핸드폰 번호</div>
                <div>{{ formatPhone(user.phone) || '정보 없음' }}</div>
              </div>
            </div>

            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="primary" class="mr-3">mdi-cake-variant</v-icon>
              <div>
                <div class="text-caption text-grey">생년월일</div>
                <div>{{ formatDate(user.birthDate) || '정보 없음' }}</div>
              </div>
            </div>

            <div class="d-flex align-center">
              <v-icon size="small" color="primary" class="mr-3">mdi-calendar-check</v-icon>
              <div>
                <div class="text-caption text-grey">입사일</div>
                <div>{{ formatDate(user.joinDate) || '정보 없음' }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getMyEmployeeDetail } from '@/apis/employeeService.js'
import { formatPhoneNumber } from '@/utils/PhoneUtils.js'

const user = ref({})
const loading = ref(true)

const getProfile = async () => {
  try {
    loading.value = true
    user.value = await getMyEmployeeDetail()
  } catch (error) {
    console.error('프로필 정보를 불러오는 중 오류가 발생했습니다:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Use the imported formatPhoneNumber function
const formatPhone = (phone) => {
  if (!phone) return null
  return formatPhoneNumber(phone)
}

onMounted(() => {
  getProfile()
})
</script>

<style scoped></style>
