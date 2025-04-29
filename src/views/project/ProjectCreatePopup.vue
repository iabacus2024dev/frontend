<template>
  <v-form v-model="formValid" @submit.prevent>
    <v-row>
      <v-col>
        <BasicInfoComponent
          class="ma-3 pa-3"
          v-model:code="projectCreate.code"
          v-model:type="projectCreate.type"
          v-model:name="projectCreate.name"
          v-model:ownerTeamId="projectCreate.ownerTeamId"
          v-model:department="projectCreate.department"
          v-model:pmName="projectCreate.pmName"
          v-model:pmPhone="projectCreate.pmPhone"
          v-model:contractDate="projectCreate.contractDate"
          v-model:startDate="projectCreate.startDate"
          v-model:endDate="projectCreate.endDate"
        />
        <AmountComponent
          class="ma-3 pa-3"
          v-model:expectedAmount="projectCreate.expectedAmount"
          v-model:contractAmount="projectCreate.contractAmount"
        />
        <v-row>
          <v-col>
            <ClientCompanyComponent
              class="ma-3 pa-3"
              v-model:clientCompany="projectCreate.clientCompany"
              v-model:clientCompanyRep="projectCreate.clientCompanyRep"
              v-model:clientCompanyRepPhone="projectCreate.clientCompanyRepPhone"
            />
          </v-col>
          <v-col>
            <MainCompanyComponent
              class="ma-3 pa-3"
              v-model:mainCompany="projectCreate.mainCompany"
              v-model:mainCompanyRep="projectCreate.mainCompanyRep"
              v-model:mainCompanyRepPhone="projectCreate.mainCompanyRepPhone"
            />
          </v-col>
        </v-row>
        <ProgressInfoComponent
          class="ma-3 pa-3"
          v-model:status="projectCreate.status"
          v-model:startDate="projectCreate.startDate"
          v-model:endDate="projectCreate.endDate"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { defineExpose, ref } from 'vue'
import MainCompanyComponent from '@/components/project/MainCompanyComponent.vue'
import ClientCompanyComponent from '@/components/project/ClientCompanyComponent.vue'
import BasicInfoComponent from '@/components/project/BasicInfoComponent.vue'
import AmountComponent from '@/components/project/AmountComponent.vue'
import ProgressInfoComponent from '@/components/project/ProgressInfoComponent.vue'

const formValid = ref(false)

const projectCreate = ref({
  code: '',
  name: '',
  type: '',
  contractDate: '',
  expectedAmount: '',
  contractAmount: '',
  ownerTeamId: '',
  ownerTeamName: '',
  pmName: '',
  pmPhone: '',
  startDate: '',
  department: '',
  endDate: '',
  mainCompany: '',
  mainCompanyRep: '',
  mainCompanyRepPhone: '',
  clientCompany: '',
  clientCompanyRep: '',
  clientCompanyRepPhone: '',
})

const getFormData = () => {
  if (!formValid.value) {
    // 폼이 유효하지 않으면 null 반환
    return null
  }

  // 빈 값을 제외한 새 객체 생성
  const filteredData = {}

  // 모든 필드를 순회하며 빈 값이 아닌 경우만 새 객체에 추가
  Object.entries(projectCreate.value).forEach(([key, value]) => {
    // 빈 문자열이 아닌 경우에만 추가
    if (value !== '') {
      filteredData[key] = value
    }
  })

  // department 객체에서 id 추출
  if (filteredData.department) {
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

<style scoped></style>
