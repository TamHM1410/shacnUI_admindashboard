import { Spinner } from "@/components/ui/spinner";
import { Col } from "@/components/common/grid/col";
import { displayDate, displayNumber, displayValue } from "@/lib/display";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ExpertsCard = ({
  fullName,
  specialization,
  yearOfExperiences,
  createdAt,
  description,
  imageBase64,
  isLoading,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-3 border border-gray-200 p-4 rounded-lg">
      <span className={"text-neutral-500 text-sm"}>
        Avatar
      </span>
      <Avatar className="size-24">
        <AvatarImage
          className="object-cover"
          src={imageBase64 || "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"}
          alt={imageBase64}
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <Col label={"Full Name"} value={displayValue(fullName)} />
      <Col label={"Specializations"} value={displayValue(specialization)} />
      <Col
        label={"Years of Experience"}
        value={displayNumber(yearOfExperiences)}
      />
      <Col label={"Description"} value={displayValue(description)} />
      <Col label={"Created At"} value={displayDate(createdAt)} />
    </div>
  );
};
