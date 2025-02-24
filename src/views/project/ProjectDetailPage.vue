<template>
  <v-container class="pa-0 ma-0">
    <v-row>
      <v-col cols="12" md="7">
        <BasicInfoComponent v-model="basicInfoData" class="mb-3" />
        <AmountComponent v-model="amountData" />
      </v-col>
      <v-col cols="12" md="5">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" md="6">
              <OrderdingCompanyComponent v-model="orderingCompanyData" />
            </v-col>
            <v-col cols="12" md="6">
              <MainCompanyComponent v-model="mainCompanyData" />
            </v-col>
          </v-row>
        </v-container>
        <v-container class="pa-0">
          <v-row>
            <v-col>
              <ProgressInfoComponent
                v-model:status="progressInfoData.status"
                v-model:start-date="progressInfoData.startDate"
                v-model:end-date="progressInfoData.endDate"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  <!-- 테이블 컴포넌트 -->
  <v-container class="btns-container pr-0">
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
      >프로젝트 삭제</v-btn
    >
  </v-container>
  <v-container class="pa-0">
    <H1>계약 목록</H1>
    <v-card>
      <TableComponent :tableTitle="tableTitleResponse" :tableData="tableDataResponse" />
      <PaginationComponent
        :page="currentPage"
        :length="totalPages"
        @change-page="handlePageChange"
      />
    </v-card>
  </v-container>
  <v-container class="btns-container pr-0">
    <v-btn
      variant="tonal"
      density="comfortable"
      class="btn-color"
      @click="handleContractRegisterButtonClick"
      >+ 계약 등록</v-btn
    >
  </v-container>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import OrderdingCompanyComponent from '@/components/project/OrderdingCompanyComponent.vue'
import MainCompanyComponent from '@/components/project/MainCompanyComponent.vue'
import ProgressInfoComponent from '@/components/project/ProgressInfoComponent.vue'
import AmountComponent from '@/components/project/AmountComponent.vue'
import BasicInfoComponent from '@/components/project/BasicInfoComponent.vue'
import PaginationComponent from '@/components/common/PaginationComponent.vue'

const emits = defineEmits(['project-emit-button-click', 'project-delete-button-click'])

/* todo: api 통신으로 실제 데이터를 가져오기 */
const tableTitleResponse = ref([
  '프로젝트코드',
  '프로젝트명',
  '사업유형',
  '투입시작일자',
  '투입종료일자',
  '계약시작일자',
  '계약종료일자',
  '계약금액\n(단위:천)',
  '총매출금액\n(단위:천)',
  '발주사',
  '원청사',
  '진행상태',
])

const basicInfoData = ref({
  projectCode: 'C0000123485',
  projectType: 'SI',
  projectName: '(주)엘지유플러스_통신 MNO/MVNO 구분',
  contractTeam: '융합데이터분석팀',
  mainRep: '박상철',
  mainRepPhone: '010-9876-6789',
  contractDate: '2024-01-15',
  contractStartDate: '2024-01-31',
  contractEndDate: '2024-01-31',
})

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

const orderingCompanyData = ref({
  orderingCompany: '(주)애버커스',
  orderingCompanyRepName: '이지수',
  orderingCompanyRepPhone: '010-1234-1234',
})

const mainCompanyData = ref({
  mainCompany: '(주)엘지유플러스',
  mainCompanyRepName: '이동욱',
  mainCompanyRepPhone: '010-4321-4321',
})

const amountData = ref({
  expectatedAmount: '4,500',
  actualAmount: '4,500',
})

const progressInfoData = ref({
  status: '예약',
  startDate: '2025-02-06',
  endDate: '2025-03-06',
})

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
