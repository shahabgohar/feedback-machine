<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import { computed } from 'vue'

interface Props {
  modelValue: any
  errors?: any
  options: Array<any>
  optionLabel: string
  placeholder: string
  optionValue: string
}

interface Emit {
  (e: 'update:model-value', value: any): void
}
const emit = defineEmits<Emit>()
const props = defineProps<Props>()
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
  <div class="w-full">
    <Dropdown
      v-model="modelValue"
      :options="props.options"
      :option-label="props.optionLabel"
      :placeholder="props.placeholder"
      class="w-full ring-1"
    >
    </Dropdown>
    <template v-if="props.errors?.$errors">
      <span class="pl-1 text-sm text-red-500" v-for="(error, index) in props.errors.$errors">{{
        error.$message
      }}</span>
    </template>
  </div>
</template>
