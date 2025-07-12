import BasePages from '@/components/shared/base-pages.js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import UpdateProfile from './components/UpdateProfile';
import { useEditProile, useGetProfile } from '@/queries/auth.query';
import { toast } from '@/components/ui/use-toast';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { genderInit } from '@/constants/data';

interface FormUpdate {
  firstName: string;
  lastName: string;
  avatar: string;
  gender: number;
  dateOfBirth: string;
  identityCard: string;
}

export default function ProfilePage() {
  const { data: infoUser, isPending, refetch, isError } = useGetProfile();
  const {
    mutateAsync: editProfile,
    isSuccess: isEdited,
    isError: isEditFailed
  } = useEditProile();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const handleUpdate = async (form: FormUpdate) => {
    await editProfile(form);
  };

  // Refetch data sau khi update
  useEffect(() => {
    if (isEdited) {
      setIsUpdateDialogOpen(false);
      refetch();
    }
  }, [isEdited, refetch]);

  // Hiển thị các toast
  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Lỗi tải thông tin',
        duration: 3000
      });
    }
    if (isEditFailed) {
      toast({
        variant: 'destructive',
        title: 'Cập nhật thông tin thất bại',
        duration: 3000
      });
    }
    if (isEdited) {
      toast({
        variant: 'success',
        title: 'Cập nhật thông tin thành công',
        duration: 3000
      });
    }
  }, [isError, isEditFailed, isEdited]);

  if (isError) return;

  return (
    <>
      <BasePages
        className=""
        pageHead="Hồ sơ tài khoản | S-Contract"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Hồ sơ tài khoản', link: '/profile' }
        ]}
      >
        <div className="mt-4 flex items-center justify-center rounded-md bg-white p-10 shadow-lg">
          {isPending ? (
            <DataTableSkeleton columnCount={5} rowCount={10} />
          ) : (
            <div className="flex w-full items-center justify-between gap-10">
              <div className="flex w-2/5 flex-col items-center justify-center gap-8 py-10 text-center">
                {/* Avatar */}
                <Avatar className="h-60 w-60">
                  <AvatarImage
                    src={infoUser?.avatar}
                    alt={infoUser?.fullName}
                  />
                  <AvatarFallback className="bg-gray-800 text-8xl font-light text-white">
                    {infoUser?.firstName[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Tên & Trạng thái */}
                <div>
                  <h2 className="mb-2 text-4xl font-normal">
                    {infoUser?.fullName}
                  </h2>
                  <p className="mb-8 font-normal">{infoUser?.email}</p>
                  <span className="inline-block rounded-md bg-[rgb(52,211,153)] px-4 py-1 text-sm font-normal text-white">
                    {infoUser?.status === 'Online'
                      ? 'Đang làm việc'
                      : 'Đã thôi việc'}
                  </span>
                </div>
              </div>

              <div className="flex w-3/5 flex-col gap-8 pr-20">
                <div className="flex flex-col gap-4">
                  {/* Thông tin chung */}
                  <div className="mb-4">
                    <h2 className="text-xl">Thông tin chung</h2>
                    <div className="mb-5 mt-5 grid grid-cols-2 gap-y-1 pl-10">
                      <p className="">Họ và tên</p>
                      <p className="font-normal">{infoUser?.fullName}</p>

                      <p className="">Giới tính</p>
                      <p className="font-normal">
                        {
                          genderInit.find(
                            (gender) => gender.value === infoUser?.gender
                          )?.valueDisplayed
                        }
                      </p>

                      <p className="">Ngày sinh</p>
                      <p className="font-normal">{infoUser?.dateOfBirth}</p>

                      <p className="">Email liên hệ</p>
                      <p className="font-normal">{infoUser?.email}</p>

                      <p className="">Số điện thoại</p>
                      <p className="font-normal">{infoUser?.phoneNumber}</p>

                      <p className="">CCCD</p>
                      <p className="font-normal">{infoUser?.identityCard}</p>
                    </div>
                  </div>

                  {/* Công việc */}
                  <div>
                    <h2 className="text-xl">Công việc</h2>
                    <div className="mb-5 mt-5 grid grid-cols-2 gap-y-1 pl-10">
                      <p className="">Phòng ban</p>
                      <p className="font-normal">{infoUser?.departmentName}</p>

                      <p className="">Vị trí</p>
                      <p className="font-normal">
                        {infoUser?.roles[0] === 'Admin'
                          ? 'Quản trị viên'
                          : infoUser?.roles[0] === 'Manager'
                            ? 'Quản lí'
                            : 'Nhân viên'}
                      </p>

                      <p className="">Trạng thái</p>
                      <p className="font-normal">
                        {infoUser?.status === 'Online'
                          ? 'Đang làm việc'
                          : 'Đã thôi việc'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <UpdateProfile
                    isOpen={isUpdateDialogOpen}
                    onOpenChange={() =>
                      setIsUpdateDialogOpen(!isUpdateDialogOpen)
                    }
                    userInfo={infoUser}
                    onUpdate={handleUpdate}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </BasePages>
    </>
  );
}
