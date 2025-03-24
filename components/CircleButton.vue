<template>
  <button
    @click="$emit('click')"
    class="w-12 h-12 border rounded-full hover:bg-gray-200"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});

defineEmits(["click"]);
</script>
