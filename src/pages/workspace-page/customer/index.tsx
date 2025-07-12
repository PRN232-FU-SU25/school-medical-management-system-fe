import BasePages from '@/components/shared/base-pages.js';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRefetch } from '@/providers/refetch-provider';
import { useGetAllCustomerByRole } from '@/queries/customer.query';
import CustomerTable from './component/customer-table';

export default function CustomerPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('search') || null;
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading, refetch } = useGetAllCustomerByRole(
    page,
    pageLimit,
    keyword
  );
  const customer = data?.listObjects;
  const totalCustomer = data?.paging?.totalRecord;
  const pageCount = Math.ceil(totalCustomer / pageLimit);

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
        pageHead="Phòng ban | S-Contract"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Phòng ban', link: '/Customer' }
        ]}
      >
        <div className="mt-4 flex flex-col gap-8 rounded-md bg-white p-6 shadow-md">
          <CustomerTable
            customer={customer}
            page={page}
            totalCustomer={totalCustomer}
            pageCount={pageCount}
          />
        </div>
      </BasePages>
    </>
  );
}
