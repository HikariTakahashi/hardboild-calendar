<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border bg-white rounded shadow-lg"
  >
    <div class="flex justify-between">
      <h3 class="pl-5 pt-5 text-xl font-bold">
        {{ selectedDay?.getDate() }}日 の時間設定
      </h3>
      <button
        @click="$emit('close')"
        class="flex items-top px-1.5 mb-5 border hover:bg-gray-200"
      >
        ✕
      </button>
    </div>

    <h5 class="pl-6 text-xs mb-2">
      「終日」と表記する場合は00:00に設定してください
    </h5>
    <div class="flex justify-center items-center gap-x-2">
      <div class="pl-5">開始時刻</div>
      <div class="border-r border-gray-400 pr-2">
        <date-time-picker
          v-model="startTime"
          type="time"
          minute-interval="5"
          @change="validateTime"
          class="border p-2 rounded"
        />
      </div>
      <date-time-picker
        v-model="endTime"
        type="time"
        minute-interval="5"
        @change="validateTime"
        class="border p-2 rounded"
      />
      <div class="pr-5">終了時刻</div>
    </div>
    <div class="pr-3 pb-3 mt-3 flex justify-end gap-x-2">
      <button
        @click="save"
        class="px-3 py-1 border rounded-full hover:bg-blue-200"
      >
        保存
      </button>
      <button
        @click="deleteTime"
        class="px-3 py-1 border rounded-full hover:bg-red-200"
      >
        削除
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { DateTimePicker } from "vue-drumroll-datetime-picker";
import "vue-drumroll-datetime-picker/dist/style.css";

const props = defineProps({
  selectedDay: Object,
  initialStartTime: String,
  initialEndTime: String,
});

const emit = defineEmits(["save", "delete", "close"]);

const startTime = ref(props.initialStartTime || "");
const endTime = ref(props.initialEndTime || "");

watch(
  () => props.initialStartTime,
  (newVal) => (startTime.value = newVal)
);
watch(
  () => props.initialEndTime,
  (newVal) => (endTime.value = newVal)
);

const validateTime = () => {
  if (startTime.value && endTime.value && startTime.value >= endTime.value) {
    endTime.value = "";
  }
};

const save = () => {
  if (startTime.value && endTime.value) {
    emit("save", { start: startTime.value, end: endTime.value });
  }
};

const deleteTime = () => {
  startTime.value = "";
  endTime.value = "";
  emit("delete"); // 削除イベントを送信
};
</script>

<style scoped></style>
