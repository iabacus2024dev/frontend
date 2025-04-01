<template>
  <v-row>
    <v-col cols="12" md="6">
      <PersonalInfoComponent
        v-model:email="employeeDetail.email"
        v-model:name="employeeDetail.name"
        v-model:phone="employeeDetail.phone"
        v-model:birthDate="employeeDetail.birthDate"
        :show-check-email="false"
      />
      <PersonalContractInfoComponent
        v-model:joinDate="employeeDetail.joinDate"
        v-model:quitDate="employeeDetail.leaveDate"
        v-model:salary="employeeDetail.salary"
        v-model:monthlyPay="employeeDetail.monthlyPay"
        :showQuitButton="true"
      />
    </v-col>
    <v-col cols="12" md="6">
      <PersonalRecordComponent
        v-model:type="employeeDetail.type"
        v-model:rank="employeeDetail.rank"
        v-model:grade="employeeDetail.grade"
        v-model:department="employeeDetail.department"
      />
      <CommentComponent v-model:comment="employeeDetail.comment" />
    </v-col>
    <VCardActions class="mt-3 mb-3">
      <VBtn class="update-btn" @click="handleUpdateEmployee">수정</VBtn>
      <VBtn class="delete-btn" @click="handleDeleteEmployee">구성원 삭제</VBtn>
      <VBtn class="cancel-btn" @click="$router.push('/employees')">취소</VBtn>
    </VCardActions>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import PersonalInfoComponent from '@/components/employee/PersonalInfoComponent.vue'
import PersonalRecordComponent from '@/components/employee/PersonalRecordComponent.vue'
import PersonalContractInfoComponent from '@/components/employee/PersonalContractInfoComponent.vue'
import CommentComponent from '@/components/employee/CommentComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { deleteEmployee, getEmployeeDetail, updateEmployee } from '@/apis/employeeService.js'
import { useDialog } from '@/composables/useDialog.js'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const employeeId = route.params.id

const toast = useToast()
const dialog = useDialog()

const employeeDetail = ref({
  name: '',
  email: '',
  phone: '',
  birthDate: '',

  partnersId: Number,
  partnersName: '',
  rank: '',
  type: '',
  grade: '',
  status: '',

  joinDate: '',
  leaveDate: '',
  comment: '',
  department: {},

  salary: '',
  monthlyPay: '',

  modifiedDateTime: '',
})

const handleUpdateEmployee = () => {
  dialog.openDialog({
    title: '구성원 수정',
    contents: `${employeeDetail.value.name} ${employeeDetail.value.rank}의 정보를 수정하시겠습니까?`,
    fnCallback: fetchUpdateEmployee,
  })
}

const fetchUpdateEmployee = async () => {
  try {
    employeeDetail.value.departmentId = employeeDetail.value.department
    await updateEmployee(employeeId, employeeDetail.value)
    toast.success(
      `${employeeDetail.value.name} ${employeeDetail.value.rank}의 정보가 수정되었습니다.`,
    )
  } finally {
    await fetchGetEmployeeDetail()
  }
}

const handleDeleteEmployee = () => {
  dialog.openDialog({
    title: '구성원 삭제',
    contents: `${employeeDetail.value.name} ${employeeDetail.value.rank}의 정보를 삭제하시겠습니까?`,
    fnCallback: fetchDeleteEmployee,
  })
}

const fetchDeleteEmployee = async () => {
  await deleteEmployee(employeeId)
  await router.push('/employees')
  toast.success(
    `${employeeDetail.value.name} ${employeeDetail.value.rank}의 정보가 삭제되었습니다.`,
  )
}

const fetchGetEmployeeDetail = async () => {
  employeeDetail.value = await getEmployeeDetail(employeeId)
  console.log(employeeDetail.value)
}

fetchGetEmployeeDetail()

const cancel = () => {
  console.log('취소 버튼 클릭')
}
</script>

<style scoped>
.cancel-btn {
  background-color: gainsboro;
  color: white;
}
.update-btn {
  background-color: #eb6129;
  color: white;
}
.delete-btn {
  background-color: #eb6129;
  color: white;
}
</style>
