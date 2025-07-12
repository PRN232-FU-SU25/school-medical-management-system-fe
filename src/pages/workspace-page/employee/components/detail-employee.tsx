import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  convertToDateFromAPI,
  getGenderDisplay
} from '@/pages/workspace-page/employee/helper/util';
import { useGetEmployeeById } from '@/queries/employee.query';
import { exportToExcel } from '../../report/helpers';
import { headersContractExcel } from '@/constants/data';
import DataTable from '@/components/shared/data-table';
import { contractColumns } from '../../report/column';
import { useGetAllContractOfEmployee } from '@/queries/contract.query';

export default function DetailEmployee({
  id,
  onClose
}: {
  id: number;
  onClose: () => void;
}) {
  const { data: employeeByIdData, isPending, error } = useGetEmployeeById(id);
  const { data: contracts, isLoading: contractLoading } =
    useGetAllContractOfEmployee(id);
  const generateReportFileName = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    return `bao-cao-hop-dong-cua-nhan-vien-${id}_${date}.xlsx`;
  };

  if (error) {
    console.error('Error fetching employee data:', error);
  }
  return (
    <Dialog
      open={true} // Mở dialog khi có id
      onOpenChange={(open) => {
        if (!open) {
          onClose(); // Đóng và reset ID khi đóng dialog
        }
      }}
    >
      <DialogContent
        aria-description="Form for display detail of employee"
        className=" max-h-[101vh] w-4/5  max-w-screen-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Thông tin nhân viên
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-10">
          <div className="grid grid-rows-2 gap-3 ">
            <div className="space-y-1">
              <Label>Họ và tên</Label>
              {isPending ? (
                <Skeleton className="h-2/5 w-full  bg-gray-300" />
              ) : (
                <Input
                  type="text"
                  className="w-full rounded border p-2"
                  value={employeeByIdData?.fullName}
                  readOnly={true}
                />
              )}
            </div>
            <div className="space-y-1">
              <Label>Số CCCD</Label>
              {isPending ? (
                <Skeleton className="h-2/5 w-full  bg-gray-300" />
              ) : (
                <Input
                  type="text"
                  className="w-full rounded border p-2"
                  value={employeeByIdData?.identityCard}
                  readOnly={true}
                />
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label>Hình đại diện</Label>
            <div className="flex justify-center">
              {isPending ? (
                <Skeleton className="h-48 w-48  bg-gray-300" />
              ) : (
                <img
                  src={employeeByIdData?.avatar}
                  alt={employeeByIdData?.fullName}
                  className="h-48 w-48"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <Label>Số điện thoại</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={employeeByIdData?.phoneNumber}
                readOnly={true}
              />
            )}
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={employeeByIdData?.email}
                readOnly={true}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <Label>Ngày sinh</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={convertToDateFromAPI(employeeByIdData?.dateOfBirth)}
                readOnly={true}
              />
            )}
          </div>
          <div className="space-y-1">
            <Label>Giới tính</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={getGenderDisplay(employeeByIdData?.gender)}
                readOnly={true}
              />
            )}
          </div>
          <div className="space-y-1">
            <Label>Tài khoản</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={employeeByIdData?.username} // fix lại
                readOnly={true}
              />
            )}
          </div>
          <div className="space-y-1">
            <Label>Chức vụ</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={employeeByIdData?.roles}
                readOnly={true}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <Label>Phòng ban</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={employeeByIdData?.departmentName} // fix
                readOnly={true}
              />
            )}
          </div>
          <div className="space-y-1">
            <Label>Trạng thái</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={employeeByIdData?.status} // fix
                readOnly={true}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <Label>Ngày tạo</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={employeeByIdData?.createdDate} // fix
                readOnly={true}
              />
            )}
          </div>
          <div className="space-y-1">
            <Label>Tạo bởi</Label>
            {isPending ? (
              <Skeleton className="h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={employeeByIdData?.createdBy} // fix
                readOnly={true}
              />
            )}
          </div>
          {employeeByIdData?.modifiedDate && (
            <>
              <div className="space-y-1">
                <Label>Ngày chỉnh sửa</Label>
                {isPending ? (
                  <Skeleton className="h-10 w-full  bg-gray-300" />
                ) : (
                  <Input
                    type="text"
                    className="w-full rounded border p-2"
                    value={employeeByIdData?.modifiedDate} // fix
                    readOnly={true}
                  />
                )}
              </div>
            </>
          )}
          {employeeByIdData?.modifiedBy && (
            <>
              <div className="space-y-1">
                <Label>Chỉnh sửa bởi</Label>
                {isPending ? (
                  <Skeleton className="h-10 w-full  bg-gray-300" />
                ) : (
                  <Input
                    type="text"
                    className="w-full rounded border p-2"
                    value={employeeByIdData?.modifiedBy} // fix
                    readOnly={true}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {!contractLoading && employeeByIdData?.roles[0] === 'Employee' && (
          <>
            <DataTable
              columns={contractColumns}
              data={contracts?.listObjects}
              pageCount={1}
            />
            <Button
              className="mt-4 w-full text-base font-normal"
              size={'lg'}
              onClick={() => {
                exportToExcel(
                  contracts?.listObjects,
                  generateReportFileName(),
                  headersContractExcel
                );
              }}
            >
              Xuất báo cáo
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
