<template>
  <v-card border="thin" class="mt-4 pa-4" variant="outlined">
    <v-card-title class="d-flex align-center">
      <v-icon color="#eb6129" class="mr-2">mdi-lock-reset</v-icon>
      <span class="text-h5 font-weight-bold">비밀번호 변경</span>
    </v-card-title>
    <v-divider class="my-3"></v-divider>
    <v-card-text>
      <v-form v-model="isFormValid" @submit.prevent>
        <v-row>
          <v-col cols="12">
            <!-- 현재 비밀번호 -->
            <v-text-field
              v-model="form.password"
              :append-inner-icon="visible.current ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible.current ? 'text' : 'password'"
              placeholder="현재 비밀번호"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              density="comfortable"
              :rules="[rules.required]"
              @click:append-inner="visible.current = !visible.current"
            />

            <!-- 새 비밀번호 -->
            <v-text-field
              v-model="form.newPassword"
              :append-inner-icon="visible.new ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible.new ? 'text' : 'password'"
              placeholder="새로운 비밀번호"
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
              @click:append-inner="visible.new = !visible.new"
            />

            <!-- 비밀번호 확인 -->
            <v-text-field
              v-model="form.newPasswordConfirm"
              :append-inner-icon="visible.confirm ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible.confirm ? 'text' : 'password'"
              placeholder="새로운 비밀번호 확인"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              density="comfortable"
              :rules="[rules.match, rules.required]"
              @click:append-inner="visible.confirm = !visible.confirm"
            />

            <v-btn
              color="#EB6129"
              size="large"
              block
              type="submit"
              :disabled="!isFormValid"
              @click="handleChangePassword"
            >
              비밀번호 변경
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <!-- 확인 다이얼로그 -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">비밀번호 변경 확인</v-card-title>
        <v-card-text>
          비밀번호를 변경하시겠습니까? 변경 후에는 새 비밀번호로 로그인해야 합니다.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="dialog = false">취소</v-btn>
          <v-btn color="#eb6129" variant="outlined" border="thin" @click="confirmChangePassword"
            >확인</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { changePassword } from '@/apis/memberService.js'
import { useToast } from 'vue-toastification'

const isFormValid = ref(false)
const loading = ref(false)
const dialog = ref(false)
const visible = ref({
  current: false,
  new: false,
  confirm: false,
})

const form = ref({
  password: '',
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

const toast = useToast()

const handleChangePassword = () => {
  if (isFormValid.value) {
    dialog.value = true
  }
}

const confirmChangePassword = async () => {
  try {
    loading.value = true
    dialog.value = false
    await changePassword(form.value)
    toast.success('비밀번호가 성공적으로 변경되었습니다.')

    // 폼 초기화
    form.value = {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    }
    isFormValid.value = false
    passwordStrength.value = 0
    passwordChecks.value.forEach((check) => (check.valid = false))
  } catch (error) {
    console.error('비밀번호 변경 중 오류가 발생했습니다:', error)
    toast.error('비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
