<template>
  <div class="container">
    <div>
      <n-h1>Redirector</n-h1>
      <div>
        一个简简单单的短链小工具，可以用来当做云书签使用！
        <n-button type="info" @click="router.push('/add')">
          点击添加新的短链
        </n-button>
      </div>
    </div>
    <div class="section">
      <n-h2>目前已经存在的短链</n-h2>
      <n-input-group>
        <n-input v-model:value="keyword" type="text" />
        <n-button
          type="primary"
          ghost
          :disabled="!keyword || loading"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </n-button>
      </n-input-group>

      <n-list v-if="data" bordered>
        <template #header> 搜索到 {{ data.length }} 条结果</template>
        <n-list-item v-for="item in data" :key="item.name">
          <template #suffix>
            <n-space>
              <n-button @click="router.push(`/add?edit=true&name=${item.name}`)"
                >编辑</n-button
              >
              <n-button type="error" @click="onDelete(item.name)"
                >删除</n-button
              >
            </n-space>
          </template>
          <n-thing :title="item.name" :description="item.description">
            {{ item.link }}
          </n-thing>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {
  NButton,
  NH1,
  NH2,
  NInput,
  NInputGroup,
  NList,
  NListItem,
  NThing,
  NSpace,
  useMessage,
} from 'naive-ui'
import { useRouter } from 'vue-router'
import { deleteLink, search } from '../utils/api'
import { RedirectLink } from '../../common/model'
const router = useRouter()
let keyword = ref('')
let loading = ref(false)
let data = ref<RedirectLink[] | undefined>(undefined)
const message = useMessage()
async function onSearch() {
  loading.value = true
  data.value = (await search({ keyword: keyword.value })).data
  loading.value = false
  console.log(data.value)
}

async function onDelete(name: string) {
  let data = (await deleteLink(name)).data
  console.log(data)
  message.success('删除成功！')
  await onSearch()
}
</script>

<style scoped>
.container {
  margin-top: 4rem;
}

.section {
  margin-top: 4rem;
}
</style>
