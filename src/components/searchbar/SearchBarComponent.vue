<template>
  <VCard class="pa-4" elevation="0" border="thin">
    <VForm @submit.prevent="onSearch">
      <VRow v-for="(row, rowIndex) in rows" :key="rowIndex">
        <VCol
          v-for="(field, index) in row.fields"
          :key="index"
          cols="12"
          class="search-field"
          :md="field.md || 3"
          :sm="field.sm || 5"
        >
          <div class="field-wrapper" v-if="field.type !== 'daterange'">
            <!-- 레이블 (왼쪽 정렬) -->
            <label class="search-label" :for="field.key">{{ field.label }}</label>

            <!-- 텍스트 입력 -->
            <VTextField
              v-if="field.type === 'text'"
              v-model="searchData[field.key]"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></VTextField>

            <!-- 날짜 입력 -->
            <VTextField
              v-else-if="field.type === 'date'"
              v-model="searchData[field.key]"
              type="date"
              variant="outlined"
              density="compact"
              hide-details="auto"
            >
            </VTextField>

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
            ></VSelect>
          </div>

          <!-- daterange 타입 처리 -->
          <div class="field-wrapper" v-else>
            <div class="field-wrapper">
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
import { defineEmits, defineProps, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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

// Emits 정의
const emit = defineEmits(['search', 'reset'])
const router = useRouter()
const route = useRoute()

// 검색 데이터 상태
const searchData = reactive({})

onMounted(() => {
  // URL 쿼리에서 검색 데이터 초기화
  Object.keys(route.query).forEach((key) => {
    searchData[key] = route.query[key]
  })

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
  justify-content: flex-end; /* 내부의 날짜 입력 필드를 오른쪽에 정렬 */
  gap: 8px; /* 레이블과 입력 필드 사이 간격 */
  width: 100%;
}

/* 레이블 스타일 */
.search-label {
  min-width: 80px; /* 레이블 최소 너비 */
  margin-left: 20px;
  text-align: left; /* 텍스트를 오른쪽 정렬 */
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

/* 드롭다운 아이콘 크기 줄이기 */
:deep(.v-select__menu-icon) {
  font-size: 18px !important;
}
</style>
