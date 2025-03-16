import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LoadingButton({ isLoading, title, type = "button", ...other }) {
  return (
    <Button disabled={isLoading} type={type}>
      {isLoading && <Loader2 className="animate-spin" />}
      {title}
    </Button>
  );
}
