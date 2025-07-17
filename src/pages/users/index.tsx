import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import { Link } from 'react-router-dom';
import DataTable from '@/components/shared/data-table';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
  useGetUsers,
  useDeleteUser,
  useImportParentAccounts
} from '@/queries/user.query';
import * as XLSX from 'xlsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface User {
  accountId: number;
  email: string;
  createdAt: string;
  updateAt: string;
  role: string;
  isDeleted: boolean;
  accountInfo: {
    accountId: number;
    fullName: string;
    avatar: string;
    phone: string;
    address: string;
    dob: string;
    otherInfo: string;
  };
}

export default function UsersPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: users, isLoading, refetch } = useGetUsers(1, 10);
  const deleteUser = useDeleteUser();
  const importParentAccounts = useImportParentAccounts();

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser.mutateAsync(selectedUser.accountId.toString());
      toast({
        title: 'Thành công',
        description: 'Đã xóa người dùng thành công',
        variant: 'default'
      });
      refetch();
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi',
        variant: 'destructive'
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const columns = [
    {
      accessorKey: 'fullName',
      header: 'Họ và tên',
      cell: ({ row }: { row: { original: User } }) => (
        <div className="flex items-center gap-2">
          {row.original.accountInfo.avatar ? (
            <img
              src={row.original.accountInfo.avatar}
              alt={row.original.accountInfo.fullName}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-medium text-teal-700">
              {row.original.accountInfo.fullName.charAt(0)}
            </div>
          )}
          <div className="font-medium text-teal-900">
            {row.original.accountInfo.fullName}
          </div>
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'phone',
      header: 'Số điện thoại',
      cell: ({ row }: { row: { original: User } }) => (
        <div>{row.original.accountInfo.phone || '--'}</div>
      )
    },
    {
      accessorKey: 'role',
      header: 'Vai trò',
      cell: ({ row }: { row: { original: User } }) => {
        const roleConfig: Record<
          string,
          { label: string; variant: 'default' | 'secondary' | 'outline' }
        > = {
          Admin: { label: 'Quản trị viên', variant: 'default' },
          SchoolNurse: { label: 'Y tế học đường', variant: 'secondary' },
          Parent: { label: 'Phụ huynh', variant: 'outline' }
        };
        const config = roleConfig[row.original.role] || {
          label: row.original.role,
          variant: 'outline'
        };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      }
    },
    {
      id: 'actions',
      cell: ({ row }: { row: { original: User } }) => {
        const user = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
              asChild
            >
              <Link to={`/dashboard/users/${user.accountId}`}>
                <Icons.eye className="h-4 w-4" />
                <span className="sr-only">Xem chi tiết</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
              asChild
            >
              <Link to={`/dashboard/users/${user.accountId}/edit`}>
                <Icons.pencil className="h-4 w-4" />
                <span className="sr-only">Chỉnh sửa</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => {
                setSelectedUser(user);
                setIsDeleteDialogOpen(true);
              }}
            >
              <Icons.trash className="h-4 w-4" />
              <span className="sr-only">Xóa</span>
            </Button>
          </div>
        );
      }
    }
  ];

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-[250px]" />
              <Skeleton className="h-10 w-[150px]" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredUsers = (users?.items || []).filter((user: User) => {
    const matchesSearch =
      !searchQuery ||
      user.accountInfo.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.accountInfo.phone && user.accountInfo.phone.includes(searchQuery));

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">Quản lý người dùng</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
              onClick={() => {
                const excelData = filteredUsers.map((user: User) => ({
                  'Họ và tên': user.accountInfo.fullName,
                  Email: user.email,
                  'Số điện thoại': user.accountInfo.phone || '',
                  'Địa chỉ': user.accountInfo.address || '',
                  'Ngày sinh': user.accountInfo.dob
                    ? new Date(user.accountInfo.dob).toLocaleDateString('vi-VN')
                    : '',
                  'Vai trò': user.role
                }));

                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(excelData);

                const columnWidths = [
                  { wch: 30 }, // Họ và tên
                  { wch: 30 }, // Email
                  { wch: 15 }, // Số điện thoại
                  { wch: 40 }, // Địa chỉ
                  { wch: 15 }, // Ngày sinh
                  { wch: 15 } // Vai trò
                ];
                ws['!cols'] = columnWidths;

                XLSX.utils.book_append_sheet(wb, ws, 'Danh sách người dùng');
                XLSX.writeFile(
                  wb,
                  `danh-sach-nguoi-dung-${
                    new Date().toISOString().split('T')[0]
                  }.xlsx`
                );
              }}
            >
              <Icons.download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
              onClick={() => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.xlsx, .xls';
                fileInput.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    importParentAccounts.mutate(file);
                  }
                };
                fileInput.click();
                refetch();
              }}
            >
              <Icons.upload className="mr-2 h-4 w-4" />
              Nhập dữ liệu PHHS
            </Button>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/dashboard/users/create">
                <Icons.plus className="mr-2 h-4 w-4" />
                Thêm y tế học đường
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:max-w-[300px]"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Lọc theo vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả vai trò</SelectItem>
                  <SelectItem value="Admin">Quản trị viên</SelectItem>
                  <SelectItem value="SchoolNurse">Y tế học đường</SelectItem>
                  <SelectItem value="Parent">Phụ huynh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DataTable
              columns={columns}
              data={filteredUsers}
              pageCount={users?.totalPages || 0}
            />
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa người dùng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa người dùng "
              {selectedUser?.accountInfo.fullName}" không? Hành động này không
              thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              {deleteUser.isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Xác nhận xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
