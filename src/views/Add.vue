<template>
  <div class="container">
    <h1>添加新的链接</h1>
    <div class="form-group">
      <label for="name" class="required">短链</label>
      <div v-if="nameErrorMsg" class="invalid-feedback">
        {{ nameErrorMsg }}
      </div>
      <n-input-group>
        <n-input-group-label>{{ REDIRECTOR_DOMAIN + '/' }}</n-input-group-label>
        <n-input v-model:value="name" type="text" />
      </n-input-group>
    </div>
    <div class="form-group">
      <label for="link" class="required">重定向链接</label>
      <div v-if="linkErrorMsg" class="invalid-feedback">
        {{ linkErrorMsg }}
      </div>
      <div class="input-group">
        <input id="link" v-model="link" type="text" class="form-control" />
      </div>
    </div>

    <div class="form-group">
      <label for="">短链描述</label>
      <textarea
        id="description"
        v-model="description"
        class="form-control"
        placeholder=""
      ></textarea>
    </div>

    <!-- Submit button -->
    <n-button
      :disabled="(!!nameErrorMsg && !!linkErrorMsg) || loading"
      block
      type="info"
      size="large"
      @click="submit"
    >
      创建！
    </n-button>
  </div>
</template>
<script setup lang="ts">
import { REDIRECTOR_DOMAIN } from '../../common/constant'
import { ref, computed } from 'vue'
import { addLink } from '../utils/api'
import {
  NButton,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  useMessage,
} from 'naive-ui'
const name = ref('')
const link = ref('')
const description = ref('')
const loading = ref(false)

const nameErrorMsg = computed(() => {
  return /^[a-zA-Z0-9\-_]{1,100}$/g.test(name.value)
    ? ''
    : '短链只能包含大小写字母数字以及-和_符号，并且长度不能大于100'
})

const linkErrorMsg = computed(() => {
  return /^.{1,100}$/g.test(link.value) ? '' : '链接不合法'
})

const message = useMessage()
async function submit() {
  if (nameErrorMsg.value) {
    return
  }
  loading.value = true
  const res = await addLink({
    name: name.value,
    link: link.value,
    description: description.value,
  })
  if (res.data.error) {
    message.error(res.data.error)
  } else {
    message.success('创建成功')
  }
  loading.value = false
  console.log(res.data)
}
</script>
