import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRefetch } from '@/providers/refetch-provider';
import { useId } from '@/routes/hooks/use-id';
import AuditTrailsTable from '../audit-trail-table';

type Props = {
  itemId: string;
  useGetHistory: any;
};

export default function AuditTrailTableDialog({
  itemId,
  useGetHistory
}: Props) {
  const id = useId();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('search') || null;
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading, refetch } = useGetHistory(
    id,
    itemId,
    page,
    pageLimit,
    keyword
  );
  const auditTrails = data?.listObjects;
  const totalAuditTrails = data?.paging?.totalRecord;
  const pageCount = Math.ceil(totalAuditTrails / pageLimit);

  useEffect(() => {
    refetch();
  }, [page, pageLimit, keyword]);

  const { setRefetch } = useRefetch();

  useEffect(() => {
    if (refetch) {
      setRefetch(() => refetch);
    }
  }, [refetch, setRefetch]);

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <AuditTrailsTable
        auditTrail={auditTrails}
        page={page}
        totalAuditTrail={totalAuditTrails}
        pageCount={pageCount}
      />
    </div>
  );
}
