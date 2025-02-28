import { Check } from "lucide-react";

export default function CheckmarkPoint({ point }: { point: string }) {
  return (
    <span className="flex items-center gap-2">
      <Check className="size-4 rounded-full bg-secondary p-1 text-white" />
      <p className="text-sm font-medium">{point}</p>
    </span>
  );
}
