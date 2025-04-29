<template>
  <v-row>
    <v-col class="mt-3">
      <SearchBarComponent :rows="searchRows" @search="handleSearch" @reset="handleReset" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <!-- 테이블 컴포넌트 -->
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
          @download="fetchDownloadPartners"
          @upload="fetchUploadPartners"
          @downloadSample="fetchDownloadPartnersSample"
          v-model:file="uploadedFile"
          v-model:dialog="dialog"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'
import {
  createPartners,
  downloadPartners,
  downloadPartnersSample,
  getPartners,
  uploadPartners,
} from '@/apis/partnerService.js'
import ExcelActionsComponent from '@/components/common/ExcelActionsComponent.vue'
import { formatPhoneNumber } from '@/utils/PhoneUtils.js'

import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDialog } from '@/composables/useDialog'
import PartnersCreatePopup from './PartnersCreatePopup.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const title = ref('협력사 목록')

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
  grade: '',
  name: '',
  ceoName: '',
  salesRepName: '',
  page: 1,
  size: 10,
})

// 테이블 헤더
const headers = ref([
  { title: '협력사명', key: 'name', nowrap: true },
  { title: '대표자명', key: 'ceoName', nowrap: true },
  { title: '영업대표명', key: 'salesRepName', nowrap: true },
  {
    title: '영업대표 연락처',
    key: 'salesRepPhone',
    nowrap: true,
    value: item => formatPhoneNumber(item.salesRepPhone)
  },
  { title: '영업대표 이메일', key: 'salesRepEmail', nowrap: true },
  { title: '평가등급', key: 'grade', nowrap: true },
  { title: '주소', key: 'address', nowrap: true },
])

// 검색 조건
const searchRows = ref([
  {
    fields: [
      {
        key: 'grade',
        label: '평가등급',
        type: 'select',
        columnCount: 6,
        input: {
          user_id: 1,
        },
        options: [
          { title: '전체', value: '' },
          { title: 'A', value: 'A' },
          { title: 'B', value: 'B' },
          { title: 'C', value: 'C' },
          { title: 'D', value: 'D' },
          { title: 'E', value: 'E' },
        ],
      },
      { key: 'name', label: '협력사명', type: 'text' },
      { key: 'ceoName', label: '대표자명', type: 'text' },
      { key: 'salesRepName', label: '영업대표명', type: 'text' },
    ],
  },
])

// 테이블 row 클릭
const clickRow = (item) => router.push(`/partners/${item.id}`)

// 데이터 불러오기
const loadItems = async (page = 1, itemsPerPage = size.value, sortBy = []) => {
  try {
    loading.value = true
    params.value.page = page
    params.value.size = itemsPerPage
    if (sortBy.length > 0) {
      params.value.sort = sortBy[0].key + ',' + sortBy[0].order
    } else {
      params.value.sort = ''
    }

    size.value = itemsPerPage
    sort.value = params.value.sort

    const response = await getPartners(params.value)
    items.value = response.content
    totalElements.value = response.totalElements
    await router.replace(`/partners?${buildQueryParams(params.value)}`)
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
  params.value = { grade: '', name: '', ceoName: '', salesRepName: '', page: 1 }
  currentPage.value = 1
  await loadItems()
}

// 협력사 등록 팝업
const createDialogs = () => {
  createDialog.openDialog({
    title: '협력사 등록',
    component: PartnersCreatePopup,
    fnCallback: (data) => {
      console.log('받은 데이터: ', data)
      if (data) {
        fetchCreatePartners(data)
      } else {
        toast.error('입력 값을 확인해주세요. 필수 항목을 모두 입력해야 합니다.')
      }
    },
  })
}

// 협력사 등록
const fetchCreatePartners = async (data) => {
  await createPartners(data)
  toast.success('협력사가 성공적으로 등록되었습니다.')
}

// 엑셀 다운로드
const fetchDownloadPartners = async () => {
  console.log('엑셀 다운로드')
  setSortToParam()
  await downloadPartners(params.value)
  toast.success('협력사 엑셀 다운로드에 성공하였습니다.')
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
const fetchDownloadPartnersSample = async () => {
  console.log('엑셀 샘플 다운로드')
  await downloadPartnersSample()
  toast.success('협력사 엑셀 샘플 다운로드에 성공하였습니다.')
}

// 엑셀 업로드
const fetchUploadPartners = async () => {
  console.log('엑셀 업로드')
  if (!uploadedFile.value) {
    toast.error('파일을 선택해주세요.')
    return
  }

  const formData = new FormData()
  formData.append('file', uploadedFile.value)

  try {
    await uploadPartners(formData)
    toast.success('협력사 엑셀 업로드에 성공하였습니다.')

    dialog.value = false
    uploadedFile.value = null
  } catch (error) {
    console.error('업로드 실패:', error)
    throw error
  }
}

// 검색 내용 url에 반영
const restoreSearchParams = async () => {
  const query = route.query
  params.value = {
    grade: query.grade || '',
    name: query.name || '',
    ceoName: query.ceoName || '',
    salesRepName: query.salesRepName || '',
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
