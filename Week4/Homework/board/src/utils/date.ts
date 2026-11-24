const toUtcDate = (iso: string) => {
  const hasTimeZone = /(Z|[+-]\d{2}:?\d{2})$/.test(iso); 
  return new Date(hasTimeZone ? iso : `${iso}Z`);
};

// "2026-11-08T13:55:11.257844" → "2026. 11. 08. 오후 10:55"
export const formatDateTime = (iso: string) =>
  toUtcDate(iso).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });