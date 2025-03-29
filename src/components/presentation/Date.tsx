import { dateToText } from "@/utils";

export const Date = ({ date }: { date?: Date | string }) => {
  return (
    <div className="flex items-end gap-1 justify-end text-sm text-current">
      <div>{dateToText(date)}</div>
    </div>
  );
};
