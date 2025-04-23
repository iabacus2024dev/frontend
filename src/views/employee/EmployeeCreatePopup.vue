<template>
  <v-form v-model="formValid">
    <v-row>
      <v-col>
        <PersonalInfoComponent
          v-model:email="employeeCreate.email"
          v-model:name="employeeCreate.name"
          v-model:phone="employeeCreate.phone"
          v-model:birthDate="employeeCreate.birthDate"
          :show-check-email="true"
          :rules="{
            email: [rules.required],
            name: [rules.required],
            phone: [rules.required],
            birthDate: [rules.required],
          }"
        />
        <PersonalRecordComponent
          v-model:type="employeeCreate.type"
          v-model:rank="employeeCreate.rank"
          v-model:grade="employeeCreate.grade"
          v-model:department="employeeCreate.department"
          :rules="{
            type: [rules.required],
            rank: [rules.required],
            grade: [rules.required],
            department: [rules.required],
          }"
        />
      </v-col>
      <v-col>
        <PersonalContractInfoComponent
          v-model:joinDate="employeeCreate.joinDate"
          v-model:leaveDate="employeeCreate.leaveDate"
          v-model:salary="employeeCreate.salary"
          v-model:monthlyPay="employeeCreate.monthlyPay"
          :showLeaveButton="false"
          :rules="{
            joinDate: [rules.required],
          }"
        />
        <CommentComponent
          v-model:comment="employeeCreate.comment"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { defineExpose, ref } from 'vue'
import PersonalInfoComponent from '@/components/employee/PersonalInfoComponent.vue'
import PersonalRecordComponent from '@/components/employee/PersonalRecordComponent.vue'
import PersonalContractInfoComponent from '@/components/employee/PersonalContractInfoComponent.vue'
import CommentComponent from '@/components/employee/CommentComponent.vue'

const formValid = ref(false)

const employeeCreate = ref({
  email: '',
  name: '',
  phone: '',
  birthDate: '',
  type: '',
  rank: '',
  grade: '',
  department: '',
  joinDate: '',
  leaveDate: '',
  salary: '',
  monthlyPay: '',
  comment: '',
})

const rules = {
  required: (value) => !!value || '필수 입력 항목입니다.',
}

const getFormData = () => {
  if (!formValid.value) {
    // 폼이 유효하지 않으면 null 반환
    return null
  }

  // 빈 값을 제외한 새 객체 생성
  const filteredData = {}

  // 모든 필드를 순회하며 빈 값이 아닌 경우만 새 객체에 추가
  Object.entries(employeeCreate.value).forEach(([key, value]) => {
    // 빈 문자열이 아닌 경우에만 추가
    if (value !== '') {
      filteredData[key] = value
    }
  })

  // department 객체에서 departmentId 추출
  if (filteredData.department && filteredData.department.id) {
    filteredData.departmentId = filteredData.department.id
  }

  return filteredData
}

defineExpose({
  getFormData,
  get formValid() {
    return formValid.value
  }
})
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
