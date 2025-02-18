<template>
    <div>
      <h1>트리 컴포넌트 테스트</h1>
      <TreeView
        class="tree"
        :model="treeData"
        :addChild="addChildToTreeData"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import TreeView from '@/components/tree/TreeView.vue';
  
  // 트리 데이터를 설정
  const treeData = ref({
    name: "트리",
    children: [
      { name: "hello" },
      { name: "world" },
      {
        name: "자식 폴더",
        children: [
          {
            name: "child folder",
            children: [{ name: "hello" }, { name: "world" }],
          },
          { name: "hello" },
          { name: "world" },
          {
            name: "child folder",
            children: [{ name: "hello" }, { name: "world" }],
          },
        ],
      },
    ],
  });
  

  </script>
  
  <style scoped>
  .tree {
    margin-left: 20px;
  }
  
  h1 {
    text-align: center;
    font-size: 24px;
  }
  </style>
  