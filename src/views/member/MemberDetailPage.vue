<template>
  <VCard>
    <PersonalInfoComponent
      v-model:email="email"
      v-model:name="name"
      v-model:phone="phone"
      v-model:birthDate="birthDate"
      :show-check-email="false"
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
      :showQuitButton="true"
    />
  </VCard>
  <VCard>
    <CommentComponent v-model:comment="comment" />
  </VCard>
  <VCardActions class="justify-end mt-3 mb-3">
    <VBtn class="delete-btn" @click="deleteMember">구성원 삭제</VBtn>
    <VBtn class="update-btn" @click="updateMember">수정</VBtn>
    <VBtn class="cancel-btn" @click="cancel">취소</VBtn>
  </VCardActions>
</template>

<script setup>
import { ref } from 'vue'
import PersonalInfoComponent from '@/components/member/PersonalInfoComponent.vue'
import PersonalRecordComponent from '@/components/member/PersonalRecordComponent.vue'
import PersonalContractInfoComponent from '@/components/member/PersonalContractInfoComponent.vue'
import CommentComponent from '@/components/member/CommentComponent.vue'

const email = ref('example@iabacus.co.kr')
const name = ref('홍길동')
const phone = ref('010-1234-5678')
const birthDate = ref('1990-01-01')

const type = ref('정규직')
const rank = ref('선임')
const grade = ref('중급')
const team = ref('가입정보팀')

const joinDate = ref('2021-01-01')
const quitDate = ref('')
const salary = ref('50000000')
const monthlyPay = ref('5000000')

const comment = ref('좋은 직원')

const deleteMember = () => {
  console.log('구성원 삭제 버튼 클릭')
}

const updateMember = () => {
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
  console.log('수정 버튼 클릭', memberData)
}

const cancel = () => {
  console.log('취소 버튼 클릭')
}
</script>

<style scoped>
.cancel-btn {
  background-color: #eb6129;
  color: white;
}
.update-btn {
  background-color: gainsboro;
  color: white;
}
.delete-btn {
  background-color: #eb6129;
  color: white;
}
</style>
