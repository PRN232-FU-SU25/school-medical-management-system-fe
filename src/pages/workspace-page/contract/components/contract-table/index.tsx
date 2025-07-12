import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import ContractTableActions from './contract-table-action';

type TContractsTableProps = {
  contracts: any;
  page: number;
  totalContracts: number;
  pageCount: number;
};

export default function ContractsTable({
  contracts,
  pageCount
}: TContractsTableProps) {
  return (
    <>
      <ContractTableActions />
      {contracts && (
        <DataTable columns={columns} data={contracts} pageCount={pageCount} />
      )}
    </>
  );
}
