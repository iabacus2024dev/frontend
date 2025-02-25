<template>
  <v-card class="mx-auto pa-12 pb-8" max-width="448" rounded="lg" elevation="0">
    <div class="d-flex justify-center">
      <v-img
        max-width="200"
        src="https://ezportal.bizmeka.com/companyImage/T31366/T31366_100_69bd36e2ee32422087c5d4203224b81a.png"
      />
    </div>

    <v-card-text class="mt-3">
      <h4 class="text-h5 mt-5 mb-1">비밀번호 초기화 👋🏻</h4>
      <p class="mb-0">새롭게 설정할 비밀번호를 입력해 주세요.</p>
    </v-card-text>

    <v-alert class="ml-4 mr-4" dense outlined>
      <p class="text-subtitle-2">비밀번호는 8자 이상 20자 이하</p>
      <p class="text-subtitle-2">대소문자, 숫자, 특수문자를 포함</p>
    </v-alert>

    <v-card-text>
      <v-form @submit.prevent="handleInitializePassword" v-model="isFormValid">
        <!-- 새로운 비밀번호 -->
        <v-text-field
          class="md-3"
          v-model="form.newPassword"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="비밀번호"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          density="comfortable"
          :rules="[
            rules.required,
            rules.min,
            rules.max,
            rules.special,
            rules.number,
            rules.upper,
            rules.lower,
          ]"
          @click:append-inner="visible = !visible"
        />

        <!-- 비밀번호 확인 -->
        <v-text-field
          v-model="form.newPasswordConfirm"
          :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visibleConfirm ? 'text' : 'password'"
          placeholder="비밀번호 확인"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          density="comfortable"
          :rules="[rules.match, rules.required]"
          @click:append-inner="visibleConfirm = !visibleConfirm"
        />

        <!-- 시작하기 버튼 -->
        <v-btn
          color="#EB6129"
          size="x-large"
          block
          type="button"
          @click="handleInitializePassword"
          :disabled="!isFormValid"
        >
          시작하기
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  <ModalPopupComponent
    title="비밀번호 초기화"
    text="비밀번호 초기화가 완료되었습니다."
    @confirm="goTo('auth/login')"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { initializePassword } from '@/apis/authService'
import ModalPopupComponent from '@/components/common/ModalPopupComponent.vue'
import { useToast } from 'vue-toastification'

const route = useRoute()

const isFormValid = ref(false)
const visible = ref(false)
const visibleConfirm = ref(false)

const form = ref({
  token: route.query.token || '',
  newPassword: '',
  newPasswordConfirm: '',
})

const rules = ref({
  required: (value) => !!value || '필수 입력 항목입니다.',
  min: (v) => v.length >= 8 || '최소 8자 이상이어야 합니다.',
  max: (v) => v.length <= 20 || '최대 20자 이하이어야 합니다.',
  match: (v) => v === form.value.newPassword || '새로운 비밀번호와 일치해야 합니다.',
  special: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || '특수 문자가 포함되어야 합니다.',
  number: (v) => /\d/.test(v) || '숫자가 포함되어야 합니다.',
  upper: (v) => /[A-Z]/.test(v) || '대문자가 포함되어야 합니다.',
  lower: (v) => /[a-z]/.test(v) || '소문자가 포함되어야 합니다.',
})

const router = useRouter()
const goTo = (path) => {
  router.push({ path })
}

const toast = useToast()
const handleInitializePassword = async () => {
  await initializePassword(form.value)
  toast.success('비밀번호가 초기화되었습니다.')
  goTo('/auths/login')
}
</script>

<style scoped></style>
