<template>
  <v-col class="mt-3">
    <SearchBarComponent
      :rows="searchRows"
      :immediateCheckboxEmit="true"
      @search="handleSearch"
      @reset="handleReset"
      :key="resetKey"
    />
  </v-col>
  <v-col>
    <TableComponent
      :showButton="false"
      :headers="dynamicHeaders"
      :items="items"
      :title="title"
      :loading="loading"
      :showFooter="true"
      @loadItems="loadItems"
    />
    <div class="d-flex justify-end">
      <ExcelActionsComponent
        :showButton="false"
        :btnUpVisible="false"
        @download="fetchDownloadAggregate"
        v-model:dialog="dialog"
      />
    </div>
  </v-col>
</template>

<script setup>
import { computed, ref } from 'vue'
import SearchBarComponent from '@/components/searchbar/SearchBarComponent.vue'
import TableComponent from '@/components/table/TableComponent.vue'
import ExcelActionsComponent from '@/components/common/ExcelActionsComponent.vue'
import { downloadAggregate, getAggregate } from '@/apis/salesService.js'
import { useRouter } from 'vue-router'
import { formatPrice } from '@/utils/MoneyUtils.js'
import { useToast } from 'vue-toastification'

const resetKey = ref(0)

const title = ref('장표 조회')
const dialog = ref(false)
const loading = ref(false)
const currentPage = ref(1)
const totalElements = ref(0)
const items = ref([])
const size = ref(10)
const sort = ref('')
const router = useRouter()
const toast = useToast()

// 검색 조건 및 페이징 조건
const params = ref({
  year: '',
  page: 1,
  size: 10,
})

// SearchBarComponent에서 전달받은 필터를 저장할 reactive 변수
const searchFilters = ref({})

const searchRows = ref([
  {
    fields: [
      {
        key: 'checkTeam',
        label: '팀',
        title: '부서 범위',
        type: 'checkbox',
        md: 2,
      },
      {
        key: 'checkDepartment',
        label: '담당',
        type: 'checkbox',
        md: 1,
      },
      {
        key: 'checkDivision',
        label: '본부',
        type: 'checkbox',
        md: 3,
      },
      {
        key: 'dateRangeType',
        label: '적용 기간',
        type: 'select',
        options: [{ title: '연도별', value: 'year' }],
        md: 3,
      },
      {
        key: 'year',
        type: 'year',
        md: 2,
      },
    ],
  },
  {
    fields: [
      {
        key: 'checkTypeWage',
        label: '인력유형별 인건비',
        title: '추가 정보',
        type: 'checkbox',
        value: false,
        md: 3,
      },
      {
        key: 'checkTypeAmount',
        label: '사업 유형별 매출',
        type: 'checkbox',
        value: false,
        md: 2,
      },
      {
        key: 'checkMonthlyAmount',
        label: '월별 상세 매출',
        type: 'checkbox',
        value: false,
        md: 3,
      },
    ],
  },
])

// 숫자 포맷터 - 금액 단위로 표시
const formatNumber = (num) => {
  if (num == null) return ''
  return formatPrice(num, { showCurrency: false })
}

// 인건비(명) 통합
const personnelCost = (num, count) => {
  if (num === 0) return '0'
  return `${formatPrice(num, { showCurrency: false })} (${count})`
}

// handleSearch: SearchBarComponent에서 필터가 전달되면 저장
const handleSearch = async (filters) => {
  // 기존 params 업데이트
  params.value = { ...filters, page: 1 }
  currentPage.value = 1
  // 체크박스 등 검색 필터 저장
  searchFilters.value = { ...filters }
  await loadItems()
}

// 초기화 이벤트 핸들러
const handleReset = async () => {
  params.value = {
    dateRangeType: '',
    year: new Date().getFullYear(),
    page: 1,
  }
  resetKey.value++
  currentPage.value = 1
  await loadItems()
}

// 엑셀 다운로드
const fetchDownloadAggregate = async () => {
  console.log('엑셀 다운로드')
  setSortToParam()
  console.log(params)
  await downloadAggregate(params.value)
  toast.success('매출정보 엑셀 다운로드에 성공하였습니다.')
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

    items.value = await getAggregate(params.value.year)
    await router.replace(`/sales?${buildQueryParams(params.value)}`)

    if (sortBy.length) {
      const sortKey = sortBy[0].key
      const sortOrder = sortBy[0].order
      items.value.sort((a, b) => {
        const aValue = a[sortKey]
        const bValue = b[sortKey]
        return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
      })
    }
  } finally {
    loading.value = false
  }
}

const buildQueryParams = (params) => {
  return Object.keys(params)
    .filter((key) => params[key] !== '')
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

// computed: 체크박스 상태에 따라 동적으로 header 배열 생성
const dynamicHeaders = computed(() => {
  const headers = []

  // 항상 표시되는 기본 컬럼
  headers.push({ title: '부서이름', key: '부서이름', nowrap: true })
  headers.push({
    title: '매출합계',
    key: '매출합계',
    nowrap: true,
    value: (item) => formatNumber(item['매출합계']),
  })
  headers.push({
    title: '매출목표',
    key: '매출목표',
    nowrap: true,
    value: (item) => formatNumber(item['매출목표']),
  })
  headers.push({
    title: '달성률',
    key: '달성률',
    nowrap: true,
    value: (item) => `${item['달성률']}%`,
  })
  headers.push({
    title: '영업이익',
    key: '영업이익',
    nowrap: true,
    value: (item) => formatNumber(item['영업이익']),
  })
  headers.push({
    title: '영업이익률',
    key: '영업이익률',
    nowrap: true,
    value: (item) => `${item['영업이익률']}%`,
  })
  headers.push({
    title: '판관비',
    key: '판관비',
    nowrap: true,
    value: (item) => formatNumber(item['판관비']),
  })
  headers.push({
    title: '제경비',
    key: '제경비',
    nowrap: true,
    value: (item) => formatNumber(item['제경비']),
  })

  // 추가 정보에 따른 선택적 컬럼
  if (searchFilters.value.checkTypeWage) {
    headers.push({
      title: '정직원 인건비(인원)',
      key: '정직원',
      nowrap: true,
      value: (item) => personnelCost(item['정직원인건비'], formatNumber(item['정직원'])),
    })
    headers.push({
      title: '프리랜서 인건비(인원)',
      key: '프리랜서',
      nowrap: true,
      value: (item) => personnelCost(item['프리랜서인건비'], formatNumber(item['프리랜서'])),
    })
    headers.push({
      title: '외주 인건비(인원)',
      key: '외주',
      nowrap: true,
      value: (item) => personnelCost(item['외주인건비'], formatNumber(item['외주'])),
    })
  } else {
    headers.push({
      title: '인건비',
      key: '인건비',
      nowrap: true,
      value: (item) => formatNumber(item['인건비']),
    })
  }
  if (searchFilters.value.checkTypeAmount) {
    headers.push({
      title: 'SI',
      key: 'si',
      nowrap: true,
      value: (item) => formatNumber(item['si']),
    })
    headers.push({
      title: 'SM',
      key: 'sm',
      nowrap: true,
      value: (item) => formatNumber(item['sm']),
    })
  }
  if (searchFilters.value.checkMonthlyAmount) {
    headers.push({
      title: '1월',
      key: 'sales_01',
      nowrap: true,
      value: (item) => formatNumber(item['sales_01']),
    })
    headers.push({
      title: '2월',
      key: 'sales_02',
      nowrap: true,
      value: (item) => formatNumber(item['sales_02']),
    })
    headers.push({
      title: '3월',
      key: 'sales_03',
      nowrap: true,
      value: (item) => formatNumber(item['sales_03']),
    })
    headers.push({
      title: '4월',
      key: 'sales_04',
      nowrap: true,
      value: (item) => formatNumber(item['sales_04']),
    })
    headers.push({
      title: '5월',
      key: 'sales_05',
      nowrap: true,
      value: (item) => formatNumber(item['sales_05']),
    })
    headers.push({
      title: '6월',
      key: 'sales_06',
      nowrap: true,
      value: (item) => formatNumber(item['sales_06']),
    })
    headers.push({
      title: '7월',
      key: 'sales_07',
      nowrap: true,
      value: (item) => formatNumber(item['sales_07']),
    })
    headers.push({
      title: '8월',
      key: 'sales_08',
      nowrap: true,
      value: (item) => formatNumber(item['sales_08']),
    })
    headers.push({
      title: '9월',
      key: 'sales_09',
      nowrap: true,
      value: (item) => formatNumber(item['sales_09']),
    })
    headers.push({
      title: '10월',
      key: 'sales_10',
      nowrap: true,
      value: (item) => formatNumber(item['sales_10']),
    })
    headers.push({
      title: '11월',
      key: 'sales_11',
      nowrap: true,
      value: (item) => formatNumber(item['sales_11']),
    })
    headers.push({
      title: '12월',
      key: 'sales_12',
      nowrap: true,
      value: (item) => formatNumber(item['sales_12']),
    })
  }

  return headers
})
</script>

<style scoped></style>
