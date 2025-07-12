import { useSearchParams } from 'react-router-dom';
import AppendicesTable from './appendix-table';
import { useId } from '@/routes/hooks/use-id';
import { useGetAllAppendixByContract } from '@/queries/appendix.query';
import { useEffect } from 'react';
import { useRefetch } from '@/providers/refetch-provider';

type Props = {};

export default function AppendixInfo({}: Props) {
  const id = useId();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('search') || null;
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading, refetch } = useGetAllAppendixByContract(
    id,
    page,
    pageLimit,
    keyword
  );
  const appendices = data?.listObjects;
  const totalAppendix = data?.paging?.totalRecord;
  const pageCount = Math.ceil(totalAppendix / pageLimit);

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
      <AppendicesTable
        appendix={appendices}
        page={page}
        totalAppendix={totalAppendix}
        pageCount={pageCount}
      />
    </div>
  );
}
