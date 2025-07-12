import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasePages from '@/components/shared/base-pages';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function AddStudentRecordPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement form submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/student-records');
    }, 2000);
  };

  return (
    <BasePages
      pageHead="Thêm hồ sơ học sinh mới | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Hồ sơ học sinh', link: '/dashboard/student-records' },
        { title: 'Thêm mới', link: '/dashboard/student-records/add' }
      ]}
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Thông tin cơ bản */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    placeholder="Nhập họ và tên học sinh"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Mã học sinh</Label>
                  <Input
                    id="studentId"
                    placeholder="Nhập mã học sinh"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  <Input id="dateOfBirth" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Giới tính</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Lớp</Label>
                  <Input id="class" placeholder="Nhập lớp" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Nhóm máu</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhóm máu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Dị ứng</Label>
                <Textarea
                  id="allergies"
                  placeholder="Nhập các loại dị ứng (nếu có)"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chronicConditions">Bệnh mãn tính</Label>
                <Textarea
                  id="chronicConditions"
                  placeholder="Nhập các bệnh mãn tính (nếu có)"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Thông tin liên hệ khẩn cấp */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ khẩn cấp</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Họ và tên</Label>
                  <Input
                    id="emergencyName"
                    placeholder="Nhập họ và tên người liên hệ"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation">Mối quan hệ</Label>
                  <Input
                    id="emergencyRelation"
                    placeholder="Nhập mối quan hệ với học sinh"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Số điện thoại</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nút điều hướng */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/student-records')}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <Icons.check className="mr-2 h-4 w-4" />
                  <span>Lưu hồ sơ</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </BasePages>
  );
}
