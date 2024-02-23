<script lang="ts" setup>
import { ref } from 'vue'
import { rules } from './rules'
import BaseInput from '@/components/atomic/BaseInput/index.vue'
import { useVuelidate } from '@vuelidate/core'
import { useAuthStore } from '../store.ts'
import { useRouter } from 'vue-router'
import { ROUTE } from '@/router/constants'
import Button from 'primevue/button'

const signupForm = ref({
  email: '',
  password: '',
  password_confirmation: '',
  name: ''
})

const v = useVuelidate(rules, signupForm)

const store = useAuthStore()
const { signup } = store
const router = useRouter()
const signinUser = async () => {
  v.value.$validate()
  if (v.value.$error) {
    console.log('there is form error ', v.value.$error)
    return
  }
  await signup(signupForm.value)
  router.push({
    name: ROUTE.LOGIN
  })
}
</script>
<template>
  <main class="w-full flex justify-center items-center mt-[10vh] px-5">
    <div class="container flex flex-col items-center justify-center">
      <div class="max-w-[500px] w-full text-center items-center justify-center flex flex-col gap-4">
        <div class="font-medium text-3xl text-white">Signup</div>
        <BaseInput
          v-model="signupForm.name"
          :icon="'MdEmailOutlined'"
          :placeholder="'Name'"
          :type="'text'"
          :errors="v.name"
        ></BaseInput>
        <BaseInput
          v-model="signupForm.email"
          :icon="'MdEmailOutlined'"
          :placeholder="'Email'"
          :type="'email'"
          :errors="v.email"
        ></BaseInput>
        <BaseInput
          v-model="signupForm.password"
          :icon="'MdEmailOutlined'"
          :placeholder="'Password'"
          :type="'password'"
          :errors="v.password"
        ></BaseInput>
        <BaseInput
          v-model="signupForm.password_confirmation"
          :icon="'MdEmailOutlined'"
          :placeholder="'Confirm Password'"
          :type="'password'"
          :errors="v.password_confirmation"
        ></BaseInput>

        <Button class="w-full" label="Signup" @click="signinUser"></Button>
      </div>
    </div>
  </main>
</template>
