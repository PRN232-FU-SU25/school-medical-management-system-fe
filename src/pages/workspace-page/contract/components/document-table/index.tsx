import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import DocumentTableActions from './document-table-action';

type TContractDocumentTableProps = {
  document: any;
  page: number;
  totalDocument: number;
  pageCount: number;
};

export default function DocumentsTable({
  document,
  pageCount
}: TContractDocumentTableProps) {
  return (
    <>
      <DocumentTableActions />
      {document && (
        <DataTable columns={columns} data={document} pageCount={pageCount} />
      )}
    </>
  );
}
