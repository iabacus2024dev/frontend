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
        :title="title"
        :loading="loading"
        @click-row="clickRow"
        :page="currentPage"
        :length="totalElements"
        @loadItems="loadItems"
        @open-dialog="createDialogs"
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
import {
  createProject,
  downloadProjects,
  downloadProjectsSample,
  getProjects,
  uploadProjects,
} from '@/apis/projectService.js'
import { useToast } from 'vue-toastification'
import { formatPrice, formatWithUnit } from '@/utils/MoneyUtils.js'
import { useDialog } from '@/composables/useDialog.js'
import ProjectCreatePopup from '@/views/project/ProjectCreatePopup.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const title = ref('프로젝트 목록')

const createDialog = useDialog()
const dialog = ref(false)
const loading = ref(false)

const currentPage = ref(1)
const totalElements = ref(0)
const items = ref([])

const size = ref(10)
const sort = ref('')

const uploadedFile = ref(null)

// 검색 조건 및 페이징 조건
const params = ref({
  searchType: '',
  startDate: '',
  endDate: '',
  type: '',
  status: '',
  name: '',
  code: '',
  page: 1,
  size: 10,
})

// 테이블 헤더
const headers = ref([
  { title: '프로젝트 코드', key: 'code', nowrap: true },
  { title: '프로젝트명', key: 'name', nowrap: true },
  { title: '사업 유형', key: 'type', nowrap: true },
  { title: '시작 일자', key: 'startDate', nowrap: true },
  { title: '종료 일자', key: 'endDate', nowrap: true },
  { title: '계약 일자', key: 'contractDate', nowrap: true },
  {
    title: '계약 금액',
    key: 'contractAmount',
    align: 'end',
    value: (item) => formatWithUnit(item.contractAmount),
    nowrap: true,
  },
  { title: '발주사', key: 'mainCompany', nowrap: true },
  { title: '원청사', key: 'clientCompany', nowrap: true },
  { title: '상태', key: 'status', sortable: false, nowrap: true },
])

// 검색 조건
const searchRows = ref([
  {
    // 첫 번째 행: 4개의 날짜 검색 조건

    fields: [
      {
        key: 'searchType',
        label: '날짜 검색 조건',
        type: 'select',
        options: [
          { title: '시작일자', value: '시작일자' },
          { title: '종료일자', value: '종료일자' },
          { title: '계약일자', value: '계약일자' },
        ],
      },
      {
        key: 'dateRange',
        type: 'daterange',
        startKey: 'startDate',
        endKey: 'endDate',
      },
      {
        key: 'type',
        label: '사업유형',
        type: 'select',
        options: [
          { title: '전체', value: '' },
          { title: 'SI', value: 'SI' },
          { title: 'SM', value: 'SM' },
        ],
      },
      {
        key: 'status',
        label: '진행 상태',
        type: 'select',
        options: [
          { title: '전체', value: '' },
          { title: '예약', value: '예약' },
          { title: '진행중', value: '진행중' },
          { title: '완료', value: '완료' },
        ],
      },
    ],
  },
  {
    // 두 번째 행: 드롭다운 (사업유형, 진행 상태)
    fields: [
      { key: 'name', label: '프로젝트 이름', type: 'text', md: 6},
      { key: 'code', label: '프로젝트 코드', type: 'text', md: 6},
    ],
  },
])

// 테이블 row 클릭
const clickRow = (item) => router.push(`/projects/${item.id}`)

// 데이터 불러오기
const loadItems = async (page = 1, itemsPerPage = size.value, sortBy = []) => {
  try {
    loading.value = true
    params.value.page = page
    params.value.size = itemsPerPage
    if (sortBy.length > 0) {
      params.value.sort = sortBy[0].key + ',' + sortBy[0].order
    } else {
      params.value.sort = []
    }

    size.value = itemsPerPage
    sort.value = params.value.sort

    const response = await getProjects(params.value)
    items.value = response.content
    totalElements.value = response.totalElements
    await router.replace(`/projects?${buildQueryParams(params.value)}`)
  } finally {
    loading.value = false
  }
}

// 검색 이벤트 핸들러
const handleSearch = async (filters) => {
  params.value = { ...filters, page: 1 }
  currentPage.value = 1
  await loadItems()
}

// 초기화 이벤트 핸들러
const handleReset = async () => {
  params.value = {
    searchType: '시작일자',
    startDate: '',
    endDate: '',
    type: '',
    status: '',
    name: '',
    code: '',
    page: 1,
  }
  currentPage.value = 1
  await loadItems()
}

// 프로젝트 등록 팝업
const createDialogs = () => {
  createDialog.openDialog({
    title: '프로젝트 등록',
    component: ProjectCreatePopup,
    fnCallback: (data) => {
      console.log('받은 데이터: ', data)
      fetchCreateProject(data)
    },
  })
}

// 프로젝트 등록
const fetchCreateProject = async (data) => {
  await createProject(data)
  toast.success('프로젝트가 성공적으로 등록되었습니다.')
}

// 엑셀 다운로드
const fetchDownloadProjects = async () => {
  console.log('엑셀 다운로드')
  setSortToParam()
  await downloadProjects(params.value)
  toast.success('프로젝트 엑셀 다운로드에 성공하였습니다.')
}

function setSortToParam() {
  const storedSort = localStorage.getItem(title.value + ' sort')
    ? JSON.parse(localStorage.getItem(title.value + ' sort'))
    : []
  if (storedSort.length > 0) {
    params.value.sort = storedSort[0].key + ',' + storedSort[0].order
  } else {
    params.value.sort = ''
  }
}

// 엑셀 샘플 다운로드
const fetchDownloadProjectsSample = async () => {
  console.log('엑셀 샘플 다운로드')
  await downloadProjectsSample()
  toast.success('프로젝트 엑셀 샘플 다운로드에 성공하였습니다.')
}

// 엑셀 업로드
const fetchUploadProjects = async () => {
  console.log('엑셀 업로드')
  if (!uploadedFile.value) {
    toast.error('파일을 선택해주세요.')
    return
  }

  const formData = new FormData()
  formData.append('file', uploadedFile.value)

  try {
    await uploadProjects(formData)
    toast.success('프로젝트 엑셀 업로드에 성공하였습니다.')

    dialog.value = false
    uploadedFile.value = null
  } catch (error) {
    console.error('업로드 실패:', error)
    throw error
  }
}

// 검색 내용 url에 반영
const restoreSearchParams = async () => {
  let query = route.query
  params.value = {
    searchType: query.searchType || '',
    startDate: query.startDate || '',
    endDate: query.endDate || '',
    type: query.type || '',
    status: query.status || '',
    name: query.name || '',
    code: query.code || '',
    page: query.page ? query.page : 1,
  }
  currentPage.value = query.page ? Number(query.page) : 1
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
