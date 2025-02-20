<template>
  <div>
    <v-btn @click="openDialog">
      협력사 삭제
    </v-btn>

    <!-- 모달 컴포넌트 -->
    <ModalDialog
      ref="modal"
      :title="modalTitle"
      :text="modalText"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>

</template>

<script setup>
import { ref } from 'vue';
import ModalDialog from '@/components/common/ModalPopupComponent.vue'; // 모달 컴포넌트 가져오기

const modal = ref(null)
const modalTitle = ref("협력사 삭제")
const modalText = ref("....삭제 하겠습니까?")

// 모달 열기
const openDialog = () => {
  modal.value?.open()
}

// 확인 버튼 클릭 시
const handleConfirm = () => {
  console.log('확인 버튼 클릭됨!');
  console.log('사용하는 페이지에서 저장,삭제등등 기능 구현하면 됨');
}

// 취소 버튼 클릭 시
const handleCancel = () => {
  console.log('취소 버튼 클릭됨!')
}
</script>

<style scoped>

.v-btn {
  margin-left: 10px;
  background-color: #EB6129; /* todo: 공통적으로 쓰는 색 같은 것은 상수화 */
  color: white;
}

</style>
