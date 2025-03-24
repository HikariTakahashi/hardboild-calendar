<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg"
  >
    <h3 class="text-lg font-bold mb-2">時刻データ一覧</h3>
    <textarea
      ref="textArea"
      class="w-full h-40 border p-2 rounded resize-none"
      >{{ formattedText }}</textarea
    >
    <div class="mt-3 flex justify-end gap-x-2">
      <button
        @click="copyText"
        class="px-3 py-1 bg-blue-500 text-white rounded"
      >
        コピー
      </button>
      <button @click="$emit('close')" class="px-3 py-1 bg-gray-300 rounded">
        閉じる
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  formattedText: String,
});

const textArea = ref(null);

const copyText = () => {
  if (textArea.value) {
    textArea.value.select();
    document.execCommand("copy");
    alert("コピーしました！");
  }
};

// 日本語の曜日表記
const weekDaysJapanese = ["日", "月", "火", "水", "木", "金", "土"];

const formattedText = computed(() => {
  return props.formattedText
    .split("\n")
    .map((line) => {
      return line.replace(/\((Sun|Mon|Tue|Wed|Thu|Fri|Sat)\)/, (_, engDay) => {
        const dayIndex = [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].indexOf(engDay);
        return `(${weekDaysJapanese[dayIndex]})`;
      });
    })
    .join("\n");
});
</script>
