<template>
  <v-card>
    <v-toolbar>
      <template v-slot:prepend>
        <v-toolbar-title>조직원 선택</v-toolbar-title>
      </template>
    </v-toolbar>

    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          clear-icon="mdi-close-circle-outline"
          label="조직원을 검색하세요."
          variant="solo-filled">
        </v-text-field>
        <v-card-text>
          <v-treeview
            v-model:selected="tree"
            :items="items"
            :load-children="load"
            item-title="name"
            item-value="id"
            select-strategy="leaf"
            return-object
            selectable
            :search="search"
          ></v-treeview>
        </v-card-text>
      </v-col>

      <v-divider
        :vertical="$vuetify.display.mdAndUp"
        class="my-md-3">
      </v-divider>

      <v-col cols="12" md="6">
        <v-card-text>
          <div class="text-h6 font-weight-light text-grey pa-4 text-center">
            선택된 조직원: {{ selectedCount }} / 전체 조직원: {{ totalCount }}
          </div>
        </v-card-text>

        <v-card-text>
          <div
            v-if="tree.length === 0"
            key="title"
            class="text-h6 font-weight-light text-grey pa-4 text-center">
            선택된 조직원이 없습니다.
          </div>

          <v-scroll-x-transition group hide-on-leave>
            <v-chip
              v-for="(selection, i) in tree"
              :key="i"
              :text="selection.name"
              class="ma-1"
              color="grey"
              size="small">
            </v-chip>
          </v-scroll-x-transition>
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text="초기화" variant="text" @click="tree = []" class="reset-btn"></v-btn>
      <v-spacer></v-spacer>
      <v-btn
        append-icon="mdi-content-save"
        text="저장"
        class="save-btn">
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'

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
}
);

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
});


const items = ref([]);

const selectedCount = computed(() => tree.value.length);
const totalCount = 200;

function load() {
  return items.value[0]
}
</script>

<style scoped>
.v-toolbar {
  background-color: #EB6129;
  color: white;
}

.v-toolbar-title {
  padding: 0 10px;
}

.v-text-field {
  margin: 20px 20px 0px 20px;
}

.save-btn {
  background-color: #EB6129;
  color: white;
}

.reset-btn {
  background-color: rgb(241, 241, 241);
}
</style>
