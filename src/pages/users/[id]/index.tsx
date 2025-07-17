import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserById } from '@/queries/user.query';

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetUserById(id || '');

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-[300px]" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
              onClick={() => navigate('/dashboard/users')}
            >
              <Icons.chevronLeft className="h-4 w-4" />
              <span className="sr-only">Quay lại</span>
            </Button>
            <CardTitle className="text-teal-900">
              Không tìm thấy người dùng
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-500">
            Người dùng không tồn tại hoặc đã bị xóa.{' '}
            <Link
              to="/dashboard/users"
              className="text-teal-600 hover:underline"
            >
              Quay lại danh sách
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  const roleConfig: Record<
    string,
    { label: string; variant: 'default' | 'secondary' | 'outline' }
  > = {
    Admin: { label: 'Quản trị viên', variant: 'default' },
    SchoolNurse: { label: 'Y tế học đường', variant: 'secondary' },
    Parent: { label: 'Phụ huynh', variant: 'outline' }
  };

  const role = roleConfig[user.role] || {
    label: user.role,
    variant: 'outline'
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            onClick={() => navigate('/dashboard/users')}
          >
            <Icons.chevronLeft className="h-4 w-4" />
            <span className="sr-only">Quay lại</span>
          </Button>
          <CardTitle className="text-teal-900">
            Thông tin người dùng: {user.accountInfo.fullName}
          </CardTitle>
        </div>

        <Button
          variant="outline"
          className="border-teal-600 text-teal-600 hover:bg-teal-50"
          asChild
        >
          <Link to={`/dashboard/users/${id}/edit`}>
            <Icons.pencil className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            {user.accountInfo.avatar ? (
              <img
                src={user.accountInfo.avatar}
                alt={user.accountInfo.fullName}
                className="h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-teal-100 text-4xl font-medium text-teal-700">
                {user.accountInfo.fullName.charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {user.accountInfo.fullName}
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant={role.variant}>{role.label}</Badge>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 rounded-lg border p-6 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-gray-500">
                Số điện thoại
              </div>
              <div className="mt-1">{user.accountInfo.phone || '--'}</div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500">Ngày sinh</div>
              <div className="mt-1">
                {user.accountInfo.dob
                  ? new Date(user.accountInfo.dob).toLocaleDateString('vi-VN')
                  : '--'}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500">Địa chỉ</div>
              <div className="mt-1">{user.accountInfo.address || '--'}</div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500">
                Thông tin khác
              </div>
              <div className="mt-1">{user.accountInfo.otherInfo || '--'}</div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4 text-sm text-gray-500">
            <div>ID: {user.accountId}</div>
            <div>
              Cập nhật lần cuối:{' '}
              {user.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString('vi-VN')
                : 'Chưa cập nhật'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
