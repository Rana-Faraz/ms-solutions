"use client";

import { FaFileMedical } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NoBlogsFoundProps {
  searchQuery?: string;
  resetSearch?: () => void;
}

export function NoBlogsFound({ searchQuery, resetSearch }: NoBlogsFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/20 bg-muted/10 p-10 text-center">
      <FaFileMedical className="mb-4 h-12 w-12 text-primary/40" />
      <h3 className="mb-2 text-xl font-semibold">No Articles Found</h3>
      {searchQuery ? (
        <>
          <p className="mb-6 max-w-md text-muted-foreground">
            We couldn't find any articles matching{" "}
            <span className="font-medium text-foreground">"{searchQuery}"</span>
            . Please try a different search term or browse our categories.
          </p>
          <Button onClick={resetSearch} variant="outline">
            Clear Search
          </Button>
        </>
      ) : (
        <>
          <p className="mb-6 max-w-md text-muted-foreground">
            We don't have any articles published yet. Please check back later
            for healthcare insights and medical updates.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </>
      )}
    </div>
  );
}
