import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import ServiceTableActions from './service-table-action';

type TContractServiceTableProps = {
  service: any;
  page: number;
  totalService: number;
  pageCount: number;
};

export default function ServicesTable({
  service,
  pageCount
}: TContractServiceTableProps) {
  return (
    <>
      <ServiceTableActions />
      {service && (
        <DataTable columns={columns} data={service} pageCount={pageCount} />
      )}
    </>
  );
}
