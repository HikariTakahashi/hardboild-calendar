<script>
import { ref, computed } from "vue";
import { getCalendarDays } from "~/utils/dateUtils";

export function useCalendar() {
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

  return {
    year,
    month,
    days,
    times,
    selectedDay,
    showEditForm,
    prevMonth,
    nextMonth,
    openTimeForm,
    saveTime,
    deleteTime,
    formatTimeDisplay,
    formattedText,
    openEditForm,
    weekDays,
  };
}
</script>
