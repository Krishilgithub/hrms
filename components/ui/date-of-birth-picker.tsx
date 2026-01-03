"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface DateOfBirthPickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
}

export function DateOfBirthPicker({ value, onChange }: DateOfBirthPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedYear, setSelectedYear] = React.useState<string>(
    value ? value.getFullYear().toString() : ""
  )
  const [selectedMonth, setSelectedMonth] = React.useState<string>(
    value ? (value.getMonth() + 1).toString() : ""
  )
  const [selectedDay, setSelectedDay] = React.useState<string>(
    value ? value.getDate().toString() : ""
  )

  // Generate years (from 100 years ago to 18 years ago)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - 18 - i).toString())

  // Months
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  // Calculate days in selected month
  const getDaysInMonth = () => {
    if (!selectedYear || !selectedMonth) return 31
    return new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate()
  }

  const days = Array.from({ length: getDaysInMonth() }, (_, i) => (i + 1).toString())

  // Update the date when all three values are selected
  React.useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const date = new Date(
        parseInt(selectedYear),
        parseInt(selectedMonth) - 1,
        parseInt(selectedDay)
      )
      onChange(date)
    }
  }, [selectedYear, selectedMonth, selectedDay, onChange])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick your date of birth</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Month</label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Day</label>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => setOpen(false)}
            className="w-full"
            disabled={!selectedYear || !selectedMonth || !selectedDay}
          >
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
