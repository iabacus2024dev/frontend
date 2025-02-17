<template>
  <v-container>
    <v-row justify="end">
      <v-btn
          v-if="props.tableDataEvent.createData"
          variant="tonal"
          density="comfortable"
          prepend-icon="mdi-plus-circle"
          @click="handleCreateDataButtonClick"
      >
        등록
      </v-btn>
      <v-btn
        v-if="props.tableExcelEvent.excelUpload"
        variant="tonal"
        density="comfortable"
        @click="handleExcelUploadButtonClick"
      >
        엑셀 업로드
      </v-btn>
      <v-btn
        v-if="props.tableExcelEvent.excelDownload"
        variant="tonal"
        density="comfortable"
        @click="handleExcelDownloadButtonClick"
      >
        엑셀 다운로드
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  tableDataEvent: {
    type: Object,
    default: () => ({}),
  },
  tableExcelEvent: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits([
  'create-data-button-click',
  'excel-upload-button-click',
]);

/* 이벤트 핸들링 함수 */
const handleCreateDataButtonClick = () => {
  console.log('handleCreateDataButtonClick >>>', '데이터 등록 버튼 클릭!');
  emits('create-data-button-click');
};

const handleExcelUploadButtonClick = () => {
  console.log('handleExcelUploadButtonClick >>>', '엑셀 업로드 버튼 클릭!');
  emits('excel-upload-button-click')
};

const handleExcelDownloadButtonClick = () => {
  console.log('handleExcelDownloadButtonClick >>>', '엑셀 다운로드 버튼 클릭!');
  console.log('로직 >> ', 'todo: 팝업으로 의사 확인 후 이벤트 다운로드 유틸 함수 호출');
};


</script>

<style scoped>
.v-btn {
  margin-left: 10px;
  background-color: #EB6129; /* todo: 공통적으로 쓰는 색 같은 것은 상수화 */
  color: white;
}
</style>
