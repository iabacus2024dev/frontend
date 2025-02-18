<template>
  <div class="search-bar">
    <div class="search-container">
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="search-row">
        <div
          v-for="(field, index) in row.fields"
          :key="index"
          class="search-field"
          :style="{ width: field.width ? field.width : (field.columnCount ? `calc((100% - ${buttonWidth}) / ${field.columnCount})` : '200px') }"
        >
          <label :for="field.key">{{ field.label }}</label>

          <!-- 텍스트 입력 -->
          <input
            v-if="field.type === 'text'"
            v-model="searchData[field.key]"
            type="text"
            class="input"
            :placeholder="field.placeholder || ''"
          />

          <!-- 날짜 입력 -->
          <input
            v-else-if="field.type === 'date'"
            v-model="searchData[field.key]"
            type="date"
            class="input"
          />

          <!-- 드롭다운 -->
          <select
            v-else-if="field.type === 'select'"
            v-model="searchData[field.key]"
            class="input"
          >
            <option value="" disabled selected>선택하세요</option>
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- 마지막 행일 때 버튼 포함 -->
        <div v-if="rowIndex === rows.length - 1" class="button-group" :style="{ width: buttonWidth-0.001 }">
          <button @click="onReset" class="btn reset">초기화</button>
          <button @click="onSearch" class="btn search">검색</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      required: true
    },
    columnCount: {
      type: Number,
      default: 3 // 기본 한 줄에 3개 배치
    },
    buttonWidth: {
      type: String,
      default: "250px" // 버튼 그룹의 너비 (초기화+검색 버튼 크기 합)
    }
  },
  data() {
    return {
      searchData: {}
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchData);
    },
    onReset() {
      this.searchData = {};
      this.$emit("reset");
    }
  }
};
</script>

<style scoped>
/* 검색 바 전체 스타일 */
.search-bar {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  margin-left: 20px;
  margin-right: 20px;
}

/* 검색 필드 컨테이너 */
.search-container {
  display: flex;
  flex-direction: column;
}

/* 검색 행 */
.search-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

/* 검색 필드 개별 스타일 */
.search-field {
  display: flex;
  align-items: center;
}

/* 레이블 스타일 */
.search-field label {
  font-size: 14px;
  color: #333;
  min-width: 100px;
  text-align: right;
  margin-right: 8px;
}

/* 입력 필드 스타일 */
.input {
  flex: 1;
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  min-width: 120px;
}

/* 버튼 컨테이너 (마지막 행에 포함) */
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}

/* 버튼 스타일 */
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.reset {
  background-color: #ccc;
  color: white;
  margin-right: 5px;
}

.btn.search {
  background-color: #e76f51;
  color: white;
}
</style>
