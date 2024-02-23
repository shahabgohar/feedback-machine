<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { rules } from './rules'
import BaseInput from '@/components/atomic/BaseInput/index.vue'
import { useVuelidate } from '@vuelidate/core'
import { useAuthStore } from '../store'
import { LoginForm } from '../types'
import { ROUTE } from '@/router/constants'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'

const loginForm: Ref<LoginForm> = ref({
  email: '',
  password: ''
})

const v = useVuelidate(rules, loginForm)

const store = useAuthStore()
const router = useRouter()
const { login } = store
const toast = useToast()
const loginUser = async () => {
  v.value.$validate()
  if (v.value.$error) {
    return
  }
  try {
    await login(loginForm.value)
    toast.add({ severity: 'info', summary: 'Info', detail: 'Login Success', life: 3000 })
    router.replace({
      name: ROUTE.FEEDBACK.LIST
    })
  } catch (error) {}
}
</script>
<template>
  <main class="w-full flex justify-center items-center mt-[10vh] px-5">
    <div class="container flex flex-col items-center justify-center">
      <div class="max-w-[500px] w-full text-center flex flex-col gap-4">
        <div class="font-medium text-3xl text-white">Login</div>
        <BaseInput
          v-model="loginForm.email"
          :icon="'MdEmailOutlined'"
          :placeholder="'Email'"
          :type="'email'"
          :errors="v.email"
        ></BaseInput>
        <BaseInput
          v-model="loginForm.password"
          :icon="'MdEmailOutlined'"
          :placeholder="'Password'"
          :type="'password'"
          :errors="v.password"
        ></BaseInput>

        <Button class="w-full" @click="loginUser" label="Login"></Button>
      </div>
    </div>
  </main>
</template>
