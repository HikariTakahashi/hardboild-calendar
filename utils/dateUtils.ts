// dateUtils.ts

export type CalendarDay = {
  date: Date;
  isToday: boolean;
};

export const getCalendarDays = (year: number, month: number): CalendarDay[] => {
  const today = new Date();
  const todayY = today.getFullYear();
  const todayM = today.getMonth();
  const todayD = today.getDate();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: CalendarDay[] = [];

  // 1日の曜日を取得
  let startDay = firstDay.getDay();
  if (startDay === 0) startDay = 7;

  // 前の月の日付を追加
  for (let i = startDay; i > 0; i--) {
    const d = new Date(year, month, -i + 1);
    days.push({
      date: d,
      isToday:
        d.getFullYear() === todayY &&
        d.getMonth() === todayM &&
        d.getDate() === todayD,
    });
  }

  // 今月の日付を追加
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i);
    days.push({
      date: d,
      isToday:
        d.getFullYear() === todayY &&
        d.getMonth() === todayM &&
        d.getDate() === todayD,
    });
  }

  // 最後の日の曜日を取得
  let endDay = lastDay.getDay();
  if (endDay === 0) endDay = 7;

  // 次の月の日付を追加
  for (let i = 1; i <= 7 - endDay; i++) {
    const d = new Date(year, month + 1, i);
    days.push({
      date: d,
      isToday:
        d.getFullYear() === todayY &&
        d.getMonth() === todayM &&
        d.getDate() === todayD,
    });
  }

  return days;
};
