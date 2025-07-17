import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { useGetUserById, useUpdateUser } from '@/queries/user.query';
import { useUploadFile } from '@/queries/file.query';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    role: '',
    avatar: '',
    otherInfo: ''
  });

  const { data: user, isLoading } = useGetUserById(id || '');
  const updateUser = useUpdateUser();
  const uploadFile = useUploadFile();

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.accountInfo.fullName,
        email: user.email,
        phone: user.accountInfo.phone || '',
        address: user.accountInfo.address || '',
        dob: user.accountInfo.dob || '',
        role: user.role,
        avatar: user.accountInfo.avatar || '',
        otherInfo: user.accountInfo.otherInfo || ''
      });
    }
  }, [user]);

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const response = await uploadFile.mutateAsync(file);
      setFormData((prev) => ({ ...prev, avatar: response.fileUrl }));
      toast({
        title: 'Thành công',
        description: 'Đã tải lên ảnh đại diện thành công',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể tải lên ảnh. Vui lòng thử lại',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await updateUser.mutateAsync({
        id,
        user: {
          ...formData,
          dob: formData.dob
            ? new Date(formData.dob).toISOString().split('T')[0]
            : undefined
        }
      });

      toast({
        title: 'Thành công',
        description: 'Đã cập nhật thông tin người dùng thành công',
        variant: 'default'
      });

      navigate('/dashboard/users');
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-[200px]" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
              onClick={() => navigate('/dashboard/users')}
            >
              <Icons.chevronLeft className="h-4 w-4" />
              <span className="sr-only">Quay lại</span>
            </Button>
            <CardTitle className="text-teal-900">
              Chỉnh sửa thông tin: {user?.accountInfo.fullName}
            </CardTitle>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700"
              disabled={updateUser.isPending}
            >
              {updateUser.isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Lưu thay đổi
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="avatar">Ảnh đại diện</Label>
              <div className="flex items-center gap-4">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-100 text-2xl font-medium text-teal-700">
                    {formData.fullName.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                    className="max-w-[300px]"
                  />
                  {isUploading && (
                    <Icons.spinner className="mt-2 h-4 w-4 animate-spin text-teal-600" />
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Ngày sinh</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Quản trị viên</SelectItem>
                    <SelectItem value="SchoolNurse">Y tế học đường</SelectItem>
                    <SelectItem value="Parent">Phụ huynh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value
                    }))
                  }
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="otherInfo">Thông tin khác</Label>
                <Input
                  id="otherInfo"
                  value={formData.otherInfo}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      otherInfo: e.target.value
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
