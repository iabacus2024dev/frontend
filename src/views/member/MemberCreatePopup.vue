<template>
  <VForm ref="memberForm" v-model="formValid">
    <VCard>
      <PersonalInfoComponent
        v-model:email="email"
        v-model:name="name"
        v-model:phone="phone"
        v-model:birthDate="birthDate"
        :show-check-email="true"
        :rules="{
          email: [rules.required],
          name: [rules.required],
          phone: [rules.required],
          birthDate: [rules.required],
        }"
      />
    </VCard>
    <VCard>
      <PersonalRecordComponent
        v-model:type="type"
        v-model:rank="rank"
        v-model:grade="grade"
        v-model:team="team"
      />
    </VCard>
    <VCard>
      <PersonalContractInfoComponent
        v-model:joinDate="joinDate"
        v-model:quitDate="quitDate"
        v-model:salary="salary"
        v-model:monthlyPay="monthlyPay"
        :showQuitButton="false"
        :rules="{
          joinDate: [rules.required],
        }"
      />
    </VCard>
    <VCard>
      <CommentComponent v-model:comment="comment" />
    </VCard>

    <VCardActions class="justify-end mt-3 mb-3">
      <VBtn class="register-btn" @click="fnRegister" :disabled="!isFormValid"> 등록 </VBtn>
      <VBtn class="cancel-btn" @click="fnCancel">취소</VBtn>
    </VCardActions>
  </VForm>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
import PersonalInfoComponent from '@/components/member/PersonalInfoComponent.vue'
import PersonalRecordComponent from '@/components/member/PersonalRecordComponent.vue'
import PersonalContractInfoComponent from '@/components/member/PersonalContractInfoComponent.vue'
import CommentComponent from '@/components/member/CommentComponent.vue'

const emit = defineEmits(['close'])
const memberForm = ref(null)
const formValid = ref(false)

const email = ref('')
const name = ref('')
const phone = ref('')
const birthDate = ref('')
const type = ref('')
const rank = ref('')
const grade = ref('')
const team = ref('')
const joinDate = ref('')
const quitDate = ref('')
const salary = ref('')
const monthlyPay = ref('')
const comment = ref('')

const rules = {
  required: (value) => !!value || '필수 입력 항목입니다.',
}

const isFormValid = computed(() => {
  return (
    email.value.trim() &&
    name.value.trim() &&
    phone.value.trim() &&
    birthDate.value.trim() &&
    joinDate.value.trim()
  )
})

const fnRegister = async () => {
  const valid = await memberForm.value.validate()
  if (!valid) {
    return
  }

  const memberData = {
    email: email.value,
    name: name.value,
    phone: phone.value,
    birthDate: birthDate.value,
    type: type.value,
    rank: rank.value,
    grade: grade.value,
    team: team.value,
    joinDate: joinDate.value,
    quitDate: quitDate.value,
    salary: salary.value,
    monthlyPay: monthlyPay.value,
    comment: comment.value,
  }
  console.log('등록 버튼 클릭', memberData)
  emit('close', memberData)
}

const fnCancel = () => {
  console.log('취소 버튼 클릭')
  emit('close')
}
</script>

<style scoped>
.register-btn {
  background-color: gainsboro;
  color: white;
}
.cancel-btn {
  background-color: #eb6129;
  color: white;
}
</style>
