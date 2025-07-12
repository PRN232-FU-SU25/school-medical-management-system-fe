/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import BasePages from '@/components/shared/base-pages.js';
import { useEffect, useState } from 'react';
import {
  useDeleteEmployee,
  useDeleteManager,
  useGetDataEmployee,
  useGetDataManager
} from '@/queries/employee.query';
import { toast } from '@/components/ui/use-toast';
import CreateEmployeeDialog from './components/create-employee';
import UpdateEmployeeDialog from './components/update-employee';
import DetailEmployee from './components/detail-employee';
import { columnsEmployee } from '@/pages/workspace-page/employee/employee-table/columns';
import EmployeeDataTable from '@/pages/workspace-page/employee/employee-table/table-employee';
import TableSearchInput from '@/components/shared/table-search-input';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams } from 'react-router-dom';
export type EmployeePaginationType = {
  pageIndex: number;
  pageSize: number;
  keyword: string;
  orderDate: number;
  totalRecord: number;
  departmentId: number;
};
let tab = 'employee';
export default function EmployeePage() {
  const { mutateAsync: getAllEmployeeData, isPending: loadData } =
    useGetDataEmployee();
  const { mutateAsync: getAllManagerData, isPending: isPendingGetDataManager } =
    useGetDataManager();
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;
  const [searchParams, setSearchParams] = useSearchParams();
  const displayFromUrl = searchParams.get('display') || 'employee';
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleTabClick = (display: string) => {
    searchParams.set('display', display);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      display,
      page: '1'
    });
    tab = display;

    setIsChange(true);
  };

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [selectedUpdateEmployeeId, setSelectedUpdateEmployeeId] = useState<
    number | null
  >(null);

  const [employeePagingData, setEmployeePagingData] = useState<any>();
  // Handle delete employee without API
  const { mutateAsync: deleteEmployee } = useDeleteEmployee();
  const { mutateAsync: deleteManager } = useDeleteManager();
  const handleDelete = async (id: number) => {
    try {
      let response;
      if (tab === 'manager') {
        response = await deleteManager(id);
      } else if (tab === 'employee') {
        response = await deleteEmployee(id);
      }

      if (response.success) {
        toast({
          variant: 'success',
          title: `Xóa ${tab === 'manager' ? 'quản lý' : 'nhân viên'} thành công`
        });
        const page = searchParams?.get('page') ?? '1';
        const pageAsNumber = Number(page);
        const searchInput = searchParams?.get('search') ?? '';
        const per_page = searchParams?.get('limit') ?? '10';
        const searchObject = {
          pageIndex: pageAsNumber,
          pageSize: Number.parseInt(per_page),
          keyword: searchInput.trim()
        };
        let responseLoadData;

        if (tab === 'manager') {
          responseLoadData = await getAllManagerData(searchObject); // Call API for managers
        } else if (tab === 'employee') {
          responseLoadData = await getAllEmployeeData(searchObject); // Call API for employees
        }

        setEmployeePagingData(responseLoadData ?? []);
      } else {
        toast({
          variant: 'destructive',
          title: 'Xóa nhân viên thất bại',
          description: 'Đã xảy ra lỗi khi xóa nhân viên.'
        });
      }
    } catch (error: any) {
      if (error.errors === null) {
        toast({
          variant: 'destructive',
          title: 'Xóa nhân viên thất bại',
          description: error.data
        });
        return;
      }
      toast({
        variant: 'destructive',
        title: 'Xóa nhân viên thất bại',
        description: error.message
      });
    }
  };

  // Hanle Open Close dialog
  const handleCloseDialog = () => {
    setSelectedEmployeeId(null);
  };

  const handleViewDetail = async (id: number) => {
    setSelectedEmployeeId(id);
  };

  const handleCloseUpdateDialog = () => {
    setSelectedUpdateEmployeeId(null);
  };

  const handleUpdatePopUp = async (id: number) => {
    setSelectedUpdateEmployeeId(id);
  };

  return (
    <>
      <BasePages
        className=""
        pageHead="Nhân viên | S-Contract"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Nhân viên', link: '/employee' }
        ]}
      >
        <div className="mt-2  rounded-md bg-white p-6 shadow-lg">
          {role === 'Admin' && (
            <div className="my-3 flex justify-center">
              <Tabs defaultValue={tab} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="employee"
                    onClick={() => {
                      handleTabClick('employee');
                    }}
                  >
                    Nhân viên
                  </TabsTrigger>
                  <TabsTrigger
                    value="manager"
                    onClick={() => {
                      handleTabClick('manager');
                    }}
                  >
                    Quản lý
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
          <div className="flex w-full items-center justify-between gap-10">
            {role === 'Admin' && (
              <CreateEmployeeDialog
                setEmployeePagingData={setEmployeePagingData}
                tab={tab}
              />
            )}

            {selectedUpdateEmployeeId !== null && (
              <UpdateEmployeeDialog
                id={selectedUpdateEmployeeId}
                onClose={handleCloseUpdateDialog}
                setEmployeePagingData={setEmployeePagingData}
                tab={tab}
              />
            )}
            {selectedEmployeeId !== null && (
              <DetailEmployee
                id={selectedEmployeeId}
                onClose={handleCloseDialog}
              />
            )}
            <div className="flex flex-1 justify-end">
              <TableSearchInput
                placeholder={
                  tab === 'manager' ? 'Tìm kiếm quản lý' : 'Tìm kiếm nhân viên'
                }
              />
            </div>
          </div>
          <div className=" mx-auto  my-4">
            <EmployeeDataTable
              key={JSON.stringify(employeePagingData?.listObjects)}
              columns={columnsEmployee(
                handleDelete,
                handleUpdatePopUp,
                handleViewDetail,
                role
              )}
              displayDataRole={tab}
              data={employeePagingData?.listObjects ?? []}
              pageCount={employeePagingData?.paging.totalPages ?? 0}
              isChange={isChange}
              setIsChange={setIsChange}
            />
          </div>
        </div>
      </BasePages>
    </>
  );
}
