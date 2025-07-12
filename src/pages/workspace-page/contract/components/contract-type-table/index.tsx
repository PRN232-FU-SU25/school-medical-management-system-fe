import DataTable from '@/components/shared/data-table';
import ContractTypeTableActions from './contract-type-table-action';
import { columns } from './columns';

type TContractContractTypeTableProps = {
  contractType: any;
  page: number;
  totalContractType: number;
  pageCount: number;
};

export default function ContractTypeTable({
  contractType,
  pageCount
}: TContractContractTypeTableProps) {
  return (
    <>
      <ContractTypeTableActions />
      {contractType && (
        <DataTable
          columns={columns}
          data={contractType}
          pageCount={pageCount}
        />
      )}
    </>
  );
}
