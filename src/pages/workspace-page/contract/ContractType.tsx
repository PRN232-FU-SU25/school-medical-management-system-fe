import BasePages from '@/components/shared/base-pages.js';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRefetch } from '@/providers/refetch-provider';
import { useGetAllContractType } from '@/queries/contract.query';
import ContractTypeTable from './components/contract-type-table';

export default function ContractTypePage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('search') || null;
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading, refetch } = useGetAllContractType(
    page,
    pageLimit,
    keyword
  );
  const contractType = data?.listObjects;
  const totalContractType = data?.paging?.totalRecord;
  const pageCount = Math.ceil(totalContractType / pageLimit);

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
        pageHead="Các loại hợp đồng | S-Contract"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Các loại hợp đồng', link: '/contract/type' }
        ]}
      >
        <div className="mt-4 flex flex-col gap-8 rounded-md bg-white p-6 shadow-md">
          <ContractTypeTable
            contractType={contractType}
            page={page}
            totalContractType={totalContractType}
            pageCount={pageCount}
          />
        </div>
      </BasePages>
    </>
  );
}
