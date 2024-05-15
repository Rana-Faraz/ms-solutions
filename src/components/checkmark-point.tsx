import { Check, CheckCircle, CheckCircle2 } from "lucide-react";
import React from "react";

export default function CheckmarkPoint({ point }: { point: string }) {
  return (
    <span className="grid grid-cols-[40px_1fr] items-center gap-2">
      <Check className="h-10 w-10 rounded-full bg-secondary p-1 text-white" />
      <p className="font-degular text-lg font-medium">{point}</p>
    </span>
  );
}
