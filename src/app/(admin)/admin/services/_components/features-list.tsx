"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface FeaturesListProps {
  features: string[];
  onChange: (features: string[]) => void;
}

export function FeaturesList({ features, onChange }: FeaturesListProps) {
  // Ensure we always have at least one empty feature field
  const [localFeatures, setLocalFeatures] = useState<string[]>(() => {
    if (features.length === 0) {
      return [""];
    }
    return features;
  });

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...localFeatures];
    updatedFeatures[index] = value;
    setLocalFeatures(updatedFeatures);
    onChange(updatedFeatures.filter((feature) => feature.trim() !== ""));
  };

  const addFeature = () => {
    const updatedFeatures = [...localFeatures, ""];
    setLocalFeatures(updatedFeatures);
  };

  const removeFeature = (index: number) => {
    if (localFeatures.length === 1) {
      // Don't remove the last feature, just clear it
      handleFeatureChange(0, "");
      return;
    }

    const updatedFeatures = localFeatures.filter((_, i) => i !== index);
    setLocalFeatures(updatedFeatures);
    onChange(updatedFeatures.filter((feature) => feature.trim() !== ""));
  };

  return (
    <div className="space-y-2">
      {localFeatures.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={feature}
            onChange={(e) => handleFeatureChange(index, e.target.value)}
            placeholder={`Feature ${index + 1}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeFeature(index)}
            className="h-10 w-10"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addFeature}
        className="mt-2"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Feature
      </Button>
    </div>
  );
}
