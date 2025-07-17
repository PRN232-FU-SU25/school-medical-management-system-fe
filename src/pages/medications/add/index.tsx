import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  MedicalSupplyRequest,
  useCreateMedicalSupply
} from '@/queries/medical-supplies.query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Define supply types
const supplyTypes = [
  { value: 'Medicine', label: 'Thuốc' },
  { value: 'Equipment', label: 'Thiết bị' },
  { value: 'FirstAid', label: 'Sơ cứu' },
  { value: 'Hygiene', label: 'Vệ sinh' },
  { value: 'Other', label: 'Khác' }
];

// Define supply statuses
const supplyStatuses = [
  { value: 'Available', label: 'Còn hàng' },
  { value: 'Low', label: 'Sắp hết' },
  { value: 'Out', label: 'Hết hàng' }
];

export default function AddMedicalSupplyPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createSupply = useCreateMedicalSupply();

  const [formData, setFormData] = useState<Partial<MedicalSupplyRequest>>({
    name: '',
    quantityAvailable: 0,
    type: '',
    unit: '',
    status: 'Available',
    instructions: '',
    description: '',
    expiryDate: undefined
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantityAvailable' ? parseInt(value) || 0 : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      if (!formData.name || !formData.type) {
        toast({
          title: 'Lỗi',
          description: 'Vui lòng điền đầy đủ thông tin bắt buộc',
          variant: 'destructive'
        });
        return;
      }

      // Convert dates to proper format
      const payload: MedicalSupplyRequest = {
        name: formData.name!,
        quantityAvailable: formData.quantityAvailable || 0,
        type: formData.type!,
        unit: formData.unit,
        status: formData.status,
        instructions: formData.instructions,
        description: formData.description,
        expiryDate: formData.expiryDate
          ? new Date(formData.expiryDate)
          : undefined,
        startedDate: formData.startedDate
          ? new Date(formData.startedDate)
          : undefined
      };

      await createSupply.mutateAsync(payload);

      toast({
        title: 'Thành công',
        description: 'Đã thêm vật tư y tế mới'
      });

      navigate('/dashboard/medications');
    } catch (error) {
      console.error('Error creating medical supply:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm vật tư y tế. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <CardTitle className="text-teal-900">Thêm vật tư y tế mới</CardTitle>
        <Button asChild variant="outline">
          <Link to="/dashboard/medications">
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Tên vật tư <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Nhập tên vật tư y tế"
                value={formData.name || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="type"
                className="text-sm font-medium text-gray-700"
              >
                Loại <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại vật tư" />
                </SelectTrigger>
                <SelectContent>
                  {supplyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="quantityAvailable"
                className="text-sm font-medium text-gray-700"
              >
                Số lượng <span className="text-red-500">*</span>
              </label>
              <Input
                id="quantityAvailable"
                name="quantityAvailable"
                type="number"
                min={0}
                placeholder="Nhập số lượng"
                value={formData.quantityAvailable || 0}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="unit"
                className="text-sm font-medium text-gray-700"
              >
                Đơn vị
              </label>
              <Input
                id="unit"
                name="unit"
                placeholder="Ví dụ: Viên, Chai, Hộp..."
                value={formData.unit || ''}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="expiryDate"
                className="text-sm font-medium text-gray-700"
              >
                Hạn sử dụng
              </label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={
                  formData.expiryDate
                    ? new Date(formData.expiryDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Trạng thái
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {supplyStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="instructions"
                className="text-sm font-medium text-gray-700"
              >
                Hướng dẫn sử dụng
              </label>
              <Textarea
                id="instructions"
                name="instructions"
                placeholder="Nhập hướng dẫn sử dụng"
                value={formData.instructions || ''}
                onChange={handleChange}
                rows={2}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Mô tả
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Nhập mô tả chi tiết về vật tư y tế"
                value={formData.description || ''}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/medications')}
              disabled={createSupply.isPending}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700"
              disabled={createSupply.isPending}
            >
              {createSupply.isPending ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                'Lưu vật tư'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
