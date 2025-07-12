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
  studentName: z.string().min(1, 'Vui lòng nhập tên học sinh'),
  studentId: z.string().min(1, 'Vui lòng nhập mã học sinh'),
  class: z.string().min(1, 'Vui lòng chọn lớp'),
  checkupDate: z.string().min(1, 'Vui lòng chọn ngày khám'),
  type: z.string().min(1, 'Vui lòng chọn loại khám'),
  doctor: z.string().min(1, 'Vui lòng nhập tên bác sĩ'),
  location: z.string().min(1, 'Vui lòng nhập địa điểm khám'),
  height: z.string().optional(),
  weight: z.string().optional(),
  bloodPressure: z.string().optional(),
  heartRate: z.string().optional(),
  temperature: z.string().optional(),
  vision: z.string().optional(),
  hearing: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
  status: z.string().min(1, 'Vui lòng chọn trạng thái'),
  result: z.string().optional()
});

export default function AddEditHealthCheckup() {
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
      checkupDate: '',
      type: '',
      doctor: '',
      location: '',
      height: '',
      weight: '',
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      vision: '',
      hearing: '',
      diagnosis: '',
      treatment: '',
      notes: '',
      followUpDate: '',
      status: 'scheduled',
      result: ''
    }
  });

  // Fetch dữ liệu nếu là edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      // TODO: Integrate with backend API
      // api.get(`/health-checkups/${id}`).then((response) => {
      //   form.reset(response.data);
      //   setLoading(false);
      // });

      // Mock data for now
      setTimeout(() => {
        form.reset({
          studentName: 'Nguyễn Văn A',
          studentId: 'HS001',
          class: '10A1',
          checkupDate: '2024-03-15',
          type: 'Định kỳ',
          doctor: 'BS. Trần Thị B',
          location: 'Phòng y tế trường',
          height: '170',
          weight: '60',
          bloodPressure: '120/80',
          heartRate: '80',
          temperature: '36.5',
          vision: '20/20',
          hearing: 'Bình thường',
          diagnosis: 'Khỏe mạnh',
          treatment: 'Không cần điều trị',
          notes: 'Sức khỏe tốt',
          followUpDate: '2024-09-15',
          status: 'completed',
          result: 'Bình thường'
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
      //   await api.put(`/health-checkups/${id}`, values);
      // } else {
      //   await api.post('/health-checkups', values);
      // }

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(id ? 'Cập nhật thành công' : 'Thêm mới thành công');
      navigate('/dashboard/health-checkups');
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasePages
      pageHead={`${id ? 'Chỉnh sửa' : 'Thêm mới'} thông tin khám sức khỏe | Hệ thống quản lý y tế học đường`}
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý khám sức khỏe', link: '/dashboard/health-checkups' },
        { title: id ? 'Chỉnh sửa' : 'Thêm mới', link: '#' }
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {id
              ? 'Chỉnh sửa thông tin khám sức khỏe'
              : 'Thêm mới thông tin khám sức khỏe'}
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
                  name="checkupDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày khám</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại khám</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại khám" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Định kỳ">Định kỳ</SelectItem>
                          <SelectItem value="Chuyên khoa">
                            Chuyên khoa
                          </SelectItem>
                          <SelectItem value="Cấp cứu">Cấp cứu</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bác sĩ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên bác sĩ" {...field} />
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
                      <FormLabel>Địa điểm khám</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập địa điểm khám" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chiều cao (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập chiều cao"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cân nặng (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập cân nặng"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Huyết áp (mmHg)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ví dụ: 120/80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhịp tim (nhịp/phút)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập nhịp tim"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhiệt độ (°C)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Nhập nhiệt độ"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vision"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thị lực</FormLabel>
                      <FormControl>
                        <Input placeholder="Ví dụ: 20/20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hearing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thính lực</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập kết quả thính lực"
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
                          <SelectItem value="scheduled">Chờ khám</SelectItem>
                          <SelectItem value="completed">Đã khám</SelectItem>
                          <SelectItem value="cancelled">Đã hủy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="followUpDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày tái khám (nếu có)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="diagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chẩn đoán</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập chẩn đoán"
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
                  name="treatment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phương pháp điều trị</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập phương pháp điều trị"
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
                  name="result"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kết quả tổng quát</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập kết quả tổng quát"
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
                  onClick={() => navigate('/dashboard/health-checkups')}
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
