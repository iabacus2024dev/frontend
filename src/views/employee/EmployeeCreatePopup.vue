<template>
  <v-form v-model="formValid" class="ma-3 pa-3">
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
        />
      </v-col>
      <v-col cols="6">
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
          :rules="{ comment: [rules.required] }"
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
  let response = employeeCreate.value
  response.departmentId = response.department.id
  return response
}

defineExpose({
  getFormData,
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
