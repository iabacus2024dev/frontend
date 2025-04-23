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
        v-model:leaveDate="employeeDetail.leaveDate"
        v-model:salary="employeeDetail.salary"
        v-model:monthlyPay="employeeDetail.monthlyPay"
        :showLeaveButton="true"
        @leave="handleLeaveEmployee"
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
    <v-row>
      <v-col class="d-flex justify-end">
        <VCardActions>
          <VBtn class="update-btn" @click="handleUpdateEmployee">구성원 수정</VBtn>
          <VBtn class="delete-btn" color="#eb6129" variant="outlined" @click="handleDeleteEmployee"
            >구성원 삭제</VBtn
          >
        </VCardActions>
      </v-col>
    </v-row>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import PersonalInfoComponent from '@/components/employee/PersonalInfoComponent.vue'
import PersonalRecordComponent from '@/components/employee/PersonalRecordComponent.vue'
import PersonalContractInfoComponent from '@/components/employee/PersonalContractInfoComponent.vue'
import CommentComponent from '@/components/employee/CommentComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import {
  deleteEmployee,
  getEmployeeDetail,
  leaveEmployee,
  updateEmployee,
} from '@/apis/employeeService.js'
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
    employeeDetail.value.departmentId = employeeDetail.value.department.id
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

const handleLeaveEmployee = () => {
  dialog.openDialog({
    title: '구성원 퇴사처리',
    contents: `${employeeDetail.value.name} ${employeeDetail.value.rank}를 퇴사처리 하시겠습니까?`,
    fnCallback: fetchLeaveEmployee,
  })
}

const fetchLeaveEmployee = async () => {
  if (!employeeDetail.value.leaveDate) {
    toast.error('먼저 퇴사일을 지정해주세요')
    return
  }
  await leaveEmployee(employeeId, { leaveDate: employeeDetail.value.leaveDate })
  toast.success(`${employeeDetail.value.name} ${employeeDetail.value.rank}이 퇴사처리 되었습니다.`)
}

const fetchGetEmployeeDetail = async () => {
  employeeDetail.value = await getEmployeeDetail(employeeId)
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
</style>
