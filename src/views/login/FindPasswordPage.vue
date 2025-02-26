<template>
  <v-card class="mx-auto pa-8 pt-7 auth-card" max-width="448" elevation="0" rounded="lg">
    <div class="d-flex justify-center">
      <v-img
        max-width="200"
        src="https://ezportal.bizmeka.com/companyImage/T31366/T31366_100_69bd36e2ee32422087c5d4203224b81a.png"
      />
    </div>
    <v-card-text class="mt-3">
      <h4 class="text-h5 mt-5 mb-1">비밀번호 찾기 👋🏻</h4>
      <p class="mb-0">애버커스 회사 이메일을 입력해주세요.</p>
    </v-card-text>

    <v-alert class="ml-4 mr-4" dense outlined>
      <p class="text-subtitle-2">이메일을 통해 비밀번호 변경 링크가 전송됩니다.</p>
    </v-alert>

    <v-card-text>
      <v-form @submit.prevent v-model="isFormValid">
        <!-- 이메일 -->
        <v-text-field
          v-model="form.email"
          type="email"
          placeholder="회사 이메일"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          density="comfortable"
          :rules="[rules.required, rules.email]"
        />

        <!-- 이메일 링크 발송 버튼 -->
        <v-btn
          color="#EB6129"
          size="x-large"
          block
          type="submit"
          @click="handleRegister"
          :disabled="!isFormValid"
        >
          이메일 링크 발송
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn color="primary" @click="goTo('/auths/login')"> 로그인 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { findPassword } from '@/apis/authService'
import router from '@/router/index.js'
import { useToast } from 'vue-toastification'

const form = ref({
  email: '',
})

const isFormValid = ref(false)
const rules = ref({
  required: (value) => !!value || '필수 입력 항목입니다.',
  email: (value) => /.+@.+\..+/.test(value) || '이메일 형식이 아닙니다.',
})

const toast = useToast()
const handleRegister = async () => {
  await findPassword(form.value)
  toast.success('이메일 링크가 발송되었습니다.')
  goTo('/auths/login')
}

const goTo = (path) => {
  router.push({ path })
}
</script>

<style scoped></style>
