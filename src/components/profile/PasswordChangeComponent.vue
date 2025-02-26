<template>
  <v-card border="thin" class="mt-4 pa-4" variant="outlined">
    <v-card-title class="text-h5 font-weight-bold">비밀번호 변경</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form v-model="isFormValid" @submit.prevent>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              placeholder="현재 비밀번호"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              density="comfortable"
              :rules="[rules.required]"
              @click:append-inner="visible = !visible"
            />
            <v-text-field
              v-model="form.newPassword"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
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
              @click:append-inner="visible = !visible"
            />

            <!-- 비밀번호 확인 -->
            <v-text-field
              v-model="form.newPasswordConfirm"
              :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visibleConfirm ? 'text' : 'password'"
              placeholder="새로운 비밀번호 확인"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              density="comfortable"
              :rules="[rules.match, rules.required]"
              @click:append-inner="visibleConfirm = !visibleConfirm"
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
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { changePassword } from '@/apis/authService.js'
import { useToast } from 'vue-toastification'

const isFormValid = ref(false)
const visible = ref(false)
const visibleConfirm = ref(false)

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
const handleChangePassword = async () => {
  await changePassword(form.value)
  toast.success('비밀번호가 변경되었습니다.')
  isFormValid.value = false
  form.value = {}
}
</script>

<style scoped></style>
