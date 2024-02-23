<script lang="ts">
import { type columns, type rows } from './types'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    tableClumns: {
      type: Array as PropType<columns[]>,
      required: true
    },
    tableRows: {
      type: Array as PropType<rows[]>,
      required: true
    }
  },
  setup(props) {
    return {
      props
    }
  }
})
</script>

<template>
  <table class="my-4 mb-8 table w-full">
    <!-- head -->
    <thead>
      <tr class="border-b border-[#EFEFEF] bg-none">
        <th
          v-for="(column, i) in props.tableClumns"
          :key="i"
          :class="[
            column.name === 'checkbox'
              ? 'bg-white px-0'
              : 'bg-white text-[13px] capitalize leading-[16px] text-neutral-04'
          ]"
        >
          <template v-if="column.name !== 'checkbox'">
            {{ column.label }}
          </template>
          <template v-else>
            <input
              type="checkbox"
              class="checkbox text-primary-600 accent-primary-600 checked:bg-primary-600 checked:bg-none focus-within:ring-0 focus:bg-primary-600 focus:outline-none focus:ring-0 focus:ring-transparent"
            />
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in props.tableRows" :key="i" class="h-[68px] border-b border-[#EFEFEF]">
        <th class="px-0">
          <!-- {{ row.checked }} -->
          <!-- <BaseInput type="checkbox" :value="row.checked" name="checkbox" /> -->
          <input
            v-model="row.checked"
            type="checkbox"
            class="checkbox text-primary-600 accent-primary-600 checked:bg-primary-600 checked:bg-none focus-within:ring-0 focus:bg-primary-600 focus:outline-none focus:ring-0 focus:ring-transparent"
          />
        </th>
        <td class="pb-[20px] pl-2">
          <div class="flex items-center space-x-3">
            <div>
              <div
                class="border-b border-dashed text-[15px] font-[600] leading-[24px] text-neutral-07"
                :class="[!row.checked ? 'border-dark border-opacity-40' : 'border-primary-500']"
              >
                {{ row.title }}
              </div>
            </div>
          </div>
        </td>
        <td class="pb-[20px]">
          <span
            class="h-6 rounded-md bg-neutral-03 px-2 py-1 text-[15px] font-[600] leading-[24px] text-neutral-07"
          >
            {{ row.createdAt }}
          </span>
        </td>
        <td class="pb-[20px]">
          <span
            class="h-6 rounded-md bg-neutral-03 px-2 py-1 text-[15px] font-[600] leading-[24px] text-neutral-07"
          >
            {{ row.sendAt }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.pagination-item {
  @apply btn-sm btn-circle btn mx-1 h-8 w-8 border border-dark border-opacity-10 bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;

  &.active {
    @apply bg-dark text-white;
  }
}

.border-img {
  // border-image: url(border.png) 30 round;
}
</style>

<style lang="scss" module>
.button {
  @apply btn-sm btn h-10 w-[116px] border-0 bg-primary-500 capitalize text-white;
}
</style>
