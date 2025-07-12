import DataTable from '@/components/shared/data-table';
import DepartmentTableActions from './department-table-action';
import { columns } from './columns';

type TContractDepartmentTableProps = {
  department: any;
  page: number;
  totalDepartment: number;
  pageCount: number;
};

export default function DepartmentTable({
  department,
  pageCount
}: TContractDepartmentTableProps) {
  return (
    <>
      <DepartmentTableActions />
      {department && (
        <DataTable columns={columns} data={department} pageCount={pageCount} />
      )}
    </>
  );
}
