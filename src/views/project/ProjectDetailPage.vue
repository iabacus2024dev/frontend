<template>
  <v-row>
    <v-col cols="12" md="7">
      <BasicInfoComponent
        v-model:code="projectDetail.code"
        v-model:type="projectDetail.type"
        v-model:name="projectDetail.name"
        v-model:department="projectDetail.department"
        v-model:pmName="projectDetail.pmName"
        v-model:pmPhone="projectDetail.pmPhone"
        v-model:contractDate="projectDetail.contractDate"
        v-model:startDate="projectDetail.startDate"
        v-model:endDate="projectDetail.endDate"
        class="mb-3"
      />
      <AmountComponent
        v-model:expectedAmount="projectDetail.expectedAmount"
        v-model:contractAmount="projectDetail.contractAmount"
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
          <ProgressInfoComponent
            v-model:status="projectDetail.status"
            v-model:start-date="projectDetail.startDate"
            v-model:end-date="projectDetail.endDate"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col class="d-flex justify-end">
      <v-btn variant="tonal" class="btn-color mr-2" @click="handleProjectEditButtonClick"
        >프로젝트 수정</v-btn
      >
      <v-btn variant="tonal" class="btn-color" @click="handleProjectDeleteButtonClick"
        >프로젝트 삭제
      </v-btn>
    </v-col>
  </v-row>
  <!-- 테이블 컴포넌트 -->
  <v-row>
    <v-col>
      <EmployeeListComponent />
      <TableComponent :headers="headers" :items="tableDataResponse" title="투입인원 목록" />
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import ClientCompanyComponent from '@/components/project/ClientCompanyComponent.vue'
import MainCompanyComponent from '@/components/project/MainCompanyComponent.vue'
import ProgressInfoComponent from '@/components/project/ProgressInfoComponent.vue'
import AmountComponent from '@/components/project/AmountComponent.vue'
import BasicInfoComponent from '@/components/project/BasicInfoComponent.vue'
import EmployeeListComponent from '@/components/employee/EmployeeListComponent.vue'
import { useToast } from 'vue-toastification'
import { deleteProject, getProjectDetail, updateProject } from '@/apis/projectService.js'
import { useRoute, useRouter } from 'vue-router'
import { useDialog } from '@/composables/useDialog.js'

const toast = useToast()
const router = useRouter()
const projectDetail = ref({
  name: '',
  code: '',
  type: '',
  status: '',
  contractDate: '',
  department: {},
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

  expectedAmount: Number,
  contractAmount: Number,

  modifiedDateTime: '',
})

const route = useRoute()
const projectId = route.params.id

const dialog = useDialog()

onMounted(() => {
  fetchGetPartnersDetail()
})

const fetchGetPartnersDetail = async () => {
  projectDetail.value = await getProjectDetail(projectId)
  // TODO: 돈 포맷팅
}

const headers = ref([
  { title: '프로젝트코드', key: 'projectcode', nowrap: true },
  { title: '프로젝트명', key: 'projectname', nowrap: true },
  { title: '사업유형', key: 'businesetype', nowrap: true },
  { title: '투입시작일자', key: 'projectstartdate', nowrap: true },
  { title: '투입종료일자', key: 'projectenddate', nowrap: true },
  { title: '계약시작일자', key: 'contractstartdate', nowrap: true },
  { title: '계약종료일자', key: 'contractenddate', nowrap: true },
  { title: '계약금액', key: 'contractpay', nowrap: true, align: 'end' },
  { title: '총매출금액', key: 'totalpay', nowrap: true, align: 'end' },
  { title: '발주사', key: 'orderder', nowrap: true, align: 'end' },
  { title: '원청사', key: 'origin', nowrap: true, align: 'end' },
  { title: '진행상태', key: 'progress', nowrap: true, align: 'end' },
])

const tableDataResponse = ref([
  {
    projectcode: 'C0000123485',
    projectname: '(주)엘지유플러스_통신 MNO/MVNO 구분',
    businesetype: 'SI',
    projectstartdate: '2024.01.01',
    projectenddate: '2024.01.31',
    contractstartdate: '2024.01.31',
    contractenddate: '2024.01.31',
    contractpay: '8,500',
    totalpay: '8,500',
    orderder: '(주)엘지유플러스',
    origin: '(주)엘지유플러스',
    progress: '진행중',
  },
  {
    projectcode: 'C0000123485',
    projectname: '(주)엘지유플러스_통신 MNO/MVNO 구분',
    businesetype: 'SI',
    projectstartdate: '2024.01.01',
    projectenddate: '2024.01.31',
    contractstartdate: '2024.01.31',
    contractenddate: '2024.01.31',
    contractpay: '8,500',
    totalpay: '8,500',
    orderder: '(주)엘지유플러스',
    origin: '(주)엘지유플러스',
    progress: '진행중',
  },
  {
    projectcode: 'C0000123485',
    projectname: '(주)엘지유플러스_통신 MNO/MVNO 구분',
    businesetype: 'SI',
    projectstartdate: '2024.01.01',
    projectenddate: '2024.01.31',
    contractstartdate: '2024.01.31',
    contractenddate: '2024.01.31',
    contractpay: '8,500',
    totalpay: '8,500',
    orderder: '(주)엘지유플러스',
    origin: '(주)엘지유플러스',
    progress: '진행중',
  },
  {
    projectcode: 'C0000123485',
    projectname: '(주)엘지유플러스_통신 MNO/MVNO 구분',
    businesetype: 'SI',
    projectstartdate: '2024.01.01',
    projectenddate: '2024.01.31',
    contractstartdate: '2024.01.31',
    contractenddate: '2024.01.31',
    contractpay: '8,500',
    totalpay: '8,500',
    orderder: '(주)엘지유플러스',
    origin: '(주)엘지유플러스',
    progress: '진행중',
  },
])

// 페이지 변경 이벤트 핸들러
const handlePageChange = (newPage) => {
  console.log(`페이지 변경: ${newPage}`)
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
    projectDetail.value.departmentId = projectDetail.value.department
    await updateProject(projectId, projectDetail.value)
    toast.success(`${projectDetail.value.name}의 정보가 수정되었습니다.`)
  } finally {
    await fetchGetPartnersDetail()
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
