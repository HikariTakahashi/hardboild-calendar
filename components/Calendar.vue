<template>
    <div class="w-full h-full flex flex-col px-2">
      <!-- 年月表示 -->
      <div class="flex justify-end items-center text-center font-bold py-2 gap-x-5">
        <span class="text-2xl">{{ year }}年 {{ month + 1 }}月</span>
        <button @click="prevMonth" class="w-12 h-12 border rounded-full">&#9664;</button>
        <button @click="nextMonth" class="w-12 h-12 border rounded-full">&#9654;</button>
      </div>
      <!-- 曜日表示 -->
      <div class="grid grid-cols-7 text-center font-bold py-1">
        <div v-for="day in weekDays" :key="day">{{ day }}</div>
      </div>
      <!-- カレンダー -->
      <div class="flex-1 grid grid-cols-7 grid-rows-6 gap-1" style="height: 85vh;">
        <div v-for="day in days" :key="day" class="flex items-center justify-center border rounded"
          :class="{'bg-gray-100 text-gray-400': day.getMonth() !== month }"
          style="min-height: calc(85vh / 6);">
          {{ day.getDate() }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getCalendarDays } from '~/utils/dateUtils';
  
  const today = new Date();
  const year = ref(today.getFullYear());
  const month = ref(today.getMonth());
  const days = ref(getCalendarDays(year.value, month.value));
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
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
  </script>
  
  <style scoped>
  .grid-cols-7 > div {
    flex-grow: 1;
  }
  </style>

<!--   
  <template>
    <div class="w-full h-full flex flex-col px-10">
      <div class="flex item text-lg font-bold py-4 gap-x-5">
        <button @click="prevMonth" class="px-2 py-1 bg-gray-300 rounded">←</button>
        <button @click="nextMonth" class="px-2 py-1 bg-gray-300 rounded">→</button>
        <span>{{ year }}年 {{ month + 1 }}月</span>
      </div>
      <div class="flex-1 grid grid-cols-7 grid-rows-5 gap-2" style="height: 85vh;">
        <div v-for="day in days" :key="day" class="flex justify-center border border-black rounded" style="min-height: calc(85vh / 6);">
          {{ day.getDate() }}
        </div>
      </div>
    </div>
  </template> -->