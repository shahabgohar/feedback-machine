<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useFeedbackStore } from '../store'
import { storeToRefs } from 'pinia'
import dayjs from '@/plugins/dayjs'
import Button from 'primevue/button'
import { ref } from 'vue'
import RichTextEditor from '@/components/atomic/RichTextEditor/index.vue'
import { rules } from './rules'
import useVuelidate from '@vuelidate/core'

const route = useRoute()
const router = useRouter()
const feedbackStore = useFeedbackStore()
const { fetchFeedback, addComment } = feedbackStore
const { feedback, users } = storeToRefs(feedbackStore)
const addNewFlg = ref(false)
const main = async () => {
  const id = route.params?.id
  if (id) {
    await fetchFeedback(id as string)
  } else {
    router.go(-1)
  }
}

const commentModel = ref({
  content: '',
  feedback_id: ''
})
const v = useVuelidate(rules, commentModel)
const storeComment = async () => {
  v.value.$validate()
  if (v.value.$error) {
    console.log('there is form error ', v.value.$error)
    return
  }
  commentModel.value.feedback_id = feedback.value.id!
  await addComment(commentModel.value)
  commentModel.value = {
    content: '',
    feedback_id: ''
  }
  addNewFlg.value = false
}

main()
</script>
<template>
  <div class="">
    <div class="container px-10 flex flex-col gap-5">
      <!-- title -->
      <div class="flex flex-col gap-4">
        <Button icon="pi pi-arrow-left" @click="router.go(-1)"></Button>
        <div class="flex justify-between">
          <div class="font-bold text-2xl">{{ feedback.title }}</div>
          <div class="">created at: {{ feedback.created_at! }}</div>
        </div>
        <div class="text-base" v-html="feedback.description"></div>
        <div class="">
          {{ typeof feedback.category === 'object' ? feedback.category.name : feedback.category }}
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <div class="w-full flex justify-end" v-if="!addNewFlg">
          <Button label="Add New Comment" icon="pi pi-plus" @click="addNewFlg = true"></Button>
        </div>
        <!-- add new comment section -->
        <div class="flex flex-col gap-3" v-if="addNewFlg">
          <RichTextEditor
            :at-values="feedbackStore.mentionUserList"
            v-model="commentModel.content"
          ></RichTextEditor>
          <div class="flex justify-end gap-5">
            <Button label="Cancel" icon="pi pi-times" @click="addNewFlg = false"></Button>
            <Button label="Submit" icon="pi pi-plus" @click="storeComment"></Button>
          </div>
        </div>
        <div
          class="border-2 border-black border-dashed p-2 ql-editor"
          v-for="(comment, index) in feedback.comments"
          :key="index"
        >
          <div class="" v-html="comment.content"></div>
          <div class="">created at: {{ comment.created_at }}</div>
          <div class="">commented by: {{ comment.user?.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
