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
  class: z.string().min(1, 'Vui lòng chọn lớp'),
  eventType: z.string().min(1, 'Vui lòng chọn loại sự kiện'),
  date: z.string().min(1, 'Vui lòng chọn ngày'),
  time: z.string().min(1, 'Vui lòng chọn thời gian'),
  location: z.string().min(1, 'Vui lòng nhập vị trí'),
  severity: z.string().min(1, 'Vui lòng chọn mức độ'),
  description: z.string().min(1, 'Vui lòng nhập mô tả'),
  handler: z.string().min(1, 'Vui lòng nhập người xử lý'),
  status: z.string().min(1, 'Vui lòng chọn trạng thái')
});

export default function AddEditMedicalEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Khởi tạo form với react-hook-form và zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: '',
      class: '',
      eventType: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].slice(0, 5),
      location: '',
      severity: '',
      description: '',
      handler: '',
      status: 'pending'
    }
  });

  // Fetch dữ liệu nếu là edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      // TODO: Fetch medical event data by ID
      // api.get(`/medical-events/${id}`).then((response) => {
      //   form.reset(response.data);
      //   setLoading(false);
      // });

      // Mock data for now
      setTimeout(() => {
        form.reset({
          studentName: 'Nguyễn Văn A',
          class: '10A1',
          eventType: 'Sốt',
          date: '2024-03-15',
          time: '09:30',
          location: 'Phòng học 101',
          severity: 'medium',
          description: 'Học sinh bị sốt 38.5 độ',
          handler: 'BS. Trần Thị B',
          status: 'processing'
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
      //   await api.put(`/medical-events/${id}`, values);
      // } else {
      //   await api.post('/medical-events', values);
      // }

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(id ? 'Cập nhật thành công' : 'Thêm mới thành công');
      navigate('/dashboard/medical-events');
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasePages
      pageHead={`${id ? 'Chỉnh sửa' : 'Thêm mới'} sự kiện y tế | Hệ thống quản lý y tế học đường`}
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Sự kiện y tế', link: '/dashboard/medical-events' },
        { title: id ? 'Chỉnh sửa' : 'Thêm mới', link: '#' }
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {id ? 'Chỉnh sửa sự kiện y tế' : 'Thêm mới sự kiện y tế'}
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
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại sự kiện</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại sự kiện" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fever">Sốt</SelectItem>
                          <SelectItem value="injury">Chấn thương</SelectItem>
                          <SelectItem value="allergy">Dị ứng</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
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
                      <FormLabel>Vị trí</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập vị trí" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mức độ</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn mức độ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Nhẹ</SelectItem>
                          <SelectItem value="medium">Trung bình</SelectItem>
                          <SelectItem value="high">Nghiêm trọng</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="handler"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Người xử lý</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập người xử lý" {...field} />
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
                          <SelectItem value="pending">Chờ xử lý</SelectItem>
                          <SelectItem value="processing">Đang xử lý</SelectItem>
                          <SelectItem value="completed">Đã xử lý</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập mô tả chi tiết về sự kiện"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard/medical-events')}
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
