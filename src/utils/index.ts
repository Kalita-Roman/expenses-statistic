export const dateToText = (date: Date | string | undefined) => {
  if (!date) {
    return "--";
  }
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toISOString().slice(0, 10);
};
