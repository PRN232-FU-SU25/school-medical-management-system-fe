import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function AddMedicalEventPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement form submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/medical-events');
    }, 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Thông tin sự kiện */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin sự kiện</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    placeholder="Nhập tiêu đề sự kiện"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Loại sự kiện</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại sự kiện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Cấp cứu</SelectItem>
                      <SelectItem value="accident">Tai nạn</SelectItem>
                      <SelectItem value="illness">Bệnh tật</SelectItem>
                      <SelectItem value="injury">Chấn thương</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Ngày xảy ra</Label>
                  <Input id="date" type="datetime-local" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Địa điểm</Label>
                  <Input
                    id="location"
                    placeholder="Nhập địa điểm xảy ra"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả chi tiết</Label>
                <Textarea
                  id="description"
                  placeholder="Nhập mô tả chi tiết về sự kiện"
                  className="min-h-[100px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Thông tin học sinh liên quan */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin học sinh liên quan</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Mã học sinh</Label>
                  <Input
                    id="studentId"
                    placeholder="Nhập mã học sinh"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentName">Họ và tên</Label>
                  <Input
                    id="studentName"
                    placeholder="Nhập họ và tên học sinh"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Lớp</Label>
                  <Input id="class" placeholder="Nhập lớp" required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin xử lý */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin xử lý</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="handledBy">Người xử lý</Label>
                  <Input
                    id="handledBy"
                    placeholder="Nhập tên người xử lý"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Đang xử lý</SelectItem>
                      <SelectItem value="resolved">Đã xử lý</SelectItem>
                      <SelectItem value="monitoring">Đang theo dõi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="actions">Hành động xử lý</Label>
                <Textarea
                  id="actions"
                  placeholder="Nhập các hành động đã thực hiện để xử lý sự kiện"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Nhập ghi chú bổ sung (nếu có)"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Nút điều hướng */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/medical-events')}
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
                  <span>Lưu sự kiện</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
