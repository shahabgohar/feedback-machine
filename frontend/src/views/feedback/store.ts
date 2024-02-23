import { defineStore } from 'pinia'
import { ikonicApi } from '@/api'
import type { Feedback, FeedbackListResponse, FeedbackResponse, CommentCreateProps } from './types'
import type { Paginate, User } from '@/types'
export const useFeedbackStore = defineStore('feedback', {
  state: () => {
    return {
      feedbacks: [] as Array<Feedback>,
      feedbackPagination: {} as Paginate,
      feedback: {} as Feedback,
      users: [] as Array<User>
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async addFeedback(data: Feedback) {
      try {
        const response: any = await ikonicApi({
          url: '/api/feedbacks',
          method: 'post',
          data: data
        })

        console.log('response ', response)
      } catch {}
    },
    async getAllFeedbacks() {
      try {
        const response: FeedbackListResponse = await ikonicApi({
          url: '/api/feedbacks',
          method: 'get'
        })
        if (response.data) {
          this.feedbacks = response.data.feedbacks
          // this.feedbackPagination = response.data.paginate
        }
        console.log('response ', response)
      } catch {}
    },
    async fetchFeedback(id: string) {
      try {
        const response: FeedbackResponse = await ikonicApi({
          url: `/api/feedbacks/${id}`,
          method: 'get'
        })

        console.log('response ', response)
        if (response.data) {
          this.feedback = response.data.feedback
          this.users = response.data.users
        }
        console.log('response ', response)
      } catch {}
    },
    async addComment(data: CommentCreateProps) {
      try {
        const response: any = await ikonicApi({
          url: '/api/comments',
          method: 'post',
          data: data
        })
        if (response.data.comment) {
          this.feedback.comments?.unshift(response.data.comment)
        }
        console.log('response comment creation ', response)
        // if (response.data) {
        //   this.feedbacks = response.data.feedbacks
        //   this.feedbackPagination = response.data.paginate
        // }
        console.log('response ', response)
      } catch {}
    }
  },
  getters: {
    mentionUserList: (state) => {
      return state.users.map((item) => {
        return {
          id: item.id,
          value: item.name
        }
      })
    }
  }
})
