"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Search,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageCount: number;
  searchColumn?: string;
  searchPlaceholder?: string;
}

export const filterOperators = {
  text: [
    { label: "Contains", value: "contains" },
    { label: "Equals", value: "equals" },
    { label: "Starts with", value: "startsWith" },
    { label: "Ends with", value: "endsWith" },
    { label: "Empty", value: "empty" },
  ],
  boolean: [
    { label: "Is", value: "equals" },
    { label: "Empty", value: "empty" },
  ],
  date: [
    { label: "Equals", value: "equals" },
    { label: "Empty", value: "empty" },
  ],
} as const;

interface FilterDialogProps {
  column: string;
  onApply: (filter: { id: string; operator: string; value: string }) => void;
}

type FilterOperator = (typeof filterOperators.text)[number]["value"];

function FilterDialog({ column, onApply }: FilterDialogProps) {
  const [operator, setOperator] = useState<FilterOperator>("contains");
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Filter className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter {column}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Select
              value={operator}
              onValueChange={(value: FilterOperator) => setOperator(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                {filterOperators.text.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {operator !== "empty" && (
            <div className="grid gap-2">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Filter value..."
              />
            </div>
          )}
          <Button
            disabled={operator !== "empty" && value === ""}
            onClick={() => {
              onApply({ id: column, operator, value });
              setIsOpen(false);
            }}
          >
            Apply Filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DataTable<TData>({
  data,
  columns,
  pageCount,
  searchColumn,
  searchPlaceholder = "Search...",
}: DataTableProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current values from URL
  const page = Number(searchParams.get("page")) || 0;
  const size = Number(searchParams.get("size")) || 10;
  const sort = searchParams.get("sort")
    ? JSON.parse(searchParams.get("sort")!)
    : [];
  const filters = searchParams.get("filters")
    ? JSON.parse(searchParams.get("filters")!)
    : [];

  // Local state
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchValue, setSearchValue] = useState<string>("");

  // Update URL with new parameters
  const updateUrl = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  // Handle pagination changes
  const handlePaginationChange = useCallback(
    (updater: { pageIndex?: number; pageSize?: number }) => {
      const updates: Record<string, string> = {};

      if (typeof updater.pageIndex === "number") {
        updates.page = String(updater.pageIndex);
      }

      if (typeof updater.pageSize === "number") {
        updates.size = String(updater.pageSize);
        // Reset to first page when changing page size
        updates.page = "0";
      }

      updateUrl(updates);
    },
    [updateUrl],
  );

  const handleFilterChange = useCallback(
    (newFilter: { id: string; operator: string; value: string }) => {
      const currentFilters = filters.filter((f: any) => f.id !== newFilter.id);
      const updatedFilters = [...currentFilters, newFilter];
      updateUrl({ filters: JSON.stringify(updatedFilters) });
    },
    [filters, updateUrl],
  );

  const removeFilter = useCallback(
    (columnId: string) => {
      const updatedFilters = filters.filter((f: any) => f.id !== columnId);
      updateUrl({ filters: JSON.stringify(updatedFilters) });
    },
    [filters, updateUrl],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sort,
      columnFilters: filters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: page,
        pageSize: size,
      },
    },
    pageCount,
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      const newSort = typeof updater === "function" ? updater(sort) : updater;
      updateUrl({ sort: JSON.stringify(newSort) });
    },
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === "function" ? updater(filters) : updater;
      updateUrl({ filters: JSON.stringify(newFilters) });
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({
          pageIndex: page,
          pageSize: size,
        });
        handlePaginationChange(newState);
      } else {
        handlePaginationChange(updater);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleSearch = useCallback(() => {
    if (searchColumn) {
      table.getColumn(searchColumn)?.setFilterValue(searchValue);
    }
  }, [searchColumn, searchValue, handleFilterChange]);

  return (
    <div className="space-y-4">
      {/* Active filters display */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter: any) => (
            <div
              key={filter.id}
              className="flex items-center gap-2 rounded-md border bg-muted px-3 py-1 text-sm"
            >
              <span>
                {filter.id} {filter.operator} {filter.value}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => removeFilter(filter.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateUrl({ filters: "[]" })}
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="flex items-center gap-4">
        {searchColumn && (
          <>
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="max-w-sm"
            />
            <Button
              onClick={handleSearch}
              className="h-8 w-8 p-0"
              disabled={searchValue === ""}
            >
              <Search className="h-4 w-4" />
            </Button>
          </>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-none border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {!header.isPlaceholder &&
                        header.column.id !== "actions" &&
                        header.column.id !== "isPublished" &&
                        header.column.id !== "readTime" &&
                        header.column.id !== "select" &&
                        header.column.id !== "publishedAt" &&
                        header.column.id !== "createdAt" &&
                        header.column.id !== "updatedAt" && (
                          <FilterDialog
                            column={header.column.id}
                            onApply={handleFilterChange}
                          />
                        )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="p-0">
                <div className="flex items-center justify-between px-4 py-4">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">Rows per page</p>
                      <Select
                        value={`${size}`}
                        onValueChange={(value) => {
                          handlePaginationChange({ pageSize: Number(value) });
                        }}
                      >
                        <SelectTrigger className="h-8 w-[70px]">
                          <SelectValue placeholder={size} />
                        </SelectTrigger>
                        <SelectContent side="top">
                          {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                              {pageSize}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                      Page {page + 1} of {pageCount}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handlePaginationChange({ pageIndex: 0 })}
                        disabled={!table.getCanPreviousPage()}
                      >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          handlePaginationChange({ pageIndex: page - 1 })
                        }
                        disabled={!table.getCanPreviousPage()}
                      >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          handlePaginationChange({ pageIndex: page + 1 })
                        }
                        disabled={!table.getCanNextPage()}
                      >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() =>
                          handlePaginationChange({ pageIndex: pageCount - 1 })
                        }
                        disabled={!table.getCanNextPage()}
                      >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
