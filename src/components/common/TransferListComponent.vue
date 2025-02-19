<template>
<v-card>
  <!-- 헤더 -->
  <v-toolbar class="toolbar-header">
    <v-toolbar-title>조직원 선택</v-toolbar-title>
  </v-toolbar>

  <!-- 트랜스퍼 리스트 -->
  <v-row>

    <!-- 왼쪽 -->
    <v-col cols="5" class="left">
      <!-- 검색 바 -->
      <v-text-field
        class="search-bar"
        v-model="search"
        label="조직원을 검색하세요."
        variant="outlined"
        density="compact" />

      <!-- 트리 뷰 -->
      <v-treeview
        v-model:selected="tree"
        :items="items"
        :load-children="load"
        item-title="name"
        item-value="id"
        select-strategy="classic"
        return-object
        selectable
        :search="search"
        density="compact" />
    </v-col>

    <v-divider :vertical="$vuetify.display.mdAndUp"/>

    <!-- 오른쪽 -->
    <v-col class="right">

        <!-- 헤더 -->
        <div class="selected-item-header">
          선택 ({{ selectedCount }} / {{ totalCount }})
        </div>

        <v-divider />

        <!-- 선택 칩 -->
        <div class="chip-wrapper">
          <span
            v-if="tree.length === 0"
            key="title">
            선택된 조직원이 없습니다.
          </span>

          <v-chip
            v-for="(selection, i) in tree"
            :key="i"
            :text="selection.name"
            class="ma-1"
            color="grey"
            size="small">
          </v-chip>
        </div>
    </v-col>
  </v-row>

  <v-divider />

  <!-- 버튼 -->
  <v-card-actions>
    <v-btn
      text="초기화"
      variant="text"
      @click="tree = []"
      class="reset-btn">
    </v-btn>
    <v-btn
      text="적용"
      class="save-btn">
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { defineProps } from 'vue';

const props = defineProps({
  rawDataProps: Object,
  test: Array,
})

const tree = ref([])
const search = ref(null)

/* 실제로는 조직원들 데이터 가져오는 api 통신해야됨 */
const rawData = ref(
{
  "통신사업본부": {
    "통신이행담당":  {
      "가입정보팀": ["양정호 팀장", "김봉진 수석"],
      "고갹정보팀": ["김정옥 팀장", "김은미 책임"],
      "빌링시스템팀": ["최경묵 팀장", "김현우 수석"],
    },
    "경영빌림당당":{
      "경영플랫폼팀": ["이용설 팀장", "지정현 책임"],
      "CRM팀": ["김태종 팀장", "김도연 책임"],
    }
  },
  "미래사업본부": {
    "전략사업담당":  {
      "컨버저스사업팀": ["채은희 팀장", "나성연 책임"],
      "핀테크사업팀": ["고영석 팀장", "김동수 책임"],
    },
    "AI/DATA사업담당":{
      "Data플랫폼사업팀": ["조창원 팀장", "최정웅 수석"],
      "지능플랫폼사업팀": ["금정우 팀장", "김도연 책임"],
    }
  },
});

/* 리스트를 트리뷰 구조로 바꾸는 함수 */
const transformToTree = (data, parentId = 1) => {
  let idCounter = parentId;
  function traverse(obj, name) {
    const node = { id: idCounter++, name, children: [] };
    if (Array.isArray(obj)) {
      node.children = obj.map(item =>
        typeof item === "string" ? { id: idCounter++, name: item } : traverse(item, Object.keys(item)[0])
      );
    } else if (typeof obj === "object") {
      for (const key in obj) {
        node.children.push(traverse(obj[key], key));
      }
    }
    return node;
  }
  return Object.keys(data).map(key => traverse(data[key], key));
}

onMounted(() => {
  items.value = transformToTree(rawData.value);
  console.log(props.test);
});


const items = ref([]);

const selectedCount = computed(() => tree.value.length);
const totalCount = 200;

function load() {
  return items.value[0]
}
</script>

<style scoped>
.v-card {
  width: 800px;
  height: 550px;
  display: flex;
  flex-direction: column;
}

/* 헤더 */
.toolbar-header {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #EB6129;
}

.toolbar-header .v-toolbar-title {
  font-size: 20px;
  color: white;
}

/* 메인 (왼쪽) */
.v-row {
  padding: 0;
  margin: 0;
}

.v-col.left {
  padding: 15px;
  margin: 0;
}

.v-col.right {
  padding: 0px;
  margin: 0px;
}

.search-bar {
  width: 100%;
  height: 40px;
}

.v-treeview {
  margin-top: 15px;
  height: 360px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* 메인 (오른쪽) */
.selected-item-header {
  text-align: end;
  color: lightgrey;
  padding: 10px;
}

.chip-wrapper {
  padding: 10px 20px;
}

.chip-wrapper span {
  color: lightgray;
}

/* 버튼 */
.v-card-actions {
  height: 40px;
  display: flex;
  justify-content: end;
}

.v-card-actions .v-btn {
  height: 30px;
}

.save-btn {
  background-color: #EB6129;
  color: white;
}

.reset-btn {
  background-color: lightgrey;
}

</style>
