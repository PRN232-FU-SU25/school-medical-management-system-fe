import BasePages from '@/components/shared/base-pages.js';
import DataTable from '@/components/shared/data-table';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { buttonList, ContractGetListDTO } from '@/constants/data';
import { useGetOverviewData } from '@/queries/overview.query';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { columns } from '../contract/components/contract-table/columns';
import { useGetAllContractOverview } from '@/queries/contract.query';
import __helpers from '@/helpers';

export default function OverviewPage() {
  const auth = useSelector((state: RootState) => state.auth);
  const [contracts, setContracts] = useState<any>();
  const role = auth.role;
  const { data, isLoading } = useGetOverviewData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: getData } = useGetAllContractOverview();

  const filteredButtons = buttonList.filter((button) =>
    button.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickOverview = async (subModel: any) => {
    const res = await getData({
      ...ContractGetListDTO,
      ...subModel
    });
    setContracts(res?.listObjects);
  };

  const overviewData = [
    {
      name: 'Hợp đồng trong tháng',
      value: data?.totalContractInMonth,
      model: {
        signedDate: __helpers.getStartAndEndOfMonth()
      }
    },
    {
      name: 'Hợp đồng gần hết hạn trong tháng',
      value: data?.totalAlmostExpiredContractInMonth,
      model: {
        expirationDate: __helpers.createExpirationRange()
      }
    },
    {
      name: 'Hợp đồng hết hạn trong tháng',
      value: data?.totalExpiredContractInMonth,
      model: {
        expirationDate: __helpers.getStartAndEndOfMonth(),
        isExpired: true
      }
    },
    {
      name: 'Hợp đồng đã cập nhật trong tháng',
      value: data?.totalModifiedContractInMonth,
      model: {
        signedDate: __helpers.getStartAndEndOfMonth()
      }
    }
  ];

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <BasePages
      pageHead="Tổng quan | S-Contract"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Tổng quan', link: '/' }
      ]}
    >
      <div className="overview h-full w-full">
        <div className="mb-4 mt-2 grid grid-cols-4 gap-4">
          {overviewData?.map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-primary p-4 text-white"
              onClick={() => handleClickOverview(item.model)}
            >
              <p className="mb-2 text-base">{item.name}</p>
              <p className="text-4xl">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-6">
          <div className="flex items-center justify-center py-4">
            <div className="relative flex w-full items-center justify-center">
              <div className="relative w-2/3">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsOpen(e.target.value.length > 0);
                  }}
                  className="h-16 w-full rounded-xl bg-secondary bg-white pl-16 text-base font-normal text-gray-800 shadow-md placeholder:text-base placeholder:font-light placeholder:text-gray-300 focus:border-sky-600"
                  placeholder="Tìm kiếm nhanh..."
                />
                <Icons.search className="absolute left-6 top-1/2 size-6 -translate-y-1/2 text-gray-800" />
              </div>
            </div>
          </div>

          {isOpen && (
            <div className="absolute left-1/2 z-10 max-h-60 w-2/3 -translate-x-1/2 overflow-y-auto rounded-xl border border-sky-600 bg-white shadow-md">
              {filteredButtons.length > 0 ? (
                filteredButtons.map((button, index) => {
                  if (!role || !button.access?.includes(role)) return;
                  return (
                    <Link
                      to={button.href}
                      key={index}
                      className="block px-6 py-3 text-gray-800 hover:bg-gray-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {button.title}
                    </Link>
                  );
                })
              ) : (
                <div className="px-6 py-3 text-gray-500">
                  Không có kết quả nào
                </div>
              )}
            </div>
          )}
        </div>

        {contracts && (
          <div className="mt-6 flex flex-col gap-8">
            <DataTable columns={columns} data={contracts} pageCount={1} />
          </div>
        )}
      </div>
    </BasePages>
  );
}
