"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Loader2, Plus, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { applyLeave } from "@/actions/leaves"
import { DateRange } from "react-day-picker"

const leaveSchema = z.object({
  type: z.enum(["SICK", "CASUAL", "PRIVILEGE", "UNPAID"]),
  dateRange: z.object({
      from: z.date(),
      to: z.date()
  }),
  reason: z.string().min(5, {
    message: "Reason must be at least 5 characters.",
  }),
})

type LeaveManagerProps = {
    leaves: {
        id: string
        type: string
        startDate: Date
        endDate: Date
        reason: string | null
        status: string
        createdAt: Date
    }[]
}

export function LeaveManager({ leaves }: LeaveManagerProps) {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof leaveSchema>>({
    resolver: zodResolver(leaveSchema),
  })

  async function onSubmit(values: z.infer<typeof leaveSchema>) {
    setIsLoading(true)
    try {
        const result = await applyLeave({
            type: values.type,
            startDate: values.dateRange.from.toISOString(),
            endDate: values.dateRange.to.toISOString(),
            reason: values.reason
        })

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Leave applied successfully!")
            setOpen(false)
            form.reset()
        }
    } catch (error) {
        toast.error("Something went wrong.")
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Leave Management</h2>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Apply Leave
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Apply for Leave</DialogTitle>
                    <DialogDescription>
                        Submit a new leave request. Your manager will be notified.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Leave Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="CASUAL">Casual Leave</SelectItem>
                                            <SelectItem value="SICK">Sick Leave</SelectItem>
                                            <SelectItem value="PRIVILEGE">Privilege Leave</SelectItem>
                                            <SelectItem value="UNPAID">Unpaid Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateRange"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date Range</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="date"
                                                variant={"outline"}
                                                className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value?.from ? (
                                                field.value.to ? (
                                                    <>
                                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                                    {format(field.value.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(field.value.from, "LLL dd, y")
                                                )
                                                ) : (
                                                <span>Pick a date range</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={field.value?.from}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                numberOfMonths={2}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0,0,0,0))
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Reason for leave..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit Request
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
           {/* Mock Balances for now - could be fetched from DB later */}
           <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Casual Leaves</h3>
                 <Badge variant="secondary">Used 0/12</Badge>
            </div>
            <div className="p-6 pt-0">
                <div className="text-2xl font-bold">12 Remaining</div>
            </div>
          </div>
           <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Sick Leaves</h3>
                 <Badge variant="secondary">Used 0/10</Badge>
            </div>
            <div className="p-6 pt-0">
                <div className="text-2xl font-bold">10 Remaining</div>
            </div>
          </div>
      </div>

      <div className="rounded-md border">
        {leaves.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-24 text-muted-foreground text-sm">
                No leave requests found.
            </div>
        ) : (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied On</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leaves.map((leave) => {
                        const days = Math.ceil(Math.abs(new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
                        return (
                            <TableRow key={leave.id}>
                                <TableCell className="font-medium capitalize">{leave.type.toLowerCase().replace("_", " ")}</TableCell>
                                <TableCell>
                                    {format(new Date(leave.startDate), "MMM d, yyyy")} - {format(new Date(leave.endDate), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>{days}</TableCell>
                                <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                                <TableCell>
                                    <Badge className={
                                        leave.status === "APPROVED" ? "bg-green-500 hover:bg-green-600" :
                                        leave.status === "REJECTED" ? "bg-red-500 hover:bg-red-600" :
                                        "bg-yellow-500 hover:bg-yellow-600"
                                    }>
                                        {leave.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{format(new Date(leave.createdAt), "MMM d, yyyy")}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )}
      </div>
    </div>
  )
}
