<template>
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
      <button-square @click="openEditForm" label="Edit" color="bg-green-400" />
    </div>
  </div>
  <EditForm
    v-if="showEditForm"
    :formattedText="formattedText"
    @close="showEditForm = false"
  />
</template>

<script setup>
import { useCalendar } from "~/utils/CalendarLogic";
import EditForm from "~/components/EditForm.vue";

const {
  year,
  month,
  showEditForm,
  prevMonth,
  nextMonth,
  formattedText,
  openEditForm,
} = useCalendar();
</script>
