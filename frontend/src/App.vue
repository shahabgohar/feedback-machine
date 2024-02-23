<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header/index.vue'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import { useGlobalStore } from '@/stores/global'
const globalStore = useGlobalStore()
const { fetchMaster } = globalStore
const main = async () => {
  await fetchMaster()
}

main()
</script>

<template>
  <Toast />
  <!-- <div
    class="card bg-red-400 fixed flex items-center justify-center top-0 left-0 w-full h-screen"
    style="z-index: 10000"
  >
    <ProgressSpinner />
  </div> -->
  <Header></Header>
  <RouterView />
</template>
