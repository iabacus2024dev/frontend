<template>
  <v-card class="pa-4" variant="oulined">
    <v-row v-for="(row, rowIndex) in rows" :key="rowIndex">
      <v-col
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
          <v-text-field
            v-if="field.type === 'text'"
            v-model="searchData[field.key]"
            variant="outlined"
            density="compact"
            hide-details="auto"
            class="search-input"
          ></v-text-field>

          <!-- 날짜 입력 -->
          <v-date-input
            v-else-if="field.type === 'date'"
            v-model="searchData[field.key]"
            prepend-icon=""
            variant="outlined"
            density="compact"
            :config="{ format: 'yyyy-MM-dd' }"
            hide-details="auto"
            class="search-input"
          ></v-date-input>

          <!-- 드롭다운 -->
          <v-select
            v-else-if="field.type === 'select'"
            label="전체"
            v-model="searchData[field.key]"
            :items="field.options"
            item-title="label"
            item-value="value"
            variant="outlined"
            density="compact"
            hide-details="auto"
            class="search-input"
          ></v-select>
        </div>
      </v-col>
    </v-row>

    <!-- 마지막 행에 버튼 포함 -->
    <v-row class="button-group pa-0">
      <v-col class="d-flex justify-end">
        <v-btn @click="onReset" class="btn reset mr-3" color="grey" variant="flat">초기화</v-btn>
        <v-btn @click="onSearch" class="btn search" color="red" variant="flat">검색</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'

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

.v-card {
  border: 1px solid lightgray;
}
</style>
