export const dateToText = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toISOString().slice(0, 10);
};
