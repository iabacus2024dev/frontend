<template>
    <v-treeview :items="items" item-title="name" item-children="children"></v-treeview>
</template>


<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    treeDataResponse: {
        type: Array,
        default: () => []
    }
});

const items = computed(() => {
    return props.treeDataResponse;
});

</script>