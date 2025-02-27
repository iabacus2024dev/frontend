<template>

<v-container class="page-header">
  <h1>툴팁 컴포넌트를 테스트하는 페이지</h1>
</v-container>

<v-container>
  <ToolTipComponent
    :toolTipText="toolTipText"
  />
</v-container>

</template>

<script setup>
import ToolTipComponent from '@/components/common/ToolTipComponent.vue';

import { ref } from 'vue';

const toolTipText = ref('이 값은 변하는 값입니다.');

</script>

