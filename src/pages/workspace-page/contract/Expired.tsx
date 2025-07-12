import BasePages from '@/components/shared/base-pages.js';
import { useSearchParams } from 'react-router-dom';
import ContractsTable from './components/contract-table';
import { useGetAllExpiredContract } from '@/queries/contract.query';
import { useEffect } from 'react';
import { useRefetch } from '@/providers/refetch-provider';

export default function ExpiredPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('search') || null;
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading, refetch } = useGetAllExpiredContract(
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
        pageHead="Hợp đồng hết hạn | S-Contract"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Hợp đồng hết hạn', link: '/contract/all-expired' }
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
