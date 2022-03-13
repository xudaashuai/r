<template>
  <main>
    <n-config-provider>
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-config-provider>
  </main>
</template>
<script setup lang="ts">
import { NMessageProvider, NConfigProvider } from 'naive-ui'
</script>
<style></style>
