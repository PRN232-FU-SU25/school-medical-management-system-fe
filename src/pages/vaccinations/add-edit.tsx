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
import { DatePicker } from '@/components/ui/date-picker';

// Schema validation cho form
const formSchema = z.object({
  studentName: z.string().min(1, 'Vui lòng nhập tên học sinh'),
  studentId: z.string().min(1, 'Vui lòng nhập mã học sinh'),
  class: z.string().min(1, 'Vui lòng chọn lớp'),
  vaccineName: z.string().min(1, 'Vui lòng nhập tên vaccine'),
  vaccineType: z.string().min(1, 'Vui lòng chọn loại vaccine'),
  manufacturer: z.string().min(1, 'Vui lòng nhập nhà sản xuất'),
  batchNumber: z.string().min(1, 'Vui lòng nhập số lô'),
  dosageNumber: z.string().min(1, 'Vui lòng chọn số mũi tiêm'),
  vaccinationDate: z.string().min(1, 'Vui lòng chọn ngày tiêm'),
  nextDueDate: z.string().optional(),
  location: z.string().min(1, 'Vui lòng nhập địa điểm tiêm'),
  provider: z.string().min(1, 'Vui lòng nhập người thực hiện'),
  notes: z.string().optional(),
  status: z.string().min(1, 'Vui lòng chọn trạng thái'),
  parentConsent: z
    .string()
    .min(1, 'Vui lòng chọn trạng thái đồng ý của phụ huynh'),
  sideEffects: z.string().optional()
});

export default function AddEditVaccination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Khởi tạo form với react-hook-form và zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: '',
      studentId: '',
      class: '',
      vaccineName: '',
      vaccineType: '',
      manufacturer: '',
      batchNumber: '',
      dosageNumber: '',
      vaccinationDate: '',
      nextDueDate: '',
      location: '',
      provider: '',
      notes: '',
      status: 'pending',
      parentConsent: 'pending',
      sideEffects: ''
    }
  });

  // Fetch dữ liệu nếu là edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      // TODO: Integrate with backend API
      // api.get(`/vaccinations/${id}`).then((response) => {
      //   form.reset(response.data);
      //   setLoading(false);
      // });

      // Mock data for now
      setTimeout(() => {
        form.reset({
          studentName: 'Nguyễn Văn A',
          studentId: 'HS001',
          class: '10A1',
          vaccineName: 'Vaccine COVID-19',
          vaccineType: 'covid19',
          manufacturer: 'Pfizer',
          batchNumber: 'PFZ123',
          dosageNumber: '1',
          vaccinationDate: '2024-03-15',
          nextDueDate: '2024-06-15',
          location: 'Phòng y tế trường',
          provider: 'BS. Trần Thị B',
          notes: 'Tiêm mũi 1 vaccine COVID-19',
          status: 'completed',
          parentConsent: 'approved',
          sideEffects: 'Không có'
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
      //   await api.put(`/vaccinations/${id}`, values);
      // } else {
      //   await api.post('/vaccinations', values);
      // }

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(id ? 'Cập nhật thành công' : 'Thêm mới thành công');
      navigate('/dashboard/vaccinations');
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasePages
      pageHead={`${id ? 'Chỉnh sửa' : 'Thêm mới'} thông tin tiêm chủng | Hệ thống quản lý y tế học đường`}
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý tiêm chủng', link: '/dashboard/vaccinations' },
        { title: id ? 'Chỉnh sửa' : 'Thêm mới', link: '#' }
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {id
              ? 'Chỉnh sửa thông tin tiêm chủng'
              : 'Thêm mới thông tin tiêm chủng'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên học sinh</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên học sinh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã học sinh</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập mã học sinh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lớp</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn lớp" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10A1">10A1</SelectItem>
                          <SelectItem value="10A2">10A2</SelectItem>
                          <SelectItem value="11A1">11A1</SelectItem>
                          <SelectItem value="11A2">11A2</SelectItem>
                          <SelectItem value="12A1">12A1</SelectItem>
                          <SelectItem value="12A2">12A2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vaccineName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên vaccine</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên vaccine" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vaccineType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại vaccine</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại vaccine" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="covid19">COVID-19</SelectItem>
                          <SelectItem value="hepatitisB">Viêm gan B</SelectItem>
                          <SelectItem value="mmr">
                            Sởi - Quai bị - Rubella
                          </SelectItem>
                          <SelectItem value="hpv">HPV</SelectItem>
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
                  name="dosageNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số mũi tiêm</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn số mũi tiêm" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Mũi 1</SelectItem>
                          <SelectItem value="2">Mũi 2</SelectItem>
                          <SelectItem value="3">Mũi 3</SelectItem>
                          <SelectItem value="4">Mũi nhắc lại</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vaccinationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày tiêm</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nextDueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày tiêm tiếp theo (nếu có)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa điểm tiêm</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập địa điểm tiêm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Người thực hiện</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên người thực hiện"
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
                          <SelectItem value="pending">Chờ tiêm</SelectItem>
                          <SelectItem value="completed">Đã tiêm</SelectItem>
                          <SelectItem value="cancelled">Đã hủy</SelectItem>
                          <SelectItem value="rescheduled">
                            Đã đổi lịch
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentConsent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phụ huynh đồng ý</FormLabel>
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
                          <SelectItem value="pending">Chờ xác nhận</SelectItem>
                          <SelectItem value="approved">Đã đồng ý</SelectItem>
                          <SelectItem value="rejected">Không đồng ý</SelectItem>
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
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi chú</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập ghi chú"
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
                      <FormLabel>Tác dụng phụ sau tiêm (nếu có)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập các tác dụng phụ sau tiêm"
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
                  onClick={() => navigate('/dashboard/vaccinations')}
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
