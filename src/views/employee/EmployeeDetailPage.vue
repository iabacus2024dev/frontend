<template>
  <VCard>
    <PersonalInfoComponent
      v-model:email="employeeDetail.email"
      v-model:name="employeeDetail.name"
      v-model:phone="employeeDetail.phone"
      v-model:birthDate="employeeDetail.birthDate"
      :show-check-email="false"
    />
  </VCard>
  <VCard>
    <PersonalRecordComponent
      v-model:type="employeeDetail.type"
      v-model:rank="employeeDetail.rank"
      v-model:grade="employeeDetail.grade"
      v-model:team="employeeDetail.team"
    />
  </VCard>
  <VCard>
    <PersonalContractInfoComponent
      v-model:joinDate="employeeDetail.joinDate"
      v-model:quitDate="employeeDetail.leaveDate"
      v-model:salary="employeeDetail.salary"
      v-model:monthlyPay="employeeDetail.monthlyPay"
      :showQuitButton="true"
    />
  </VCard>
  <VCard>
    <CommentComponent v-model:comment="employeeDetail.comment" />
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
import { useRoute } from 'vue-router'
import { getEmployeeDetail } from '@/apis/employeeService.js'

const route = useRoute()
const employeeId = route.params.id

const employeeDetail = ref({
  name: '',
  email: '',
  phone: '',
  birthDate: '',

  partnersId: Number,
  partnersName: '',
  type: '',
  grade: '',
  status: '',

  joinDate: '',
  leaveDate: '',
  comment: '',
  teamName: '',

  salary: '',
  monthlyPay: '',

  modifiedDateTime: '',
})

const deleteMember = () => {
  console.log('구성원 삭제 버튼 클릭')
}

const updateMember = () => {
  const memberData = {
    name: name.value,
    email: email.value,
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

const fetchGetEmployeeDetail = () => {
  getEmployeeDetail(employeeId)
}

fetchGetEmployeeDetail()

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
