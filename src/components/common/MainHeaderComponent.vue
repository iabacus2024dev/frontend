<template>
  <v-breadcrumbs
    class="pa-0 mb-4"
    :items="breadcrumbs"
    divider=">"
  >
    <template #item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        :disabled="item.disabled"
        :exact="item.exact"
      >
        {{ item.title }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
  <h1 class="text-h4 font-weight-bold"> {{ title }} </h1>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let breadcrumbs = computed(() => {
  return router.currentRoute.value.meta.breadcrumbs || [];
});

const title = computed(() => {
  return router.currentRoute.value.meta.title || 'Default Title';
});
</script>

<style scoped>

</style>
