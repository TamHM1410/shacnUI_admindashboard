import { SelectQuery } from "./select-query"
import ExpertsService from "@/services/experts.service"

export const SelectExpert = ({placeholder, value, onChange}) => {
  return (
    <SelectQuery
      queryConfig={{
        queryKey: "experts",
        queryFn: ExpertsService.getExperts
      }}
      mode="single"
      itemValueKey="expertId"
      itemLabelKey="fullName"
      defaultValue={value}
      placeholder={placeholder}
      onValueChange={onChange}
    />
  )
}


