<template>
  <v-row>
    <v-col cols="12" md="7">
      <BasicInfoComponent v-model="projectDetail" class="mb-3" />
      <AmountComponent v-model="projectDetail" />
    </v-col>
    <v-col cols="12" md="5">
      <v-row>
        <v-col cols="12" md="6">
          <OrderdingCompanyComponent v-model="projectDetail" />
        </v-col>
        <v-col cols="12" md="6">
          <MainCompanyComponent v-model="projectDetail" />
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
      <v-btn
        variant="tonal"
        density="comfortable"
        class="btn-color mr-2"
        @click="handleProjectEditButtonClick"
        >프로젝트 수정</v-btn
      >
      <v-btn
        variant="tonal"
        density="comfortable"
        class="btn-color"
        @click="handleProjectDeleteButtonClick"
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
import { defineEmits, onMounted, ref } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import OrderdingCompanyComponent from '@/components/project/OrderdingCompanyComponent.vue'
import MainCompanyComponent from '@/components/project/MainCompanyComponent.vue'
import ProgressInfoComponent from '@/components/project/ProgressInfoComponent.vue'
import AmountComponent from '@/components/project/AmountComponent.vue'
import BasicInfoComponent from '@/components/project/BasicInfoComponent.vue'
import EmployeeListComponent from '@/components/employee/EmployeeListComponent.vue'
import { useToast } from 'vue-toastification'
import { getProjectDetail } from '@/apis/projectService.js'
import { useRoute } from 'vue-router'
import { formatPrice } from '@/utils/MoneyUtils.js'

const emits = defineEmits(['project-emit-button-click', 'project-delete-button-click'])

/* todo: api 통신으로 실제 데이터를 가져오기 */

const toast = useToast()
const projectDetail = ref({
  name: '',
  code: '',
  type: '',
  status: '',
  contractDate: '',
  ownerTeamId: Number,
  ownerTeamName: '',
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
onMounted(() => {
  fetchGetPartnersDetail(projectId)
})

const fetchGetPartnersDetail = async (projectId) => {
  projectDetail.value = await getProjectDetail(projectId)
  projectDetail.value.expectedAmount = formatPrice(projectDetail.value.expectedAmount)
  projectDetail.value.contractAmount = formatPrice(projectDetail.value.contractAmount)
}

const headers = ref([
  { title: '프로젝트코드', key: 'projectcode' },
  { title: '프로젝트명', key: 'projectname' },
  { title: '사업유형', key: 'businesetype' },
  { title: '투입시작일자', key: 'projectstartdate' },
  { title: '투입종료일자', key: 'projectenddate' },
  { title: '계약시작일자', key: 'contractstartdate' },
  { title: '계약종료일자', key: 'contractenddate' },
  { title: '계약금액 (단위:천)', key: 'contractpay' },
  { title: '총매출금액 (단위:천)', key: 'totalpay' },
  { title: '발주사', key: 'orderder' },
  { title: '원청사', key: 'origin' },
  { title: '진행상태', key: 'progress' },
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
  console.log('handleProjectEditButtonClick >>>', '프로젝트 수정 버튼 클릭!')
  emits('project-edit-button-click')
}

// 프로젝트 삭제 이벤트 핸들러
const handleProjectDeleteButtonClick = () => {
  console.log('handleProjectDeleteButtonClick >>>', '프로젝트 삭제 버튼 클릭!')
  emits('project-delete-button-click')
}

// 계약 등록 이벤트 핸들러
const handleContractRegisterButtonClick = () => {
  console.log('handleContractRegisterButtonClick >>>', '계약 등록 버튼 클릭!')
  emits('contract-register-button-click')
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
