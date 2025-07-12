import DataTable from '@/components/shared/data-table';
import AppendixTableActions from './appendix-table-action';
import { columns } from './columns';

type TContractAppendixTableProps = {
  appendix: any;
  page: number;
  totalAppendix: number;
  pageCount: number;
};

export default function AppendicesTable({
  appendix,
  pageCount
}: TContractAppendixTableProps) {
  return (
    <>
      <AppendixTableActions />
      {appendix && (
        <DataTable columns={columns} data={appendix} pageCount={pageCount} />
      )}
    </>
  );
}
