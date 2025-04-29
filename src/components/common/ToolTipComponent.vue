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

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  min-width: 120px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgb(var(--v-theme-primary)) transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>

