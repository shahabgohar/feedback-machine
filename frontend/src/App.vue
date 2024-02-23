<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header/index.vue'
import Toast from 'primevue/toast'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
const globalStore = useGlobalStore()
const { fetchMaster } = globalStore
const { requestProcessingFlg } = storeToRefs(globalStore)
const main = async () => {
  await fetchMaster()
}

main()
</script>

<template>
  <Toast />
  <template v-if="requestProcessingFlg">
    <div
      class="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-white"
      style="opacity: 0.5"
    ></div>
    <div
      class="absolute left-0 top-0 flex h-full w-full items-center justify-center"
      style="z-index: 21"
    >
      <span class="loading bg-surface-500 loading-spinner w-[100px]"></span>
    </div>
  </template>
  <Header></Header>
  <RouterView />
</template>
