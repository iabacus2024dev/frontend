<template>
  <v-row>
    <v-col class="mt-3">
      <SearchBarComponent :rows="searchRows" @search="handleSearch" @reset="handleReset" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <TableComponent
        :headers="headers"
        :items="items"
        title="프로젝트 목록"
        :loading="loading"
        @click-row="clickRow"
        :page="currentPage"
        :length="totalElements"
        @loadItems="loadItems"
        @open-dialog="dialog = true"
      />
      <div class="d-flex justify-end">
        <ExcelActionsComponent
          @download="fetchDownloadProjects"
          @upload="fetchUploadProjects"
          @downloadSample="fetchDownloadProjectsSample"
          v-model:file="uploadedFile"
          v-model:dialog="dialog"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'
import ExcelActionsComponent from '@/components/common/ExcelActionsComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { downloadProjects, getProjects } from '@/apis/projectService.js'
import { useToast } from 'vue-toastification'

const router = useRouter()
const route = useRoute()

const dialog = ref(false)
const loading = ref(false)

const currentPage = ref(1)
const totalElements = ref(0)
const items = ref([])

const uploadedFile = ref(null)

// 검색 조건 및 페이징 조건
const params = ref({
  code: '',
  name: '',
  type: '',
  startDate: '',
  endDate: '',
  contractDate: '',
  contractAmount: 0,
  mainCompany: '',
  clientCompany: '',
  status: '',
  page: 1,
  size: 10,
  sort: '',
})

// 테이블 헤더
const headers = ref([
  { title: '프로젝트 코드', key: 'code' },
  { title: '프로젝트명', key: 'name' },
  { title: '사업 유형', key: 'type' },
  { title: '시작 일자', key: 'startDate' },
  { title: '종료 일자', key: 'endDate' },
  { title: '계약 일자', key: 'contractDate' },
  { title: '계약 금액', key: 'contractAmount' },
  { title: '발주사', key: 'mainCompany' },
  { title: '원청사', key: 'clientCompany' },
  { title: '상태', key: 'status' },
])

// 검색 조건
const searchRows = ref([
  {
    // 첫 번째 행: 4개의 날짜 검색 조건
    fields: [
      { key: 'startDate', label: '계약 시작일자', type: 'date', columnCount: 4 },
      { key: 'endDate', label: '계약 종료일자', type: 'date', columnCount: 4 },
      { key: 'pInsertStartDate', label: '투입 시작일자', type: 'date', columnCount: 4 },
      { key: 'pInsertEndDate', label: '투입 종료일자', type: 'date', columnCount: 4 },
    ],
  },
  {
    // 두 번째 행: 드롭다운 (사업유형, 진행 상태)
    fields: [
      {
        key: 'type',
        label: '사업유형',
        type: 'select',
        columnCount: 2,
        options: [
          { title: 'SI', value: 'SI' },
          { title: 'SM', value: 'SM' },
        ],
      },
      {
        key: 'status',
        label: '진행 상태',
        type: 'select',
        columnCount: 4,
        options: [
          { title: '진행중', value: '진행중' },
          { title: '완료', value: '완료' },
        ],
      },
    ],
  },
  {
    // 세 번째 행: 텍스트 검색 (프로젝트명, 프로젝트 코드)
    fields: [
      { key: 'projectName', label: '프로젝트 이름', type: 'text', columnCount: 2 },
      { key: 'projectCode', label: '프로젝트 코드', type: 'text', columnCount: 2 },
    ],
  },
])

// 테이블 row 클릭
const clickRow = (item) => router.push(`/projects/${item.id}`)

// 데이터 불러오기
const loadItems = async (page = 1, size = 10, sortBy = []) => {
  loading.value = true
  params.value = {
    page,
    size,
    sort: sortBy.length ? `${sortBy[0].key},${sortBy[0].order}` : '',
  }
  const response = await getProjects(params.value)
  items.value = response.content
  totalElements.value = response.totalElements
  await router.replace(`/projects?${buildQueryParams(params.value)}`)
  loading.value = false
}

// 검색 이벤트 핸들러
const handleSearch = async (filters) => {
  Object.assign(params.value, filters, { page: 1 })
  currentPage.value = 1
  await loadItems()
}

// 초기화 이벤트 핸들러
const handleReset = async () => {
  params.value = {}
  currentPage.value = 1
  await loadItems()
}

// 엑셀 다운로드
const fetchDownloadProjects = async () => {
  console.log('엑셀 다운로드')
  await downloadProjects(params.value)
  const toast = useToast()
  toast.success('협력사 엑셀 다운로드에 성공하였습니다.')
}

// 테이블 엑셀 관련 이벤트
const tableExcelEventCondition = ref({
  excelUpload: true,
  excelDownload: true,
})

// 페이지 변경 이벤트 핸들러
const handlePageChange = (newPage) => {
  console.log(`페이지 변경: ${newPage}`)
}

const fnCreateData = () => {
  console.log('fnCreateData >>>', 'todo: 데이터 등록 팝업창 뜨기')
}

const fnExcelUpload = () => {
  console.log('fnExcelUpload >>>', 'todo: 엑셀 업로드 실행')
}

const restoreSearchParams = async () => {
  params.value = {
    code: route.query.code || '',
    name: route.query.name || '',
    type: route.query.type || '',
    startDate: route.query.startDate || '',
    endDate: route.query.endDate || '',
    contractDate: route.query.contractDate || '',
    contractAmount: Number(route.query.contractAmount) || 0,
    mainCompany: route.query.mainCompany || '',
    clientCompany: route.query.clientCompany || '',
    status: route.query.status || '',
    page: Number(route.query.page) || 1,
    size: Number(route.query.size) || 10,
    sort: route.query.sort || '',
  }
  currentPage.value = params.value.page
}

const buildQueryParams = (params) => {
  return Object.keys(params)
    .filter((key) => params[key] !== '')
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

watch(
  () => route.query,
  async () => {
    await restoreSearchParams()
  },
)

restoreSearchParams()
</script>

<style scoped></style>
