import DataTable from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetEmployeeByDepartmentId } from '@/queries/employee.query';
import { employeeColumns } from '../../helper/employeeColumns';
import { customerColumns } from '../../helper/customerColumns';
import { useGetCustomerByDepartmentId } from '@/queries/customer.query';
import { exportToExcel } from '@/pages/workspace-page/report/helpers';
import { headersCustomerExcel, headersEmployeeExcel } from '@/constants/data';
type Props = {
  departmentId: string;
};

export default function DetailInfo({ departmentId }: Props) {
  const { data: employees, isLoading: employeeLoading } =
    useGetEmployeeByDepartmentId(departmentId);
  const { data: customers, isLoading: customerLoading } =
    useGetCustomerByDepartmentId(departmentId);

  if (employeeLoading || customerLoading) {
    return <>Đang tải...</>;
  }

  const generateReportFileName = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    return `bao-cao-cua-phong-ban-${departmentId}_${date}.xlsx`;
  };

  return (
    <>
      <Tabs defaultValue="employee">
        <TabsList>
          <TabsTrigger value="employee">Nhân viên</TabsTrigger>
          <TabsTrigger value="customer">Khách hàng</TabsTrigger>
        </TabsList>

        <TabsContent value="employee">
          <DataTable columns={employeeColumns} data={employees} pageCount={1} />
          <Button
            className="mt-4 w-full text-base font-normal"
            size={'lg'}
            onClick={() => {
              exportToExcel(
                employees,
                generateReportFileName(),
                headersEmployeeExcel
              );
            }}
          >
            Xuất báo cáo
          </Button>
        </TabsContent>
        <TabsContent value="customer">
          <DataTable columns={customerColumns} data={customers} pageCount={1} />
          <Button
            className="mt-4 w-full text-base font-normal"
            size={'lg'}
            onClick={() => {
              exportToExcel(
                customers,
                generateReportFileName(),
                headersCustomerExcel
              );
            }}
          >
            Xuất báo cáo
          </Button>
        </TabsContent>
      </Tabs>
    </>
  );
}
