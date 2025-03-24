<template>
  <div class="w-full h-full flex flex-col px-2">
    <div
      class="flex justify-end items-center text-center font-bold py-2 gap-x-5"
    >
      <span class="text-2xl">{{ year }}年 {{ month + 1 }}月</span>
      <CircleButton @click="prevMonth" label="&#9664;" />
      <CircleButton @click="nextMonth" label="&#9654;" />
      <button
        @click="openEditForm"
        class="w-20 h-12 border rounded-full hover:bg-green-400"
      >
        Edit
      </button>
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
          class="text-sm text-blue-500 mt-1"
        >
          <template
            v-if="
              times[day.toDateString()].start === '00:00' &&
              times[day.toDateString()].end === '00:00'
            "
          >
            終日
          </template>
          <template v-else-if="times[day.toDateString()].end === '00:00'">
            {{ times[day.toDateString()].start }} ~ 終日
          </template>
          <template v-else>
            {{ times[day.toDateString()].start }} ~
            {{ times[day.toDateString()].end }}
          </template>
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

const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11;
    year.value--;
  } else {
    month.value--;
  }
  updateCalendar();
};

const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0;
    year.value++;
  } else {
    month.value++;
  }
  updateCalendar();
};

const openTimeForm = (day) => {
  selectedDay.value = day;
};

const saveTime = ({ start, end }) => {
  if (start && end) {
    times.value[selectedDay.value.toDateString()] = { start, end };
  }
  selectedDay.value = null;
};

const deleteTime = () => {
  delete times.value[selectedDay.value.toDateString()];
  selectedDay.value = null;
};

const formattedText = computed(() => {
  return Object.entries(times.value)
    .map(([date, { start, end }]) => {
      const d = new Date(date);
      const formattedDate = `${d.getMonth() + 1}/${d.getDate()}(${
        weekDays[d.getDay()]
      })`;
      if (start === "00:00" && end === "00:00") return `${formattedDate} 終日`;
      if (end === "00:00") return `${formattedDate} ${start}~終日`;
      return `${formattedDate} ${start}~${end}`;
    })
    .join("\n");
});

const openEditForm = () => {
  showEditForm.value = true;
};
</script>
