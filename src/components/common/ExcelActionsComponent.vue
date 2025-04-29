<template>
  <v-card class="mt-5" variant="flat" elevation="0">
    <!-- 엑셀 다운로드 버튼 -->
    <v-btn
      class="mr-3"
      @click="emitDownload"
      prepend-icon="mdi-microsoft-excel"
      color="primary"
      elevation="1"
    >
      엑셀 다운로드
    </v-btn>

    <!-- 엑셀 샘플 다운로드 버튼 -->
    <v-btn
      v-if="showButton"
      class="mr-3"
      @click="emitDownloadSample"
      prepend-icon="mdi-microsoft-excel"
      color="primary"
      elevation="1"
    >
      엑셀 샘플 다운로드
    </v-btn>

    <!-- 엑셀 업로드 버튼 -->
    <v-btn v-if="btnUpVisible" @click="openDialog" prepend-icon="mdi-microsoft-excel" color="primary" elevation="1">
      엑셀 업로드
    </v-btn>
  </v-card>

  <!-- 업로드 팝업 -->
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title>엑셀 파일 업로드</v-card-title>
      <v-card-text>
        <v-file-upload
          v-model="file"
          accept=".xlsx, .xls"
          label="엑셀 파일 선택"
          title="파일을 여기에 끌어 놓으세요"
          divider-text="또는"
          browse-text="파일 선택"
          clearable
        ></v-file-upload>
      </v-card-text>
      <v-card-actions>
        <v-btn class="confirm-btn" prepend-icon="mdi-upload" @click="emitUpload"> 업로드 </v-btn>
        <v-btn class="cancel-btn" text="취소" @click="closeDialog"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {defineEmits, defineProps, defineModel} from 'vue'

const emits = defineEmits(['download', 'upload', 'downloadSample'])
const props = defineProps({
  showButton: {
    type: Boolean,
    default: true, // 기본은 버튼을 보이도록
  },
  btnUpVisible:{
    type: Boolean,
    default: true, // 기본은 버튼을 보이도록
  }
})
const file = defineModel('file')
const dialog = defineModel('dialog')

// 이벤트 핸들러
const emitDownload = () => emits('download')
const emitUpload = () => emits('upload')
const emitDownloadSample = () => emits('downloadSample')

const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  file.value = null
}
</script>

<style scoped>
.confirm-btn {
  background-color: #eb6129;
  color: white;
}

.cancel-btn {
  background-color: lightgray;
  color: white;
}

.excel-actions {
  margin-bottom: 16px;
}

.dialog-header {
  background-color: rgb(var(--v-theme-primary));
  color: white;
  padding: 16px;
}
</style>
