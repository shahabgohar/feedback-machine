<script lang="ts" setup>
import { computed } from 'vue'

enum InputType {
  email = 'email',
  text = 'text'
}
interface Props {
  type?: InputType
  modelValue: any
  icon?: string
  placeholder: string
  errors?: any
}

interface Emit {
  (e: 'update:model-value', value: any): void
}

const props = withDefaults(defineProps<Props>(), {
  type: InputType.text,
  icon: ''
})
const emit = defineEmits<Emit>()
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue: any) {
    emit('update:model-value', newValue)
  }
})
</script>
<template>
  <div class="">
    <label
      class="input input-bordered flex items-center gap-2"
      :class="{
        ' input-error': props.errors?.$errors.length
      }"
    >
      <slot name="icon">
        <v-icon v-if="props.icon" :name="props.icon"></v-icon>
      </slot>

      <input
        v-model="modelValue"
        :type="props.type"
        class="grow"
        :placeholder="props.placeholder"
      />
    </label>
    <template v-if="props.errors?.$errors">
      <span
        class="pl-1 w-full flex justify-start text-sm text-red-500"
        v-for="(error, index) in props.errors.$errors"
        >{{ error.$message }}</span
      >
    </template>
  </div>
</template>
