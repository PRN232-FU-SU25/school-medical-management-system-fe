import TableSearchInput from '@/components/shared/table-search-input';

export default function AuditTrailTableActions() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 justify-end">
        <TableSearchInput placeholder="Tìm kiếm" />
      </div>
    </div>
  );
}
