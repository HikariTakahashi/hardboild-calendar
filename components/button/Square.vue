<template>
  <button
    @click="$emit('click')"
    class="w-20 h-12 border rounded-full hover:{{ color }}"
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
  color: {
    type: String,
    required: true,
  },
});

defineEmits(["click"]);
</script>
