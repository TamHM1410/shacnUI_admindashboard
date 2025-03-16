import { Spinner } from "@/components/ui/spinner";
import { Col } from "@/components/common/grid/col";
import { displayDate,  displayValue } from "@/lib/display";

export const WorkScheduleCard = ({
  workDate,
  startAt,
  endAt,
  createdAt,
  isLoading,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-3 border border-gray-200 p-4 rounded-lg">
      <Col label={"Work Date"} value={displayValue(workDate)} />
      <Col label={"Start At"} value={displayValue(startAt)} />
      <Col label={"End At"} value={displayValue(endAt)} />
      <Col label={"Created At"} value={displayDate(createdAt)} />
    </div>
  );
};
