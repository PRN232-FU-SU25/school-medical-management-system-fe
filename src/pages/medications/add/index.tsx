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

export default function AddMedicationPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement form submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/medications');
    }, 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Thông tin cơ bản */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin thuốc</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên thuốc</Label>
                  <Input id="name" placeholder="Nhập tên thuốc" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Loại thuốc</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại thuốc" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="antibiotic">Kháng sinh</SelectItem>
                      <SelectItem value="painkiller">Giảm đau</SelectItem>
                      <SelectItem value="fever">Hạ sốt</SelectItem>
                      <SelectItem value="allergy">Chống dị ứng</SelectItem>
                      <SelectItem value="vitamin">Vitamin</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Nhà sản xuất</Label>
                  <Input
                    id="manufacturer"
                    placeholder="Nhập tên nhà sản xuất"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batchNumber">Số lô</Label>
                  <Input id="batchNumber" placeholder="Nhập số lô" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Số lượng</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    placeholder="Nhập số lượng"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Đơn vị</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đơn vị" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tablet">Viên</SelectItem>
                      <SelectItem value="bottle">Chai</SelectItem>
                      <SelectItem value="box">Hộp</SelectItem>
                      <SelectItem value="pack">Gói</SelectItem>
                      <SelectItem value="tube">Ống</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                  <Input id="expiryDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storageLocation">Vị trí lưu trữ</Label>
                  <Input
                    id="storageLocation"
                    placeholder="Nhập vị trí lưu trữ"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minQuantity">Số lượng tối thiểu</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    min="0"
                    placeholder="Nhập số lượng tối thiểu"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  placeholder="Nhập mô tả về thuốc"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usageInstructions">Hướng dẫn sử dụng</Label>
                <Textarea
                  id="usageInstructions"
                  placeholder="Nhập hướng dẫn sử dụng"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sideEffects">Tác dụng phụ</Label>
                <Textarea
                  id="sideEffects"
                  placeholder="Nhập các tác dụng phụ có thể xảy ra"
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
              onClick={() => navigate('/dashboard/medications')}
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
                  <span>Lưu thuốc</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
