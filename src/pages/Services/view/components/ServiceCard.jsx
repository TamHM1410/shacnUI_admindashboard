import { Spinner } from "@/components/ui/spinner";
import { Col } from "@/components/common/grid/col";
import { displayDate, displayNumber, displayValue } from "@/lib/display";

export const ServiceCard = ({
  serviceName,
  price,
  type,
  createdAt,
  description,
  isLoading,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-3 border border-gray-200 p-4 rounded-lg">
      <Col label={"Service Name"} value={displayValue(serviceName)} />
      <Col label={"Price (VND)"} value={displayNumber(price)} />
      <Col label={"Type"} value={displayValue(type)} />

      <Col label={"Description"} value={displayValue(description)} />
      <Col label={"Created At"} value={displayDate(createdAt)} />
    </div>
  );
};
