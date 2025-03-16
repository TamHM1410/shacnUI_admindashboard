import { cn } from "@/lib/utils";
import { Button } from "./button";

export const statusButton = ({ text, textColor, bgColor, noBorder }) => {
  if (!text) return null;
  return (
    <Button
      variant="default"
      size="sm"
      className={cn("w-full", textColor, bgColor, noBorder && "border-none")}
    >
      {text}
    </Button>
  );
};
