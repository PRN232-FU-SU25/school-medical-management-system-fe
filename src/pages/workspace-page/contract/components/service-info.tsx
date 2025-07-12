import { useSearchParams } from 'react-router-dom';
import ServicesTable from './service-table';
import { useId } from '@/routes/hooks/use-id';
import { useGetAllServiceByContract } from '@/queries/service.query';
import { useRefetch } from '@/providers/refetch-provider';
import { useEffect } from 'react';

type Props = {};

export default function ServiceInfo({}: Props) {
  const id = useId();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('search') || null;
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading, refetch } = useGetAllServiceByContract(
    id,
    page,
    pageLimit,
    keyword
  );
  const services = data?.listObjects;
  const totalServices = data?.paging?.totalRecord;
  const pageCount = Math.ceil(totalServices / pageLimit);

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
      <ServicesTable
        service={services}
        page={page}
        totalService={totalServices}
        pageCount={pageCount}
      />
    </div>
  );
}
