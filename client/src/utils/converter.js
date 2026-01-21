export const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};


export const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(hours, minutes);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
};


export const calculateEndTime = (dateISO, startTime, durationMinutes) => {
  const date = new Date(dateISO);

  const [hours, minutes] = startTime.split(":").map(Number);

  date.setHours(hours);
  date.setMinutes(minutes + durationMinutes);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
};

