"use client";

import * as React from "react";
import * as Icons from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const parentRef = React.useRef<HTMLDivElement>(null);

  // Get all icon names from react-icons/fa
  const iconNames = React.useMemo(
    () =>
      Object.keys(Icons).filter(
        (key) =>
          key.startsWith("Fa") &&
          typeof Icons[key as keyof typeof Icons] === "function",
      ),
    [],
  );

  // Filter icons based on search term
  const filteredIcons = React.useMemo(
    () =>
      searchTerm
        ? iconNames.filter((name) =>
            name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : iconNames,
    [iconNames, searchTerm],
  );

  // Get the current icon component
  const SelectedIcon = value ? Icons[value as keyof typeof Icons] : null;

  // Set up virtualization
  const rowVirtualizer = useVirtualizer({
    count: filteredIcons.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36, // Estimated height of each row
    overscan: 10,
  });

  // Handle popover open state
  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);

      // When opening the popover, ensure virtualization is initialized
      if (newOpen) {
        // Use a small timeout to ensure the DOM is ready
        setTimeout(() => {
          if (parentRef.current) {
            rowVirtualizer.measure();
          }
        }, 10);
      }
    },
    [rowVirtualizer],
  );

  // Initialize the virtualization when the component mounts
  React.useEffect(() => {
    if (open && parentRef.current) {
      rowVirtualizer.measure();
    }
  }, [open, rowVirtualizer, filteredIcons.length]);

  const handleSelectIcon = React.useCallback(
    (iconName: string) => {
      onChange(iconName);
      setOpen(false);
      setSearchTerm("");
    },
    [onChange],
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            {SelectedIcon && <SelectedIcon className="h-4 w-4" />}
            <span>{value || "Select an icon"}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full border-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            autoComplete="off"
          />
        </div>

        {filteredIcons.length === 0 ? (
          <div className="py-6 text-center text-sm">No icons found.</div>
        ) : (
          <div
            ref={parentRef}
            className="max-h-[300px] overflow-y-auto p-1"
            style={{
              height: Math.min(300, filteredIcons.length * 36),
              width: "100%",
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer
                .getVirtualItems()
                .map((virtualRow: VirtualItem) => {
                  const iconName = filteredIcons[virtualRow.index];
                  const Icon = Icons[iconName as keyof typeof Icons];

                  return (
                    <div
                      key={virtualRow.index}
                      className={cn(
                        "absolute left-0 top-0 w-full",
                        "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                        "hover:bg-accent hover:text-accent-foreground",
                        value === iconName &&
                          "bg-accent text-accent-foreground",
                      )}
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      onClick={() => handleSelectIcon(iconName)}
                    >
                      <Icon className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>{iconName}</span>
                      {value === iconName && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
