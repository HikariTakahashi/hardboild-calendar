<template>
  <div class="w-full h-full flex flex-col sm:px-2">
    <div
      class="flex flex-col sm:flex-row justify-between items-center text-center font-bold p-2"
    >
      <span class="md:text-2xl sm:text-2xl"
        >スケジュールテキスト生成ジェネレータ</span
      >
      <div
        class="flex md:justify-end sm:justify-start items-center gap-x-3 mt-2 sm:mt-0"
      >
        <span class="md:text-2xl sm:text-2xl"
          >{{ year }}年 {{ month + 1 }}月</span
        >
        <button-circle @click="prevMonth" label="&#9664;" />
        <button-circle @click="nextMonth" label="&#9654;" />
        <button-square
          @click="openEditForm"
          label="Edit"
          color="bg-green-400"
        />
      </div>
    </div>

    <div class="grid grid-cols-7 text-center font-bold pb-1">
      <div v-for="day in weekDays" :key="day">{{ day }}</div>
    </div>

    <div
      class="flex-1 grid grid-cols-7 grid-rows-6 gap-2 h-85vh"
      style="height: 85vh"
    >
      <div
        v-for="day in days"
        :key="day"
        class="flex flex-col items-center justify-center border rounded transition-transform duration-200 hover:-translate-y-1 relative shadow-md"
        :class="{ 'bg-gray-100 text-gray-400': day.getMonth() !== month }"
        style="min-height: calc(85vh / 6)"
        @click="openTimeForm(day)"
      >
        {{ day.getDate() }}
        <div
          v-if="times[day.toDateString()]"
          class="text-sm text-blue-500 text-center mt-1"
        >
          {{ formatTimeDisplay(day) }}
        </div>
      </div>
    </div>

    <TimeForm
      v-if="selectedDay"
      :selectedDay="selectedDay"
      :initialStartTime="times[selectedDay.toDateString()]?.start"
      :initialEndTime="times[selectedDay.toDateString()]?.end"
      @save="saveTime"
      @delete="deleteTime"
      @close="selectedDay = null"
    />

    <EditForm
      v-if="showEditForm"
      :formattedText="formattedText"
      @close="showEditForm = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getCalendarDays } from "~/utils/dateUtils";
import TimeForm from "~/components/TimeForm.vue";
import EditForm from "~/components/EditForm.vue";

// dateUtilsからデータインポート
const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth());
const days = ref(getCalendarDays(year.value, month.value));

const times = ref({});
const selectedDay = ref(null);
const showEditForm = ref(false);

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const updateCalendar = () => {
  days.value = getCalendarDays(year.value, month.value);
};

// 先月に遷移
const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11;
    year.value--;
  } else {
    month.value--;
  }
  updateCalendar();
};

// 次月に遷移
const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0;
    year.value++;
  } else {
    month.value++;
  }
  updateCalendar();
};

// 時間設定フォーム表示
const openTimeForm = (day) => {
  selectedDay.value = day;
};

// 時刻セーブ
const saveTime = ({ start, end }) => {
  if (start && end) {
    times.value[selectedDay.value.toDateString()] = { start, end };
  }
  selectedDay.value = null;
};

// 時刻削除
const deleteTime = () => {
  delete times.value[selectedDay.value.toDateString()];
  selectedDay.value = null;
};

// 終日と表示
const formatTimeDisplay = (day) => {
  const { start, end } = times.value[day.toDateString()] || {};
  if (start === "00:00" && end === "00:00") return "終日";
  if (start === "00:00") return `~ ${end}`;
  if (end === "00:00") return `${start} ~ 終日`;
  return `${start} ~ ${end}`;
};

const formattedText = computed(() => {
  return Object.entries(times.value)
    .map(([date, { start, end }]) => {
      const d = new Date(date);
      const formattedDate = `${d.getMonth() + 1}/${d.getDate()}(${
        weekDays[d.getDay()]
      })`;
      return `${formattedDate} ${formatTimeDisplay(d)}`;
    })
    .join("\n");
});

const openEditForm = () => {
  showEditForm.value = true;
};
</script>
