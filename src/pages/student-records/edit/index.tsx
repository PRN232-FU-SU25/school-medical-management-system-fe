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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import {
  useGetHealthRecordById,
  useUpdateHealthRecord
} from '@/queries/health-records.query';
import { useGetStudents } from '@/queries/student.query';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useEffect } from 'react';

const formSchema = z.object({
  studentId: z.number().min(1, 'Vui lòng chọn học sinh'),
  allergies: z.string().optional(),
  chronicDiseases: z.string().optional(),
  pastTreatments: z.string().optional(),
  vision: z.string().optional(),
  hearing: z.string().optional(),
  vaccinations: z.string().optional()
});

export default function EditHealthRecordPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const healthRecordId = parseInt(id as string);

  const { data: healthRecord, isLoading } =
    useGetHealthRecordById(healthRecordId);
  const { mutateAsync: updateHealthRecord, isPending } =
    useUpdateHealthRecord();
  const { data: studentsData } = useGetStudents(1, 100);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allergies: 'Không',
      chronicDiseases: 'Không',
      pastTreatments: 'Không',
      vision: 'Bình thường',
      hearing: 'Bình thường',
      vaccinations: 'Đầy đủ'
    }
  });

  useEffect(() => {
    if (healthRecord) {
      form.reset({
        studentId: healthRecord.studentId,
        allergies: healthRecord.allergies,
        chronicDiseases: healthRecord.chronicDiseases,
        pastTreatments: healthRecord.pastTreatments,
        vision: healthRecord.vision,
        hearing: healthRecord.hearing,
        vaccinations: healthRecord.vaccinations
      });
    }
  }, [healthRecord, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateHealthRecord({ id: healthRecordId, model: values });
      toast.success('Cập nhật hồ sơ sức khỏe thành công');
      navigate('/dashboard/student-records');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật hồ sơ sức khỏe');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <CardTitle className="text-teal-900">
          Chỉnh sửa hồ sơ sức khỏe
        </CardTitle>
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
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                      disabled={true}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn học sinh" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {studentsData?.items?.map((student) => (
                          <SelectItem
                            key={student?.studentId}
                            value={student?.studentId.toString()}
                          >
                            {student?.fullName} - {student?.className}
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
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dị ứng</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập thông tin dị ứng"
                        {...field}
                      />
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
                      <Textarea
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
                name="pastTreatments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiền sử điều trị</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập tiền sử điều trị"
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
                      <Textarea
                        placeholder="Nhập thông tin thị lực"
                        {...field}
                      />
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
                      <Textarea
                        placeholder="Nhập thông tin thính lực"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vaccinations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêm chủng</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập thông tin tiêm chủng"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isPending}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
