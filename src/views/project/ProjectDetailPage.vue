<template>
  <!-- 프로젝트 정보 -->
  <v-row>
    <v-col cols="12" md="7">
      <BasicInfoComponent
        v-model:status="projectDetail.status"
        v-model:code="projectDetail.code"
        v-model:type="projectDetail.type"
        v-model:name="projectDetail.name"
        v-model:department="projectDetail.department"
        v-model:pmName="projectDetail.pmName"
        v-model:pmPhone="projectDetail.pmPhone"
        v-model:contractDate="projectDetail.contractDate"
        v-model:startDate="projectDetail.startDate"
        v-model:endDate="projectDetail.endDate"
      />
    </v-col>
    <v-col cols="12" md="5">
      <v-row>
        <v-col cols="12" md="6">
          <ClientCompanyComponent
            v-model:clientCompany="projectDetail.clientCompany"
            v-model:clientCompanyRep="projectDetail.clientCompanyRep"
            v-model:clientCompanyRepPhone="projectDetail.clientCompanyRepPhone"
          />
        </v-col>
        <v-col cols="12" md="6">
          <MainCompanyComponent
            v-model:mainCompany="projectDetail.mainCompany"
            v-model:mainCompanyRep="projectDetail.mainCompanyRep"
            v-model:mainCompanyRepPhone="projectDetail.mainCompanyRepPhone"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <AmountComponent
            v-model:expectedAmount="projectDetail.expectedAmount"
            v-model:contractAmount="projectDetail.contractAmount"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col class="d-flex justify-end">
      <v-btn variant="tonal" class="btn-color mr-2" @click="handleProjectEditButtonClick"
        >프로젝트 수정</v-btn
      >
      <v-btn color="#eb6129" variant="outlined" @click="handleProjectDeleteButtonClick"
        >프로젝트 삭제
      </v-btn>
    </v-col>
  </v-row>

  <!-- 계약 및 투입인원 정보 -->
  <v-row>
    <v-col>
      <VCard variant="outlined" border="thin" class="pt-2 px-2">
        <VCardItem>
          <VCardTitle>계약 정보</VCardTitle>
        </VCardItem>
        <VCardText>
          <!-- 계약번호 선택 영역 -->
          <VRow class="mb-2" no-gutters>
            <VCol cols="12" md="3">
              <VSelect
                v-model="selectedContract"
                :items="contractOptions"
                label="계약번호"
                item-title="label"
                item-value="id"
                variant="outlined"
                density="compact"
                return-object
                @update:modelValue="handleContractSelect"
              />
            </VCol>
          </VRow>

          <VRow no-gutters>
            <VCol style="flex: 1" class="pr-2">
              <VTextField
                :model-value="selectedContract?.startDate"
                label="계약시작일자"
                type="date"
                variant="outlined"
                density="compact"
                readonly
              />
            </VCol>
            <VCol style="flex: 1" class="pr-2">
              <VTextField
                :model-value="selectedContract?.endDate"
                label="계약종료일자"
                type="date"
                variant="outlined"
                density="compact"
                readonly
              />
            </VCol>
            <VCol style="flex: 1" class="pr-2">
              <VTextField
                :model-value="selectedContract?.contractType"
                :items="contractTypeItems"
                label="계약 유형"
                type="text"
                variant="outlined"
                density="compact"
                readonly
              />
            </VCol>
            <VCol style="flex: 1" class="pr-2">
              <VTextField
                v-model="revenue"
                label="투입 M/M"
                type="text"
                variant="outlined"
                density="compact"
                readonly
              />
            </VCol>
            <VCol style="flex: 1" class="pr-2">
              <VTextField
                v-model="headcount"
                label="투입 인원 수"
                type="text"
                variant="outlined"
                density="compact"
                readonly
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <!-- 투입 인원 표시 영역 -->
      <TableComponent :headers="headers" :items="tableDataResponse" title="투입인원 목록" />
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import ClientCompanyComponent from '@/components/project/ClientCompanyComponent.vue'
import MainCompanyComponent from '@/components/project/MainCompanyComponent.vue'
import AmountComponent from '@/components/project/AmountComponent.vue'
import BasicInfoComponent from '@/components/project/BasicInfoComponent.vue'
import { useToast } from 'vue-toastification'
import { deleteProject, getProjectDetail, updateProject } from '@/apis/projectService.js'
import { useRoute, useRouter } from 'vue-router'
import { useDialog } from '@/composables/useDialog.js'
import { getContractsByProjectCode } from '@/apis/contractService'
import { getPersonnelByContractId } from '@/apis/inputService'

const toast = useToast()
const router = useRouter()
const projectDetail = ref({
  name: '',
  code: '',
  type: '',
  status: '',
  contractDate: '',
  department: null,
  startDate: '',
  endDate: '',
  pmName: '',
  pmPhone: '',

  mainCompany: '',
  mainCompanyRep: '',
  mainCompanyRepPhone: '',
  clientCompany: '',
  clientCompanyRep: '',
  clientCompanyRepPhone: '',

  expectedAmount: null,
  contractAmount: null,

  modifiedDateTime: '',
})

const route = useRoute()
const projectId = route.params.id

const dialog = useDialog()

const contractOptions = ref([])
const selectedContract = ref(null)

/* 화면 로드 시에, 바로 호출 */
onMounted(() => {
  fetchGetProjectDetail()
})

const fetchGetProjectDetail = async () => {
  projectDetail.value = await getProjectDetail(projectId)
  await fetchGetContractDetail()

  // TODO: 돈 포맷팅
}

const fetchGetContractDetail = async () => {
  const response = await getContractsByProjectCode(projectDetail.value.code)

  const contracts = response.map((contract) => ({
    ...contract,
    label: `${contract.projectCode}-${contract.index}`,
  }))

  const sortedContracts = [...contracts].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate),
  )
  const startDate = sortedContracts[0]?.startDate ?? ''
  const endDate = sortedContracts[sortedContracts.length - 1]?.endDate ?? ''

  contractOptions.value = [
    {
      id: 0,
      label: '전체',
      projectCode: projectDetail.value.code,
      contractType: '전체',
      startDate,
      endDate,
    },
    ...contracts,
  ]

  selectedContract.value = contractOptions.value[0]
}

const headers = ref([
  { title: '이름', key: 'employeeName', nowrap: true },
  { title: '부서', key: 'department', nowrap: true },
  { title: '직원 유형', key: 'type', nowrap: true },
  { title: '투입 시작 일자', key: 'startDate', nowrap: true, align: 'end' },
  { title: '투입 종료 일자', key: 'endDate', nowrap: true, align: 'end' },
  { title: 'M/M', key: 'manMonth', nowrap: true },
  { title: '단가', key: 'unitPrice', nowrap: true, align: 'end' },
  { title: '인건비', key: 'monthlyWage', nowrap: true, align: 'end' },
  { title: '판관비 비율', key: 'sgaeRate', nowrap: true, align: 'end' },
  { title: '판관비 금액', key: 'sgaePrice', nowrap: true, align: 'end' },
  { title: '제경비 비율', key: 'ovheRate', nowrap: true, align: 'end' },
  { title: '제경비 금액', key: 'ovhePrice', nowrap: true, align: 'end' },
  { title: '총 비용', key: 'cost', nowrap: true, align: 'end' },
])

const tableDataResponse = ref([])
const revenue = ref(0)
const headcount = ref(0)

const mapPersonnelToTableRow = (personnel) => {
  const sgaePrice = personnel.wage * (personnel.sgaeRate / 100)
  const ovhePrice = personnel.wage * (personnel.ovheRate / 100)
  const cost = personnel.wage + sgaePrice + ovhePrice

  return {
    employeeName: personnel.employeeName || '',
    department: '', // 데이터 없음
    type: personnel.type || '',
    startDate: personnel.startDate || '',
    endDate: personnel.endDate || '',
    manMonth: '', // 데이터 없음
    unitPrice: personnel.unitprice?.toLocaleString() || '',
    monthlyWage: personnel.wage?.toLocaleString() || '',
    sgaeRate: personnel.sgaeRate ? `${personnel.sgaeRate.toFixed(2)}%` : '',
    sgaePrice: sgaePrice ? sgaePrice.toLocaleString() : '',
    ovheRate: personnel.ovheRate ? `${personnel.ovheRate.toFixed(2)}%` : '',
    ovhePrice: ovhePrice ? ovhePrice.toLocaleString() : '',
    cost: cost ? cost.toLocaleString() : '',
  }
}

const handleContractSelect = async (selected) => {
  if (selected?.id === 0) {
    const allContractItems = contractOptions.value.filter((c) => c.id !== 0)
    const startDate = allContractItems[allContractItems.length - 1]?.startDate ?? ''
    const endDate = allContractItems[0]?.endDate ?? ''

    const totalOption = contractOptions.value.find((item) => item.id === 0)
    if (totalOption) {
      totalOption.projectCode = projectDetail.value.code
      totalOption.contractType = '전체'
      totalOption.startDate = startDate
      totalOption.endDate = endDate
      selectedContract.value = totalOption
    }

    // Fetch personnel data for all contracts
    const allPersonnel = []
    for (const contract of allContractItems) {
      const personnel = await getPersonnelByContractId(contract.id)
      allPersonnel.push(...personnel)
    }
    tableDataResponse.value = allPersonnel.map(mapPersonnelToTableRow)
    headcount.value = allPersonnel.length
  } else {
    selectedContract.value = selected
    // Fetch personnel data for selected contract
    const personnel = await getPersonnelByContractId(selected.id)
    tableDataResponse.value = personnel.map(mapPersonnelToTableRow)
    headcount.value = personnel.length
  }
}

// 프로젝트 수정 이벤트 핸들러
const handleProjectEditButtonClick = () => {
  dialog.openDialog({
    title: '프로젝트 수정',
    contents: `${projectDetail.value.name}의 정보를 수정하시겠습니까?`,
    fnCallback: fetchUpdateProject,
  })
}

const fetchUpdateProject = async () => {
  try {
    projectDetail.value.departmentId = projectDetail.value.department.id
    await updateProject(projectId, projectDetail.value)
    toast.success(`${projectDetail.value.name}의 정보가 수정되었습니다.`)
  } finally {
    await fetchGetProjectDetail()
  }
}

// 프로젝트 삭제 이벤트 핸들러
const handleProjectDeleteButtonClick = () => {
  dialog.openDialog({
    title: '프로젝트 삭제',
    contents: `${projectDetail.value.name} 프로젝트를 삭제하시겠습니까?`,
    fnCallback: fetchDeleteProject,
  })
}

const fetchDeleteProject = async () => {
  await deleteProject(projectId)
  await router.push('/projects')
  toast.success(`${projectDetail.value.name} 프로젝트가 삭제되었습니다.`)
}

// 계약 등록 이벤트 핸들러
const handleContractRegisterButtonClick = () => {
  console.log('handleContractRegisterButtonClick >>>', '계약 등록 버튼 클릭!')
}
</script>

<style scoped>
.btns-container {
  display: flex;
  justify-content: end;
}

.btn-color {
  background-color: #eb6129;
  color: white;
}
</style>
