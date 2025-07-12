import { ColumnDef } from '@tanstack/react-table';
import { EmployeeDTO } from '@/pages/workspace-page/employee/helper/types';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Icons } from '@/components/ui/icons';
import { roleTranslations } from '@/pages/workspace-page/employee/helper/data';

export const columnsEmployee = (
  handleDelete: (id: number) => void,
  handleUpdatePopUp: (id: number) => void,
  handleViewDetail: (id: number) => void,
  role: string | null
): ColumnDef<EmployeeDTO>[] => [
  {
    header: 'Họ và tên',
    accessorFn: (key) => key.fullName,
    cell: ({ row }) => (
      <div className="min-w-32  overflow-hidden text-ellipsis whitespace-nowrap">
        {row.original.fullName}
      </div>
    )
  },
  {
    header: 'Số điện thoại',
    accessorFn: (key) => key.phoneNumber,
    cell: ({ row }) => (
      <div className="text-center">{row.original.phoneNumber}</div>
    )
  },
  {
    header: 'Email',
    accessorFn: (key) => key.email,
    cell: ({ row }) => (
      <div className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
        {row.original.email}
      </div>
    )
  },
  {
    header: 'Chức vụ',
    accessorFn: (key) => key.roles,
    cell: ({ row }) => {
      const roles = row.original.roles;

      const translatedRoles = roles
        .map((role: any) => {
          const translation = roleTranslations.find(
            (item) => item.role === role
          );

          return translation ? translation.translated : role;
        })
        .join(', ');

      return <div className="text-center">{translatedRoles}</div>;
    }
  },
  {
    header: 'Hình đại diện',
    accessorFn: (key) => key.avatar,
    cell: ({ row }) => (
      <img
        src={row.original.avatar ?? 'HI'}
        alt={row.original.fullName}
        className="h-24 w-24 object-cover text-center"
      />
    )
  },
  {
    header: 'Tình trạng',
    accessorFn: (key) => key.status,
    cell: ({ row }) => (
      <div className="max-w-20 text-center">{row.original.status}</div>
    )
  },
  {
    header: 'Hành động',
    cell: ({ row }) => (
      <div className="flex items-center justify-around  ">
        {role === 'Manager' && (
          <>
            <Button
              className="w-auto bg-primary text-center text-xs  text-white"
              onClick={() => handleViewDetail(row.original.id)}
            >
              Xem chi tiết
            </Button>
          </>
        )}
        {role === 'Admin' && (
          <>
            <Button
              className="w-auto bg-primary text-center text-xs  text-white"
              onClick={() => handleViewDetail(row.original.id)}
            >
              Xem chi tiết
            </Button>
            <Button
              className="w-auto bg-yellow-400 text-xs text-white"
              onClick={() => handleUpdatePopUp(row.original.id)}
            >
              Chỉnh sửa
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-[rgb(239,68,68)] px-6 text-base text-white"
                  size={'lg'}
                >
                  Xóa
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-1/3 rounded-lg bg-white p-6 shadow-lg">
                <AlertDialogHeader>
                  <Icons.warning
                    color="rgb(250,207,36)"
                    width="full"
                    size="100"
                  />
                  <AlertDialogTitle className="text-center text-3xl">
                    Cảnh báo
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Bạn sẽ không thể khôi phục lại hành động này
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogAction
                    className="w-1/2 border-2 border-red-400 bg-secondary text-red-400"
                    onClick={() => handleDelete(row.original.id)}
                  >
                    Chấp nhận
                  </AlertDialogAction>
                  <AlertDialogCancel className="w-1/2">Hủy</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    )
  }
];
