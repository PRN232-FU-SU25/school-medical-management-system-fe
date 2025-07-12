import DataTable from '@/components/shared/data-table';
import CustomerTableActions from './customer-table-action';
import { columns } from './columns';

type TCustomerTableProps = {
  customer: any;
  page: number;
  totalCustomer: number;
  pageCount: number;
};

export default function CustomerTable({
  customer,
  pageCount
}: TCustomerTableProps) {
  return (
    <>
      <CustomerTableActions />
      {customer && (
        <DataTable columns={columns} data={customer} pageCount={pageCount} />
      )}
    </>
  );
}
