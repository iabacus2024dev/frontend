<template>
  <VCard class="pa-4" variant="outlined" elevation="0" border="thin">
    <VRow v-for="(row, rowIndex) in rows" :key="rowIndex">
      <VCol
        v-for="(field, index) in row.fields"
        :key="index"
        cols="12"
        class="search-field"
        md="3"
        sm="5"
      >
        <div class="field-wrapper">
          <!-- 레이블 (왼쪽 정렬) -->
          <label class="search-label" :for="field.key">{{ field.label }}</label>

          <!-- 텍스트 입력 -->
          <VTextField
            v-if="field.type === 'text'"
            v-model="searchData[field.key]"
            variant="outlined"
            density="compact"
            hide-details="auto"
            class="search-input"
          ></VTextField>

          <!-- 날짜 입력 -->
          <VTextField
            v-else-if="field.type === 'date'"
            v-model="searchData[field.key]"
            type="date"
            variant="outlined"
            density="compact"
            hide-details="auto"
            class="search-input"
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
            class="search-input"
          ></VSelect>
        </div>
      </VCol>
    </VRow>

    <!-- 마지막 행에 버튼 포함 -->
    <VRow class="button-group pa-0">
      <VCol class="d-flex justify-end">
        <VBtn @click="onReset" class="reset-btn mr-3" variant="flat">초기화</VBtn>
        <VBtn @click="onSearch" class="search-btn" variant="flat">검색</VBtn>
      </VCol>
    </VRow>
  </VCard>
</template>

<script setup>
import { defineEmits, defineProps, reactive } from 'vue'

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

// 검색 데이터 상태
const searchData = reactive({})

// 검색 실행
const onSearch = () => {
  emit('search', searchData)
}

// 검색 조건 초기화
const onReset = () => {
  Object.keys(searchData).forEach((key) => {
    searchData[key] = ''
  })
  emit('reset')
}
</script>

<style scoped>
/* 레이블과 입력 필드를 가로 정렬 */
.field-wrapper {
  display: flex;
  align-items: center;
  gap: 8px; /* 레이블과 입력 필드 사이 간격 */
}

/* 레이블 스타일 */
.search-label {
  min-width: 100px; /* 레이블 최소 너비 */
  text-align: right; /* 텍스트를 오른쪽 정렬 */
  font-weight: bold;
  font-size: clamp(11px, 1.3vw, 14px); /* 최소 12px, 기본 1.2vw, 최대 14px */
}

/* 입력 필드 스타일 */
.search-input {
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
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
