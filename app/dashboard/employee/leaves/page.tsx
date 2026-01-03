"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Loader2, Plus } from "lucide-react"

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

const formSchema = z.object({
  type: z.string().min(1, {
    message: "Please select a leave type.",
  }),
  date: z.date(),
  reason: z.string().min(10, {
    message: "Reason must be at least 10 characters.",
  }),
})

export default function LeavesPage() {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setTimeout(() => {
        setIsLoading(false)
        setOpen(false)
        // console.log(values)
        toast.success("Leave application submitted successfully.")
        form.reset()
    }, 1000)
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
                                            <SelectItem value="casual">Casual Leave</SelectItem>
                                            <SelectItem value="sick">Sick Leave</SelectItem>
                                            <SelectItem value="earned">Earned Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
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
                                            placeholder="Doctor's appointment..."
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
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Casual Leaves</h3>
                 <Badge variant="secondary">Used 4/12</Badge>
            </div>
            <div className="p-6 pt-0">
                <div className="text-2xl font-bold">8 Remaining</div>
            </div>
          </div>
           <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Sick Leaves</h3>
                 <Badge variant="secondary">Used 2/10</Badge>
            </div>
            <div className="p-6 pt-0">
                <div className="text-2xl font-bold">8 Remaining</div>
            </div>
          </div>
      </div>

      <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                     <TableHead>Type</TableHead>
                     <TableHead>Date</TableHead>
                     <TableHead>Reason</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead>Applied On</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Casual Leave</TableCell>
                    <TableCell>Oct 26, 2023</TableCell>
                    <TableCell>Family function</TableCell>
                    <TableCell><Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge></TableCell>
                    <TableCell>Oct 20, 2023</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell className="font-medium">Sick Leave</TableCell>
                    <TableCell>Sep 15, 2023</TableCell>
                    <TableCell>Viral Fever</TableCell>
                    <TableCell><Badge className="bg-green-500 hover:bg-green-600">Approved</Badge></TableCell>
                    <TableCell>Sep 14, 2023</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell className="font-medium">Earned Leave</TableCell>
                    <TableCell>Aug 01, 2023 - Aug 05, 2023</TableCell>
                    <TableCell>Vacation</TableCell>
                    <TableCell><Badge variant="destructive">Rejected</Badge></TableCell>
                    <TableCell>Jul 20, 2023</TableCell>
                </TableRow>
            </TableBody>
        </Table>
      </div>
    </div>
  )
}
