import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
// import AuditTrailTableActions from './audit-trail-table-action';

type TContractAuditTrailTableProps = {
  auditTrail: any;
  page: number;
  totalAuditTrail: number;
  pageCount: number;
};

export default function AuditTrailsTable({
  auditTrail,
  pageCount
}: TContractAuditTrailTableProps) {
  return (
    <>
      {/* <AuditTrailTableActions /> */}
      {auditTrail && (
        <DataTable columns={columns} data={auditTrail} pageCount={pageCount} />
      )}
    </>
  );
}
