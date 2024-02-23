import { required, helpers, minLength, email } from '@vuelidate/validators'
import { computed } from 'vue'

export const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Name is required.', required)
    },
    email: {
      required: helpers.withMessage('Email is required.', required),
      email: helpers.withMessage('Must be a valid email', email)
    },
    password: {
      required: helpers.withMessage('Password is required', required),
      minLength: helpers.withMessage('Password must consist of minimum 8 characters', minLength(8))
    },
    password_confirmation: {
      required: helpers.withMessage('Email is required.', required),
      sameAsPassword: {
        $validator: (value: any, siblings: any) => {
          return value === siblings.password
        },
        $message: 'Password must match'
      }
    }
  }
})
