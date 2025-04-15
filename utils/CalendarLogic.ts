import { computed } from "vue";
import { getCalendarDays } from "~/utils/dateUtils";
import type { CalendarDay } from "~/utils/dateUtils";

export function useCalendar() {
  const year = useState<number>("year", () => new Date().getFullYear());
  const month = useState<number>("month", () => new Date().getMonth());
  const days = useState<CalendarDay[]>("days", () =>
    getCalendarDays(year.value, month.value)
  );
  const times = useState<Record<string, { start: string; end: string }>>(
    "times",
    () => ({})
  );
  const selectedDay = useState<Date | null>("selectedDay", () => null);
  const showEditForm = useState<boolean>("showEditForm", () => false);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  const openTimeForm = (day: Date) => {
    selectedDay.value = day;
  };

  const saveTime = ({ start, end }: { start: string; end: string }) => {
    if (selectedDay.value && start && end) {
      times.value[selectedDay.value.toDateString()] = { start, end };
    }
    selectedDay.value = null;
  };

  const deleteTime = () => {
    if (selectedDay.value) {
      delete times.value[selectedDay.value.toDateString()];
      selectedDay.value = null;
    }
  };

  const formatTimeDisplay = (day: Date): string => {
    const { start, end } = times.value[day.toDateString()] || {};
    if (start === "00:00" && end === "00:00") return "終日";
    if (start === "00:00") return `~ ${end}`;
    if (end === "00:00") return `${start} ~ 終日`;
    return `${start} ~ ${end}`;
  };

  const formattedText = computed<string>(() => {
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

  const isToday = (day: Date): boolean => {
    return (
      day.getFullYear() === day.getFullYear() &&
      day.getMonth() === day.getMonth() &&
      day.getDate() === day.getDate()
    );
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
    isToday,
  };
}
