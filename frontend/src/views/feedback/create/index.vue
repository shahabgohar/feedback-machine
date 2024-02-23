<script lang="ts" setup>
import { Ref, computed, ref } from 'vue'
import { rules } from './rules'
import BaseInput from '@/components/atomic/BaseInput/index.vue'
import SelectOption from '@/components/atomic/selectOption/index.vue'
import { useVuelidate } from '@vuelidate/core'
import { useFeedbackStore } from '../store.ts'
import { Feedback, FeedbackCategory } from '../types'
import RichTextEditor from '@/components/atomic/RichTextEditor/index.vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const categoryList = [
  {
    label: 'Bug Report',
    value: FeedbackCategory.BUG_REPORT
  },
  {
    label: 'Feature Request',
    value: FeedbackCategory.FEATURE_REQUEST
  },
  {
    label: 'Improvement',
    value: FeedbackCategory.IMPROVEMENT
  }
]
const feedbackForm: Ref<Feedback> = ref({
  category: FeedbackCategory.BUG_REPORT,
  title: '',
  description: ''
})

const selectOptionComputed = computed({
  get() {
    return categoryList.find((item) => item.value === feedbackForm.value.category)
  },
  set(newValue: any) {
    feedbackForm.value.category = categoryList.find((item) => newValue.value === item.value)!.value
  }
})

const v = useVuelidate(rules, feedbackForm)
const toast = useToast()
const store = useFeedbackStore()
const { addFeedback } = store
const router = useRouter()
const submitFeedback = async () => {
  v.value.$validate()
  if (v.value.$error) {
    console.log('there is form error ', v.value.$error)
    return
  }
  try {
    await addFeedback(feedbackForm.value)
    toast.add({ severity: 'success', summary: 'Info', detail: 'Feedback Created', life: 3000 })
    router.go(-1)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Info',
      detail: 'Something Wrong happened',
      life: 3000
    })
  }
}
</script>
<template>
  <main class="w-full flex justify-center items-center h-screen">
    <div class="container flex flex-col items-center justify-center">
      <div class="max-w-[500px] w-full text-center flex flex-col gap-4">
        <div class="font-medium text-3xl">Feedback Submission</div>
        <BaseInput
          v-model="feedbackForm.title"
          :icon="'MdEmailOutlined'"
          :placeholder="'Title'"
          :type="'text'"
          :errors="v.title"
        ></BaseInput>
        <RichTextEditor
          v-model="feedbackForm.description"
          :icon="'MdEmailOutlined'"
          :placeholder="'Description'"
          :type="'text'"
          :errors="v.description"
        ></RichTextEditor>
        <SelectOption
          v-model="selectOptionComputed"
          :errors="v.category"
          :options="categoryList"
          :optionLabel="'label'"
          :optionValue="'value'"
        ></SelectOption>

        <Button class="btn btn-primary" type="submit" @click="submitFeedback">
          Submit Feedback
        </Button>
        <Button label="Cancel" @click="router.go(-1)"></Button>
      </div>
    </div>
  </main>
</template>
