<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="w-96 bg-white px-5 py-2 rounded shadow-lg relative">
      <h3 class="flex justify-center text-lg font-bold mb-2">生成データ</h3>
      <textarea
        ref="textArea"
        class="w-full h-60 border p-2 rounded resize-none"
        >{{ formattedText }}</textarea
      >
      <div class="flex justify-end gap-x-2">
        <button-square @click="copyText" label="コピー" color="bg-blue-200" />
        <button-square
          @click="$emit('close')"
          label="閉じる"
          color="bg-gray-400"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  formattedText: String,
});

const textArea = ref(null);

const copyText = () => {
  if (textArea.value) {
    textArea.value.select();
    document.execCommand("copy");
    alert("生成データをコピーしました");
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

// ESCキーを押したらモーダルを閉じる
const handleEscape = (event) => {
  if (event.key === "Escape") {
    emit("close");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEscape);
});
</script>
