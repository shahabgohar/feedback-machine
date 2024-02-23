import type { Paginate, User } from '@/types'

export interface Feedback {
  id?: string
  title: string
  description: string
  category:
    | FeedbackCategory
    | {
        id: string
        name: string
      }
  user?: User
  comments?: Array<Comment>
  created_at?: string
  updated_at?: string
}

export interface Comment {
  name: string
  date: string
  content: string
  created_at: string
  updated_at: string
  user?: User
}

export enum FeedbackCategory {
  BUG_REPORT = 1,
  FEATURE_REQUEST = 2,
  IMPROVEMENT = 3
}

export interface FeedbackListResponse {
  data: {
    feedbacks: Array<Feedback>
    paginate: Paginate
  }
}

export interface FeedbackResponse {
  data: {
    feedback: Feedback
    users: Array<User>
  }
}

export interface CommentCreateProps {
  content: string
  feedback_id: string
  mentioned_users: Array<string>
}
