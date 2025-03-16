import { Spinner } from "@/components/ui/spinner";
import { Col } from "@/components/common/grid/col";
import { displayDate, displayValue } from "@/lib/display";

export const BlogCard = ({
  title,
  createdAt,
  content,
  isLoading,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-3 border border-gray-200 p-4 rounded-lg">
      <Col label={"Title"} value={displayValue(title)} />
      <Col label={"Content"} value={displayValue(content)} />
      <Col label={"Created At"} value={displayDate(createdAt)} />
    </div>
  );
};
