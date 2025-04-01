<template>
  <v-form class="ma-3 pa-3">
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
          <v-col cols="6">
            <ClientCompanyComponent
              class="ma-3 pa-3"
              v-model:clientCompany="projectCreate.clientCompany"
              v-model:clientCompanyRep="projectCreate.clientCompanyRep"
              v-model:clientCompanyRepPhone="projectCreate.clientCompanyRepPhone"
            />
          </v-col>
          <v-col cols="6">
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
  let response = projectCreate.value
  response.departmentId = response.department.id
  return response
}

defineExpose({
  getFormData,
})
</script>

<style scoped></style>
