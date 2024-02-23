<script lang="ts" setup>
import DataTable, { type DataTableRowClickEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTE } from '@/router/constants'
import { useFeedbackStore } from '../store'
import { storeToRefs } from 'pinia'

const router = useRouter()

const feedbackStore = useFeedbackStore()
const { getAllFeedbacks } = feedbackStore
const { feedbackPagination, feedbacks } = storeToRefs(feedbackStore)
const main = async () => {
  await getFeedbacks()
}

const loading = ref(false)
const getFeedbacks = async () => {
  loading.value = true
  await getAllFeedbacks()
  loading.value = false
}

const goToFeedbackCreate = () => {
  router.push({
    name: ROUTE.FEEDBACK.CREATE
  })
}
const showFeedback = (event: DataTableRowClickEvent) => {
  console.log('click event ', event.data)
  router.push({
    name: ROUTE.FEEDBACK.SHOW,
    params: {
      id: event.data.id
    }
  })
}

main()
</script>

<template>
  <div class="h-screen w-full flex items-center justify-start mt-[50px] flex-col">
    <div class="card shadow-lg">
      <DataTable
        :value="feedbacks"
        :loading="loading"
        tableStyle="min-width: 50rem"
        :rows="10"
        paginator
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @row-click="showFeedback"
      >
        <template #header>
          <div class="flex flex-wrap align-items-center justify-between gap-2">
            <span class="text-xl text-900 font-bold">Feedbacks</span>
            <div class="flex justify-center items-center gap-2">
              <Button label="Create New" icon="pi pi-plus" raised @click="goToFeedbackCreate" />
              <Button icon="pi pi-refresh" @click="getFeedbacks" rounded raised />
            </div>
          </div>
        </template>
        <Column field="title" header="Title"></Column>
        <Column field="category" header="Category">
          <template #body="slotProps">
            {{ slotProps.data.category.name }}
          </template>
        </Column>
        <Column field="user" header="User">
          <template #body="slotProps">
            <div class="whitespace-nowrap truncate text-ellipsis max-w-[600px]">
              {{ slotProps.data.user.name }}
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
