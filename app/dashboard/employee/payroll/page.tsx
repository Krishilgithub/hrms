import { getPayroll } from "@/actions/payroll"
import { PayrollViewer } from "@/components/dashboard/payroll-viewer"

export default async function PayrollPage() {
    const payrollRecords = await getPayroll()

    return <PayrollViewer payrollRecords={payrollRecords} />
}
