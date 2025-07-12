import BasePages from '@/components/shared/base-pages.js';
import { useSearchParams } from 'react-router-dom';
import ContractsTable from './components/contract-table';
import { useGetAllNearlyExpiredContract } from '@/queries/contract.query';
import { useEffect } from 'react';
import { useRefetch } from '@/providers/refetch-provider';

export default function AlmostExpiredPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('search') || null;
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading, refetch } = useGetAllNearlyExpiredContract(
    page,
    pageLimit,
    keyword
  );
  const contracts = data?.listObjects;
  const totalContracts = data?.paging?.totalRecord;
  const pageCount = Math.ceil(totalContracts / pageLimit);

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
    <>
      <BasePages
        className=""
        pageHead="Hợp đồng gần hết hạn | S-Contract"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          {
            title: 'Hợp đồng gần hết hạn',
            link: '/contract/all-almost-expired'
          }
        ]}
      >
        <div className="mt-4 flex flex-col gap-8 rounded-md bg-white p-6 shadow-md">
          <ContractsTable
            contracts={contracts}
            page={page}
            totalContracts={totalContracts}
            pageCount={pageCount}
          />
        </div>
      </BasePages>
    </>
  );
}
