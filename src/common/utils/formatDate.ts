export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");

  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  return `${year}년 ${month}월 ${day}일 ${hour >= 12 ? "오후" : "오전"} ${displayHour}:${minute}`;
}
