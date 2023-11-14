"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function ToastSimple() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your question has been sent.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}

export default ToastSimple;
