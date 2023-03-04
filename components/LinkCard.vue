<script setup lang="ts">
interface Props {
  name: string
  url: string
}

withDefaults(defineProps<Props>(), {
  name: '-',
  link: '-',
})

defineEmits(['editClick', 'deleteClick'])
</script>

<template>
  <div class="px-5 py-5 bg-base-100 rounded-lg hover:shadow-lg transition-all ease-out flex justify-between">
    <div>
      <a :href="url" target="_blank">{{ name }}</a>
    </div>
    <div class="space-x-3">
      <button class="btn btn-sm  btn-primary" @click="$emit('editClick')">
        <Icon name="mdi:circle-edit-outline" size="1em" color="while" />
      </button>
      <button class="btn btn-sm  btn-error" @click="$emit('deleteClick')">
        <Icon name="ant-design:delete-outlined" size="1em" color="white" />
      </button>
    </div>
  </div>
</template>
