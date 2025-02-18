<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  model: Object,
  addChild: Function,
});

const isOpen = ref(false);

const isFolder = computed(() => {
  //자식이 존재한다면 isFolder 를 + 로
  return props.model.children && props.model.children.length;
});

function toggle() {
  isOpen.value = !isOpen.value;
}

function addChild() {
  props.addChild(props.model);
}

// console.log("isFolder : ", isFolder);
</script>

<template>
  <li>
    <div :class="{ bold: isFolder }" @click="toggle">
      {{ model.name }}
      <span v-if="isFolder"> [{{ isOpen ? "-" : "+" }}] </span>
    </div>
    <ul v-if="isFolder" v-show="isOpen">
      <TreeView
        v-for="childModel in model.children"
        :model="childModel"
        :key="childModel.name"
        :addChild="props.addChild"
      ></TreeView>
    </ul>
  </li>
</template>
<style></style>