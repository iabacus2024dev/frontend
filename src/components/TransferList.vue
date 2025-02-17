<template>
  <!-- Vuetify에서 제공하는 트리뷰로 이 기능을 충분히 대체할 수 있을 것 같음  -->
  <v-container class="transfer-list-component">
    <!-- Left List -->
    <div class="transfer-list-div">
      <h2>왼쪽 리스트 (총 개수: {{ leftListCount }} | 선택된 개수: {{ selectedLeft.length }})</h2>
      <v-card class="list-card">
        <v-checkbox
          v-model="selectAllLeft"
          label="전체 선택"
          @change="toggleSelectAllLeft"
        />
        <v-list>
          <v-list-item v-for="item in sortedLeftList" :key="item.value">
            <template v-slot:prepend>
              <v-checkbox v-model="selectedLeft" :value="item.value" />
            </template>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <!-- 이동 버튼 -->
    <div class="transfer-list-btns">
      <v-btn
        @click="moveSelectedRight"
        :disabled="selectedLeft.length === 0">
        ->
      </v-btn>
      <v-btn
        @click="moveSelectedLeft"
        :disabled="selectedRight.length === 0">
        <-
      </v-btn>
    </div>

    <!-- Right List -->
    <div class="transfer-list-div">
      <h2>오른쪽 리스트 (총 개수: {{ rightListCount }} | 선택된 개수: {{ selectedRight.length }})</h2>
      <v-card class="list-card">
        <v-checkbox
          v-model="selectAllRight"
          label="전체 선택"
          @change="toggleSelectAllRight"
        />
        <v-list>
          <v-list-item v-for="item in sortedRightList" :key="item.value">
            <template v-slot:prepend>
              <v-checkbox v-model="selectedRight" :value="item.value" />
            </template>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

// Props from parent component
const props = defineProps({
  leftList: {
    type: Array,
    required: true,
  },
  rightList: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['updateLeftList', 'updateRightList']);

const selectedLeft = ref([]);
const selectedRight = ref([]);
const selectAllLeft = ref(false);
const selectAllRight = ref(false);

// Computed Properties for Sorted Lists
const sortedLeftList = computed(() => {
  return props.leftList.sort((a, b) => a.value - b.value);
});

const sortedRightList = computed(() => {
  return props.rightList.sort((a, b) => a.value - b.value);
});

// Computed Properties for Count
const leftListCount = computed(() => props.leftList.length);
const rightListCount = computed(() => props.rightList.length);

// Toggle Select All for Left List
function toggleSelectAllLeft() {
  if (selectAllLeft.value) {
    selectedLeft.value = props.leftList.map(item => item.value);
  } else {
    selectedLeft.value = [];
  }
}

// Toggle Select All for Right List
function toggleSelectAllRight() {
  if (selectAllRight.value) {
    selectedRight.value = props.rightList.map(item => item.value);
  } else {
    selectedRight.value = [];
  }
}

function moveSelectedRight() {
  const selectedItems = props.leftList.filter(item => selectedLeft.value.includes(item.value));

  // Emit updated leftList and rightList
  emit('updateLeftList', props.leftList.filter(item => !selectedLeft.value.includes(item.value)));
  emit('updateRightList', [...props.rightList, ...selectedItems]);

  selectedLeft.value = [];
  selectAllLeft.value = false;
}

function moveSelectedLeft() {
  const selectedItems = props.rightList.filter(item => selectedRight.value.includes(item.value));

  // Emit updated rightList and leftList
  emit('updateLeftList', [...props.leftList, ...selectedItems]);
  emit('updateRightList', props.rightList.filter(item => !selectedRight.value.includes(item.value)));

  selectedRight.value = [];
  selectAllRight.value = false;
}
</script>

<style scoped>
.transfer-list-component {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.transfer-list-div {
  width: 40%;
}

.transfer-list-btns {
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.list-card {
  width: 100%;
  height: 500px;
  overflow-y: auto;
}

.v-btn {
  background-color: #EB6129; /* todo: 공통적으로 쓰는 색 같은 것은 상수화 */
  color: white;
}

</style>
