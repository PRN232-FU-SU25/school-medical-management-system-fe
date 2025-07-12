import { useSearchParams } from 'react-router-dom';
import AuditTrailsTable from './audit-trail-table';
import { useEffect } from 'react';
import { useRefetch } from '@/providers/refetch-provider';
import { useGetAllContractHistory } from '@/queries/history.query';
import { useId } from '@/routes/hooks/use-id';

type Props = {};

export default function AuditTrailInfo({}: Props) {
  const id = useId();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('search') || null;
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading, refetch } = useGetAllContractHistory(
    id,
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
