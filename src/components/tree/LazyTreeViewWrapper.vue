<template>
  <v-treeview
    :items="lazyItems"
    item-title="name"
    item-children="children"
    lazy
    :load-children="loadChildren"
    v-model:open="open"
  ></v-treeview>
</template>

<script setup>
import { ref, watch } from 'vue'

// 컴포넌트가 받을 원본 트리 데이터 (배열 또는 객체)
const props = defineProps({
  treeDataResponse: {
    type: [Array, Object],
    required: true,
  },
})

// v-treeview에서 열려있는 노드들을 관리하기 위한 배열
const open = ref([])

/**
 * transformDataLazy
 * - 최상위 노드만 변환하고, 하위 데이터는 rawChildren 속성에 저장
 * - 데이터가 배열인 경우와 객체인 경우를 모두 처리
 */
const transformDataLazy = (data) => {
  const transform = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map((item) => {
        if (typeof item === 'object' && item !== null) {
          let displayName = item.name || ''
          if (item.rank) {
            displayName += ` ${item.rank}`
          }
          // 하위 노드가 있다면 (예: members가 존재하고 길이가 0보다 크다면) rawChildren에 저장
          if (item.members && Array.isArray(item.members) && item.members.length > 0) {
            return {
              id: item.id,
              name: displayName,
              children: [],
              rawChildren: item.members,
            }
          }
          // 만약 하위 노드가 별도로 없다면 그냥 반환
          return { id: item.id, name: displayName }
        } else {
          // 문자열이나 숫자 등 단순 값일 경우
          return { name: obj }
        }
      })
    } else if (typeof obj === 'object' && obj !== null) {
      // 객체의 경우 key를 name으로, value를 rawChildren으로 처리
      return Object.entries(obj).map(([key, value]) => {
        return { name: key, children: [], rawChildren: value }
      })
    } else {
      return [{ name: obj }]
    }
  }
  return transform(data)
}

// lazyItems를 props.treeDataResponse에 따라 초기화
const lazyItems = ref(transformDataLazy(props.treeDataResponse))

// 만약 props.treeDataResponse가 변경된다면 lazyItems를 다시 계산
watch(
  () => props.treeDataResponse,
  (newVal) => {
    lazyItems.value = transformDataLazy(newVal)
  },
  { deep: true },
)

/**
 * loadChildren
 * - v-treeview의 lazy 옵션에 의해, 사용자가 특정 노드를 확장할 때 호출됩니다.
 * - 노드에 저장된 rawChildren을 실제 children으로 변환하여 할당합니다.
 */
const loadChildren = (node) => {
  return new Promise((resolve) => {
    if (node.rawChildren) {
      let children = []
      // rawChildren가 배열인 경우 처리
      if (Array.isArray(node.rawChildren)) {
        children = node.rawChildren.map((child) => {
          let displayName = child.name || ''
          if (child.rank) {
            displayName += ` ${child.rank}`
          }
          // 만약 child에 members가 있다면, 해당 데이터를 다시 lazy하게 저장
          if (child.members && Array.isArray(child.members) && child.members.length > 0) {
            return {
              id: child.id,
              name: displayName,
              children: [],
              rawChildren: child.members,
            }
          }
          return { id: child.id, name: displayName }
        })
      } else if (typeof node.rawChildren === 'object' && node.rawChildren !== null) {
        // rawChildren가 객체인 경우 key를 이용해 변환
        children = Object.entries(node.rawChildren).map(([key, value]) => {
          return { name: key, children: [], rawChildren: value }
        })
      }
      // children에 변환된 데이터를 할당하고, rawChildren은 더 이상 필요 없으므로 삭제
      node.children = children
      delete node.rawChildren
      resolve(children)
    } else {
      resolve([])
    }
  })
}
</script>
