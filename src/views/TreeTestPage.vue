<template>
  <!-- 페이지 헤더 -->
  <v-container class="page-header">
    <h1>트리뷰 컴포넌트를 테스트하는 페이지</h1>
  </v-container>
 
  <v-container class="box">
    <TreeView
      :treeDataResponse="treeDataResponse"
    />
  </v-container>
</template>


<script setup>

import { ref } from 'vue';
import TreeView from '@/components/tree/TreeView.vue';

const treeDataResponse = ref([
  {
    id: '1',
    name: '가',
    children: [
      { id: 2, name: '가로수길'},
      { id: 3, name: '가로등'},
      { id: 4, name: '가위'}
    ]
  },

  {
    id: '5',
    name: '나',
    children: [
      { id: 6, name: '나의 아저씨'},
      { id: 7, name: '나나'},
    ]
  }
]);
</script>