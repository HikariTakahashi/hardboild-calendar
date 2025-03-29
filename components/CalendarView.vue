<template>
  <div class="w-full h-full flex flex-col sm:px-2 pb-2">
    <!-- 週の表示 -->
    <div class="grid grid-cols-7 text-center font-bold">
      <div v-for="day in weekDays" :key="day">{{ day }}</div>
    </div>

    <div class="flex-1 grid grid-cols-7 grid-rows-6 gap-2 h-80vh">
      <!-- 日の表示 -->
      <div
        v-for="day in days"
        :key="day.toDateString()"
        class="flex flex-col items-center justify-center border rounded transition-transform duration-200 hover:-translate-y-1 relative shadow-md"
        :class="{ 'bg-gray-100 text-gray-400': day.getMonth() !== month }"
        style="min-height: calc(83vh / 6)"
        @click="openTimeForm(day)"
      >
        {{ day.getDate() }}
        <!-- 予定の表示 -->
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
  </div>
</template>

<script setup>
import { useCalendar } from "~/utils/CalendarLogic";
import TimeForm from "~/components/TimeForm.vue";

const {
  month,
  days,
  times,
  selectedDay,
  openTimeForm,
  saveTime,
  deleteTime,
  formatTimeDisplay,
  weekDays,
} = useCalendar();
</script>
