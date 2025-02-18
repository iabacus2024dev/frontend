<script setup>
import { ref } from "vue";
import TreeView from "@/components/tree/TreeView.vue";

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

function addChildToTreeData(model) {
  model.children.push({ name: "새로운 폴더" });
}
</script>

<template>
  <ul>
    <TreeView
      class="item"
      :model="treeData"
      :addChild="addChildToTreeData"
    ></TreeView>
  </ul>
</template>

<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>