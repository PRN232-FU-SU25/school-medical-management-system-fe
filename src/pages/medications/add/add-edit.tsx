import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BasePages from '@/components/shared/base-pages';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/ui/icons';
import { toast } from 'sonner';

// Schema validation cho form
const formSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên thuốc'),
  category: z.string().min(1, 'Vui lòng chọn loại thuốc'),
  manufacturer: z.string().min(1, 'Vui lòng nhập nhà sản xuất'),
  batchNumber: z.string().min(1, 'Vui lòng nhập số lô'),
  quantity: z.string().min(1, 'Vui lòng nhập số lượng'),
  unit: z.string().min(1, 'Vui lòng chọn đơn vị'),
  expiryDate: z.string().min(1, 'Vui lòng chọn ngày hết hạn'),
  storageLocation: z.string().min(1, 'Vui lòng nhập vị trí lưu trữ'),
  minQuantity: z.string().min(1, 'Vui lòng nhập số lượng tối thiểu'),
  description: z.string().optional(),
  usageInstructions: z.string().min(1, 'Vui lòng nhập hướng dẫn sử dụng'),
  sideEffects: z.string().optional(),
  status: z.string().min(1, 'Vui lòng chọn trạng thái')
});

export default function AddEditMedication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Khởi tạo form với react-hook-form và zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      manufacturer: '',
      batchNumber: '',
      quantity: '',
      unit: '',
      expiryDate: '',
      storageLocation: '',
      minQuantity: '',
      description: '',
      usageInstructions: '',
      sideEffects: '',
      status: 'active'
    }
  });

  // Fetch dữ liệu nếu là edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      // TODO: Integrate with backend API
      // api.get(`/medications/${id}`).then((response) => {
      //   form.reset(response.data);
      //   setLoading(false);
      // });

      // Mock data for now
      setTimeout(() => {
        form.reset({
          name: 'Paracetamol',
          category: 'pain_relief',
          manufacturer: 'Công ty Dược phẩm ABC',
          batchNumber: 'BATCH123',
          quantity: '100',
          unit: 'viên',
          expiryDate: '2024-12-31',
          storageLocation: 'Tủ A1',
          minQuantity: '20',
          description: 'Thuốc giảm đau, hạ sốt',
          usageInstructions:
            'Uống 1-2 viên mỗi 4-6 giờ khi cần. Không quá 8 viên/ngày.',
          sideEffects: 'Buồn nôn, đau dạ dày (hiếm gặp)',
          status: 'active'
        });
        setLoading(false);
      }, 1000);
    }
  }, [id, form]);

  // Xử lý submit form
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      // TODO: Integrate with backend API
      // if (id) {
      //   await api.put(`/medications/${id}`, values);
      // } else {
      //   await api.post('/medications', values);
      // }

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(id ? 'Cập nhật thành công' : 'Thêm mới thành công');
      navigate('/dashboard/medications');
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasePages
      pageHead={`${id ? 'Chỉnh sửa' : 'Thêm mới'} thuốc | Hệ thống quản lý y tế học đường`}
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý thuốc', link: '/dashboard/medications' },
        { title: id ? 'Chỉnh sửa' : 'Thêm mới', link: '#' }
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {id ? 'Chỉnh sửa thông tin thuốc' : 'Thêm mới thuốc'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên thuốc</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên thuốc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại thuốc</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại thuốc" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pain_relief">Giảm đau</SelectItem>
                          <SelectItem value="fever">Hạ sốt</SelectItem>
                          <SelectItem value="antibiotics">
                            Kháng sinh
                          </SelectItem>
                          <SelectItem value="allergy">Chống dị ứng</SelectItem>
                          <SelectItem value="first_aid">Sơ cứu</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhà sản xuất</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên nhà sản xuất" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="batchNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lô</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số lô" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Nhập số lượng"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đơn vị</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đơn vị" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="viên">Viên</SelectItem>
                          <SelectItem value="gói">Gói</SelectItem>
                          <SelectItem value="chai">Chai</SelectItem>
                          <SelectItem value="ống">Ống</SelectItem>
                          <SelectItem value="hộp">Hộp</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày hết hạn</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storageLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vị trí lưu trữ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập vị trí lưu trữ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng tối thiểu</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Nhập số lượng tối thiểu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Đang sử dụng</SelectItem>
                          <SelectItem value="inactive">
                            Ngừng sử dụng
                          </SelectItem>
                          <SelectItem value="out_of_stock">Hết hàng</SelectItem>
                          <SelectItem value="expired">Hết hạn</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả về thuốc"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usageInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hướng dẫn sử dụng</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập hướng dẫn sử dụng"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sideEffects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tác dụng phụ</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập các tác dụng phụ (nếu có)"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard/medications')}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {id ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </BasePages>
  );
}
