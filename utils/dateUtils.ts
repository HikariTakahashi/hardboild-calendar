export const getCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days = [];
  
  // 1日の曜日を取得
  let startDay = firstDay.getDay();
  if (startDay === 0) startDay = 7; // 日曜日を7とする
  
  // 前の月の日付を追加
  for (let i = startDay - 1; i > 0; i--) {
    const prevDate = new Date(year, month, -i + 1);
    days.push(prevDate);
  }
  
  // 現在の月の日付を追加
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  
  // 最後の日の曜日を取得
  let endDay = lastDay.getDay();
  if (endDay === 0) endDay = 7;
  
  // 次の月の日付を追加
  for (let i = 1; i <= 7 - endDay; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push(nextDate);
  }
  
  return days;
};