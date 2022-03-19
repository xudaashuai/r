<template>
  <div v-if="link" class="container">
    <h1>修改短链</h1>
    <!-- config is passed down to descendant inputs: -->
    <FormKit
      v-model="link"
      :value="link"
      type="form"
      :config="{ validationVisibility: 'submit' }"
      @submit="submit"
    >
      <form-kit
        name="name"
        type="text"
        label="短链"
        :sections-schema="{
          prefix: buildPrefix(`${REDIRECTOR_DOMAIN}/`),
        }"
        disabled
      >
      </form-kit>
      <form-kit
        name="link"
        label="重定向链接"
        validation="required|length:2,100"
      />
      <form-kit name="description" type="text" label="短链描述" />
    </FormKit>
  </div>
</template>
<script setup lang="ts">
import { REDIRECTOR_DOMAIN } from '../../common/constant'
import { ref, onMounted } from 'vue'
import { updateLink, getLink } from '../utils/api'
import { buildPrefix } from '../utils/formkit'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { RedirectLink } from '../../common/model'
const link = ref<RedirectLink | undefined>()
const loading = ref(false)
const route = useRoute()
const router = useRouter()

const message = useMessage()
async function submit() {
  const res = await updateLink(link.value!)
  if (res.data.error) {
    message.error(res.data.error)
  } else {
    message.success('修改成功')
  }
  loading.value = false
  console.log(res.data)
}
onMounted(async () => {
  if (route.query.name) {
    const data = (await getLink({ name: route.query.name as string })).data
    if (data.error) {
      message.warning(`${route.query.name} 链接不存在，跳转至创建页面`)
      router.replace({
        path: '/add',
        query: { name: route.query.name },
      })
    } else {
      link.value = data.link
    }
  } else {
    router.replace({
      path: '/add',
    })
  }
})
</script>

<style>
.container .formkit-wrapper {
  max-width: 100%;
}

.container .formkit-label {
  font-size: 1.5rem;
}
[data-type='submit'] .formkit-input {
  width: 100% !important;
}
</style>
