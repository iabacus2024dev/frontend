<template>
  <VCard class="pa-4" elevation="0" border="thin">
    <VForm @submit.prevent="onSearch">
      <VRow v-for="(row, rowIndex) in rows" :key="rowIndex">
        <VCol
          v-for="(field, index) in row.fields"
          :key="index"
          cols="12"
          :md="field.md || 3"
          :sm="field.sm || 5"
        >
          <div class="field-wrapper" v-if="field.type !== 'daterange' && field.type !== 'checkbox' && field.type !== 'checkbox_title'">
            <!-- 레이블 (왼쪽 정렬) -->
            <label v-if="field.label" class="search-label" :for="field.key">{{ field.label }}</label>

            <!-- 텍스트 입력 -->
            <VTextField
              v-if="field.type === 'text'"
              v-model="searchData[field.key]"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />

            <!-- 날짜 입력 -->
            <VTextField
              v-else-if="field.type === 'date'"
              v-model="searchData[field.key]"
              type="date"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />

            <!-- 날짜(연도) 입력 -->
            <v-select
              v-if="field.type === 'year'"
              v-model="searchData[field.key]"
              :items="yearOptions"
              item-title="title"
              item-value="value"
              label="조회 연도"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />

            <!-- 드롭다운 -->
            <VSelect
              v-else-if="field.type === 'select'"
              v-model="searchData[field.key]"
              :items="field.options"
              item-title="title"
              item-value="value"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </div>

          <!-- checkbox 타입 처리 -->
          <div class = "field-wrapper" v-else-if="field.type === 'checkbox'">
            <label v-if="field.title" class="search-label">{{ field.title }}</label>
            <VCheckbox
              v-if="field.type === 'checkbox'"
              v-model="searchData[field.key]"
              :label = "field.label"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </div>

          <!-- daterange 타입 처리 -->
          <div class="field-wrapper" v-else>
            <VTextField
              v-model="searchData[field.startKey]"
              type="date"
              variant="outlined"
              density="compact"
              hide-details="auto"
              class="search-input"
            />
            <span class="daterange-separator">~</span>
            <VTextField
              v-model="searchData[field.endKey]"
              type="date"
              variant="outlined"
              density="compact"
              hide-details="auto"
              class="search-input"
            />
          </div>
        </VCol>
      </VRow>

      <!-- 마지막 행에 버튼 포함 -->
      <VRow class="button-group pa-0">
        <VCol class="d-flex justify-end">
          <VBtn @click="onReset" class="reset-btn mr-3" variant="flat">초기화</VBtn>
          <VBtn class="search-btn" variant="flat" type="submit">검색</VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCard>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const MIN_YEAR = 2015
const MAX_YEAR = new Date().getFullYear() + 1

// Emits 정의
const emit = defineEmits(['search', 'reset'])
const router = useRouter()
const route = useRoute()

// 검색 데이터 상태
const searchData = reactive({})
// Props 정의
const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  buttonWidth: {
    type: String,
    default: '250px', // 버튼 그룹 너비
  },
})

// MAX→MIN 순으로 뽑아서 '내림차순' 리스트 생성
const yearOptions = computed(() => {
  const years = []
  for (let y = MAX_YEAR; y >= MIN_YEAR; y--) {
    years.push({ title: `${y}`, value: y })
  }
  return years
})

onMounted(() => {
  // URL 쿼리에서 검색 데이터 초기화
  Object.keys(route.query).forEach((key) => {
    searchData[key] = route.query[key]
  })

  searchData['year'] = new Date().getFullYear()

  // 각 행의 필드를 순회하며 select 타입이면 기본값 할당
  props.rows.forEach((row) => {
    row.fields.forEach((field) => {
      if (field.type === 'select' && (!searchData[field.key] || searchData[field.key] === '')) {
        searchData[field.key] =
          field.options && field.options.length > 0 ? field.options[0].value : ''
      }
    })
  })
})

const onSearch = () => {
  router.replace({ query: { ...searchData, page: 1 } })
  emit('search', searchData)
}

// 검색 조건 초기화
const onReset = () => {
  Object.keys(searchData).forEach((key) => {
    searchData[key] = ''
  })
  router.replace({ query: {} })
  emit('reset')
}
</script>

<style scoped>
/* 레이블과 입력 필드를 가로 정렬 */
.field-wrapper {
  display: flex;
  align-items: center;
  /* justify-content: flex-end; /* 내부의 날짜 입력 필드를 오른쪽에 정렬 이었는데 없애도 변경되는 부분이 없어서 주석처리 해둠 */
  gap: 8px; /* 레이블과 입력 필드 사이 간격 */
  width: 100%;
}

/* 레이블 스타일 */
.search-label {
  min-width: 80px;
  margin-left: 20px;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  font-weight: bold;
  font-size: clamp(11px, 1.3vw, 14px); /* 최소 12px, 기본 1.2vw, 최대 14px */
}

/* 검색 버튼 스타일*/
.search-btn {
  background-color: #eb6129;
  color: white;
}

/* 초기화 버튼 스타일 */
.reset-btn {
  background-color: lightgrey;
}

/* v-select 전체 크기 조절 */
:deep(.v-field) {
  min-height: 20px !important; /* 높이 줄이기 */
  font-size: clamp(11px, 1.3vw, 14px); /* 최소 12px, 기본 1.2vw, 최대 14px */
  padding: 2px 8px !important; /* 내부 여백 줄이기 */
}

/* 입력 필드 크기 조절 */
:deep(.v-field__input) {
  min-height: 28px !important;
  font-size: clamp(11px, 1.3vw, 14px); /* 최소 12px, 기본 1.2vw, 최대 14px */
  padding: 2px 4px !important;
}

/* 년도 선택관련 스타일 설정 */
:deep(.v-date-picker-years__content) {
  padding-inline: 0 !important;
  background-color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
  grid-template-columns: repeat(1, 1fr) !important;    /* 한 행에 2개의 년도만 나오게 함 */
}

/* 드롭다운 아이콘 크기 줄이기 */
:deep(.v-select__menu-icon) {
  font-size: 18px !important;
}
</style>

