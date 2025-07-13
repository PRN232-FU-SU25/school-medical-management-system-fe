import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import { useUpsertHealthRecord } from '@/queries/health-records.query';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const formSchema = z.object({
  studentId: z.number().min(1, 'Vui lòng chọn học sinh'),
  allergies: z.string().min(1, 'Vui lòng nhập thông tin dị ứng'),
  chronicDiseases: z.string().min(1, 'Vui lòng nhập thông tin bệnh mãn tính'),
  bloodType: z.string().min(1, 'Vui lòng chọn nhóm máu'),
  height: z.number().min(1, 'Vui lòng nhập chiều cao'),
  weight: z.number().min(1, 'Vui lòng nhập cân nặng'),
  visionLeft: z
    .number()
    .min(0, 'Thị lực không hợp lệ')
    .max(10, 'Thị lực không hợp lệ'),
  visionRight: z
    .number()
    .min(0, 'Thị lực không hợp lệ')
    .max(10, 'Thị lực không hợp lệ'),
  note: z.string(),
  status: z.string().min(1, 'Vui lòng chọn trạng thái')
});

export default function AddHealthRecordPage() {
  const navigate = useNavigate();
  const { mutateAsync: upsertHealthRecord, isPending } =
    useUpsertHealthRecord();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allergies: 'Không',
      chronicDiseases: 'Không',
      note: '',
      status: 'Bình thường'
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await upsertHealthRecord(values);
      toast.success('Thêm hồ sơ sức khỏe thành công');
      navigate('/dashboard/student-records');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm hồ sơ sức khỏe');
    }
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <CardTitle className="text-teal-900">Thêm hồ sơ sức khỏe mới</CardTitle>
        <Button
          variant="outline"
          className="border-teal-600 text-teal-600 hover:bg-teal-50"
          onClick={() => navigate(-1)}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Học sinh</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập ID học sinh"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhóm máu</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nhóm máu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['A', 'B', 'O', 'AB'].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visionLeft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thị lực mắt trái</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Nhập thị lực"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visionRight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thị lực mắt phải</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Nhập thị lực"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dị ứng</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập thông tin dị ứng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chronicDiseases"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bệnh mãn tính</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập thông tin bệnh mãn tính"
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
                        <SelectItem value="Bình thường">Bình thường</SelectItem>
                        <SelectItem value="Cần theo dõi">
                          Cần theo dõi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập ghi chú (nếu có)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700"
                disabled={isPending}
              >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Lưu hồ sơ
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
