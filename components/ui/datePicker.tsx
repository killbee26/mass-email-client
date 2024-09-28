"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { startOfDay, endOfDay } from "date-fns" // For setting start and end of the day in date comparison

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void; // Pass both start and end of the day
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate ?? undefined)

    if (selectedDate) {
      // Get the start and end of the selected date in UTC
      const startDate = startOfDay(selectedDate)
      const endDate = endOfDay(selectedDate)

      onDateChange(startDate, endDate) // Pass both start and end of the day for accurate filtering
    } else {
      onDateChange(undefined, undefined) // Clear the filter if no date is selected
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
