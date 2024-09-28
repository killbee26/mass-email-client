"use client"
import React from 'react';
import { DatePicker } from '@/components/ui/datePicker';
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel, // Import pagination model
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table" // Adjust the import path as necessary

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )

    //Select Date state manage
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

    //Date change Handler
    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    
        if (date) {
          table.getColumn("createdAt")?.setFilterValue(date.toISOString().split("T")[0]);
        } else {
          table.getColumn("createdAt")?.setFilterValue("");
        }
      };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 9, // Set default page size to 10 rows
      },
    },
    state: {
        columnFilters,
    }
  })

  return (
    <div>
    <div className="flex items-center py-4 space-x-4">
        {/* File name search input */}
        <Input
          placeholder="Filter Files..."
          value={(table.getColumn("fileName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fileName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Date picker for filtering by createdAt */}
        
      </div>
        
      <div className="rounded-md border bg-card text-foreground ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-base">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
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
                    <TableCell key={cell.id} className="ml-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
