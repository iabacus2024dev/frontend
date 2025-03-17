<template>
  <v-row>
    <v-col class="mt-3">
      <SearchBarComponent :rows="searchRows" @search="handleSearch" @reset="handleReset" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn
        class="mr-3"
        @click="fetchDownloadPartners"
        prepend-icon="mdi-file-download-outline"
        color="#eb6129"
        elevation="1"
        density="comfortable"
      >
        엑셀 다운로드
      </v-btn>

      <v-btn
        class="mr-3"
        @click="openDialog"
        prepend-icon="mdi-file-upload-outline"
        color="#eb6129"
        elevation="1"
        density="comfortable"
      >
        엑셀 업로드
      </v-btn>
      <v-dialog v-model="dialog" max-width="900px">
        <v-card elevation="0">
          <v-file-upload
            v-model="uploadedFile"
            accept=".xlsx, .xls"
            label="엑셀 파일 선택"
            clearable
          ></v-file-upload>
          <v-card-actions>
            <v-btn text="엑셀 업로드" block border @click="fetchUploadPartners"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn
        @click="fetchDownloadPartnersSample"
        prepend-icon="mdi-file-upload-outline"
        color="#eb6129"
        elevation="1"
        density="comfortable"
      >
        엑셀 샘플 다운로드
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      전체 : {{ totalElements }}건
      <TableComponent :headers="headers" :items="items" @click-row="clickRow" />
      <!-- 페이지네이션 -->
      <PaginationComponent
        :page="currentPage"
        :length="totalPages"
        @change-page="handlePageChange"
      />
    </v-col>
  </v-row>
  <!-- 테이블 컴포넌트 -->
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import TableComponent from '@/components/table/TableComponent.vue'
import PaginationComponent from '@/components/common/PaginationComponent.vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'
import {
  downloadPartners,
  downloadPartnersSample,
  getPartners,
  uploadPartners,
} from '@/apis/partnerService.js'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const route = useRoute()

const modal = ref(null)
const modalTitle = ref('협력사 삭제')
const modalText = ref('....삭제 하겠습니까?')
const dialog = ref(false)

const currentPage = ref(1)
const totalPages = ref(0)
const totalElements = ref(0)
const items = ref([])

const uploadedFile = ref(null)

const params = ref({
  grade: '',
  name: '',
  ceoName: '',
  salesRepName: '',
  page: 1,
})

const headers = ref([
  { title: '협력사명', key: 'name' },
  { title: '대표자명', key: 'ceoName' },
  { title: '영업대표명', key: 'salesRepName' },
  { title: '영업대표 연락처', key: 'salesRepPhone' },
  { title: '영업대표 이메일', key: 'salesRepEmail' },
  { title: '평가등급', key: 'grade' },
  { title: '주소', key: 'address' },
])

const clickRow = (item) => {
  router.push(`/partners/${item.id}`)
}

const restoreSearchParams = async () => {
  const query = route.query
  params.value = {
    grade: query.grade || '',
    name: query.name || '',
    ceoName: query.ceoName || '',
    salesRepName: query.salesRepName || '',
    page: query.page ? Number(query.page) : 1,
  }
  currentPage.value = query.page ? Number(query.page) : 1
}

onMounted(async () => {
  await restoreSearchParams()
  await searchPartners()
})

const searchPartners = async () => {
  const response = await getPartners(params.value)
  totalPages.value = response.totalPages
  totalElements.value = response.totalElements
  items.value = response.content

  await router.replace(`/partners?${buildQueryParams(params.value)}`)
}

const buildQueryParams = (params) => {
  return Object.keys(params)
    .filter((key) => params[key] !== '')
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

const fetchDownloadPartners = async () => {
  console.log('엑셀 다운로드')
  await downloadPartners(params.value)
}

const fetchDownloadPartnersSample = async () => {
  console.log('엑셀 샘플 다운로드')
  await downloadPartnersSample()
}

const fetchUploadPartners = async () => {
  console.log('엑셀 업로드')
  if (!uploadedFile.value) {
    alert('파일을 선택해주세요.')
    return
  }

  const formData = new FormData()
  formData.append('file', uploadedFile.value)

  try {
    await uploadPartners(formData)
    const toast = useToast()
    toast.success('협력사 엑셀 업로드에 성공하였습니다.')
  } catch (error) {
    console.error('업로드 실패:', error)
  }
}

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

// 모달 열기
const openModal = () => {
  modal.value?.open()
}

// 확인 버튼 클릭 시
const handleConfirm = () => {
  console.log('확인 버튼 클릭됨!')
  console.log('사용하는 페이지에서 저장,삭제등등 기능 구현하면 됨')
}

// 취소 버튼 클릭 시
const handleCancel = () => {
  console.log('취소 버튼 클릭됨!')
}

// 페이지 변경 이벤트 핸들러
const handlePageChange = async (newPage) => {
  currentPage.value = newPage
  params.value.page = newPage
  await searchPartners()
}

watch(
  () => route.query,
  async () => {
    restoreSearchParams()
    await searchPartners()
  },
)

const searchRows = ref([
  {
    fields: [
      {
        key: 'grade',
        label: '평가등급',
        type: 'select',
        columnCount: 5,
        options: [
          { title: 'A', value: 'A' },
          { title: 'B', value: 'B' },
          { title: 'C', value: 'C' },
          { title: 'D', value: 'D' },
          { title: 'E', value: 'E' },
        ],
      },
      {
        key: 'name',
        label: '협력사명',
        type: 'text',
      },
      { key: 'ceoName', label: '대표자명', type: 'text' },
      { key: 'salesRepName', label: '영업대표명', type: 'text' },
    ],
  },
])

const handleSearch = async (filters) => {
  params.value = { ...filters, page: 1 }
  currentPage.value = 1
  await searchPartners()
}

const handleReset = async () => {
  params.value = { grade: '', name: '', ceoName: '', salesRepName: '', page: 1 }
  currentPage.value = 1
  await searchPartners()
}
</script>

<style scoped></style>
