<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@/assets/styles/quil.snow.css'
import mention from 'quill-mention'
import { Ref, computed, onMounted, ref } from 'vue'

interface Props {
  modelValue: any
  label?: string
  placeholder?: string
  errors?: Array<Record<string, any>>
  required?: boolean
  atValues?: Array<any>
}
interface Emit {
  (e: 'update:model-value', val: any): void
  (e: 'update:mentions', val: any): void
}
const props = withDefaults(defineProps<Props>(), {
  atValues: []
})
const emit = defineEmits<Emit>()

const val = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:model-value', newValue)
  }
})

const editorFocusedFlg = ref(false)
const quilEditorRef: Ref<InstanceType<typeof QuillEditor> | null> = ref(null)
const atValues = [
  { id: 1, value: 'Fredrik Sundqvist' },
  { id: 2, value: 'Patrik Sjölin' }
]
const mentionSetting = {
  allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  mentionDenotationChars: ['@'],
  source: function (searchTerm, renderList, mentionChar) {
    let values: any = []

    if (mentionChar === '@') {
      values = props.atValues
    }

    if (searchTerm.length === 0) {
      renderList(values, searchTerm)
    } else {
      const matches = []
      for (let i = 0; i < values.length; i++)
        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
          matches.push(values[i])
      renderList(matches, searchTerm)
    }
  }
}

const editorElementRef: Ref<HTMLElement | null> = ref(null)
const extractMentions = () => {
  if (!(props.atValues.length > 0) || !editorElementRef.value) {
    return
  }
  const mentionElements = editorElementRef.value.querySelectorAll('.mention')
  const items = [...mentionElements].map((element) => {
    return element.getAttribute('data-id')
  })
  console.log('emitting ', items)
  emit('update:mentions', items)
}
</script>

<template>
  <div class="form-control h-full">
    <label class="label" v-if="props.label">
      <span class="custom-label">
        {{ props.label }} <span v-if="props.required" class="text-red-600">*</span>
      </span>
    </label>
    <div
      class="editor overflow-y-scroll pb-1 pt-1"
      ref="editorElementRef"
      :class="{
        'focus-editor': editorFocusedFlg,
        'unfocus-editor input-border': !editorFocusedFlg,
        ' !border-red-500': props?.errors?.$invalid && props?.errors?.$dirty
      }"
    >
      <QuillEditor
        class=""
        style="min-height: 300px"
        theme="snow"
        :content-type="'html'"
        ref="quilEditorRef"
        :toolbar="[
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'], // toggled buttons
          ['link'], // image and link
          ['clean'] // remove formatting button
        ]"
        :modules="{
          name: 'mention',
          module: mention,
          options: mentionSetting
        }"
        :options="{
          placeholder: props.placeholder
        }"
        @update:content="extractMentions"
        v-model:content="val"
        @focus="editorFocusedFlg = true"
        @blur="editorFocusedFlg = false"
      />
    </div>
    <div
      class="mx-1 mt-2 w-full flex text-red-500 justify-start"
      v-if="props?.errors?.$invalid && props?.errors?.$dirty"
    >
      <span>
        <p v-for="(err, index) in props?.errors?.$errors" :key="index + 'err'" class="m-0">
          {{ err?.$message }}
        </p>
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.input-error {
  border: 1px solid var(--color-red) !important;
}
.unfocus-editor {
  border: 1px solid;
  resize: vertical;
  overflow: hidden;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgb(234, 234, 234);
}

.focus-editor {
  border: 2px solid;
  resize: vertical;
  overflow: hidden;
  border-radius: 10px;
  border-width: 1px;
}

:deep(.editor) {
  background-color: white;
  .mention {
    padding: 2px;
    background-color: chartreuse;
    font-weight: bold;
  }
  .ql-mention-list {
    background-color: white !important;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    box-shadow: -11px -1px 46px 0px rgba(0, 0, 0, 0.38);
    -webkit-box-shadow: -11px -1px 46px 0px rgba(0, 0, 0, 0.38);
    -moz-box-shadow: -11px -1px 46px 0px rgba(0, 0, 0, 0.38);
  }
  .ql-mention-list-item {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    cursor: pointer;
    &:hover {
      background-color: gray;
    }
  }

  .ql-editor.ql-blank {
    min-height: 300px;
  }
  .ql-editor {
    min-height: 300px;
  }
  .ql-editor p,
  .ql-editor ol,
  .ql-editor ul {
    color: black;
  }
  .ql-container {
    scrollbar-width: 0px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .ql-editor {
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
  .ql-toolbar.ql-snow {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid rgb(234, 234, 234);
  }
  .ql-container.ql-snow {
    border: none !important;
    height: 100%;
  }
  .ql-editor {
    padding-left: 12px;
    padding-right: 12px;
    scrollbar-width: 0px;
  }
}
</style>
