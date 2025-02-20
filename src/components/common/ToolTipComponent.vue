<template>
  <v-app>
    <v-container>
      <v-tooltip :text= toolTipText>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">마우스를 올려보세요</v-btn>
        </template>
      </v-tooltip>
    </v-container>
  </v-app>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    toolTipText: {
      type: String,
      required: true,
    },
  });

  console.log(props);
</script>


<style scoped>
.v-btn {
  margin-left: 10px;
  background-color: #EB6129;
  color: white;
}
</style>

