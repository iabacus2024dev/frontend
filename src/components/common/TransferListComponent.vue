<template>
  <v-card>
    <v-toolbar>
      <template v-slot:prepend>
        <v-toolbar-title>조직원 선택</v-toolbar-title>
      </template>
    </v-toolbar>

    <v-text-field
      v-model="search"
      clear-icon="mdi-close-circle-outline"
      label="조직원을 검색하세요."
      variant="solo-filled">
    </v-text-field>

    <v-row>
      <v-col>
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
import { ref, watch, computed } from 'vue'

const tree = ref([])
const search = ref(null)

// 하드코딩된 items 데이터
const items = ref([
  {
    id: 1,
    name: '통신사업본부',
    children: [
      {
        id: 2,
        name: '통신이행담당',
        children: [
          {
            id: 2,
            name: '가입정보팀',
            children: [
              {
                id: 3,
                name: '양정호 팀장',
              },
              {
                id: 4,
                name: '김봉진 수석',
              },
              {
                id: 3,
                name: '김범석 책임',
              },
              {
                id: 4,
                name: '이한림 책임',
              }
            ]
          },
          {
            id: 3,
            name: '고객정보팀',
            children: [
              {
                id: 3,
                name: '김정옥 팀장',
              },
              {
                id: 4,
                name: '김은미 책임',
              },
              {
                id: 3,
                name: '김학희 책임',
              },
              {
                id: 4,
                name: '류광열 책임',
              },
              {
                id: 4,
                name: '박상철 사원',
              },
              {
                id: 4,
                name: '임세인 사원',
              }
            ]
          },
          {
            id: 4,
            name: '빌링시스템팀',
            children: [
              {
                id: 3,
                name: '최경묵 팀장',
              },
              {
                id: 4,
                name: '김현우 수석',
              },
              {
                id: 3,
                name: '박준성 수석',
              },
              {
                id: 4,
                name: '김경혜 사원',
              }
            ]
          },
          {
            id: 5,
            name: '영업정보팀',
            children: [
              {
                id: 3,
                name: '조용성 팀장',
              },
              {
                id: 4,
                name: '박상백 수석',
              },
              {
                id: 3,
                name: '김미라 책임',
              },
              {
                id: 4,
                name: '김승현 책임',
              }
            ]
          },
          {
            id: 6,
            name: '기반기술팀',
            children: [
              {
                id: 3,
                name: '김서호 팀장',
              },
              {
                id: 4,
                name: '이진욱 책임',
              },
              {
                id: 3,
                name: '최원석 책임',
              },
              {
                id: 4,
                name: '송수현 선임',
              }
            ]
          }
        ],
      },
      {
        id: 3,
        name: '경영빌링담당',
        children: [
          {
            id: 0,
            name: '경영플랫폼팀',
            children: [
              {
                id: 0,
                name: '이용설 팀장'
              },
              {
                id: 0,
                name: '지정현 책임'
              },
              {
                id: 0,
                name: '서효원 선임'
              }
            ]
          },
          {
            id: 0,
            name: 'CRM팀',
            children: [
              {
                id: 0,
                name: '김태종 팀장'
              },
              {
                id: 0,
                name: '김도연 책임'
              },
              {
                id: 0,
                name: '최아연 선임'
              }
            ]
          },
          {
            id: 0,
            name: '경영정보팀',
            children: [
              {
                id: 0,
                name: '허준영 이사'
              },
              {
                id: 0,
                name: '강국구 책임'
              },
              {
                id: 0,
                name: '김상구 선임'
              }
            ]
          },
          {
            id: 0,
            name: 'NMS사업팀',
            children: [
              {
                id: 0,
                name: '박준규 팀장'
              },
              {
                id: 0,
                name: '노재덕 책임'
              },
              {
                id: 0,
                name: '김종대 선임'
              }
            ]
          },
          {
            id: 0,
            name: '융합데이터분석팀',
            children: [
              {
                id: 0,
                name: '최봉준 팀장'
              },
              {
                id: 0,
                name: '이동욱 사원'
              },
              {
                id: 0,
                name: '이지수 사원'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1,
    name: '미래사업본부',
    children: [
      {
        id: 1,
        name: '전략사업담당',
        children: [
          {
            id: 1,
            name: '컨버저스사업팀',
            children: [
              {
                id: 1,
                name: '채은희 팀장',
              }
            ]
          }
        ]
      },
      {
        id: 1,
        name: 'AI/Data 사업담당',
        children: [
          {
            id: 1,
            name: '핀테크사업팀',
            children: [
              {
                id: 1,
                name: '고영석 팀장',
              }
            ]
          }
        ]
      },
      {
        id: 1,
        name: 'UX STUDIO TF',
        children: [
          {
            id: 1,
            name: 'IOT 융합사업팀',
            children: [
              {
                id: 1,
                name: '권영호 팀장',
              }
            ]
          }
        ]
      }
    ]
  }
])

const selectedCount = computed(() => tree.value.length);
const totalCount = 200;

// load 함수를 호출하면 하드코딩된 데이터를 반환합니다.
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
