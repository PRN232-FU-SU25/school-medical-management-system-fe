import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  useCreateVaccinationRecord,
  useGetVaccinationCampaign
} from '@/queries/vaccinations.query';

// Định nghĩa schema validation
const recordFormSchema = z.object({
  scheduleId: z.number(),
  studentId: z.number(),
  campaignId: z.number(),
  vaccineName: z.string().min(1, 'Tên vắc-xin là bắt buộc'),
  vaccineBatch: z.string().min(1, 'Lô vắc-xin là bắt buộc'),
  vaccineOrigin: z.string().min(1, 'Xuất xứ vắc-xin là bắt buộc'),
  vaccineExpiryDate: z.string().min(1, 'Hạn sử dụng vắc-xin là bắt buộc'),
  dose: z.string().min(1, 'Liều lượng là bắt buộc'),
  site: z.string().min(1, 'Vị trí tiêm là bắt buộc'),
  route: z.string().min(1, 'Đường tiêm là bắt buộc'),
  notes: z.string().optional()
});

type RecordFormValues = z.infer<typeof recordFormSchema>;

const siteOptions = [
  { value: 'Cánh tay trái', label: 'Cánh tay trái' },
  { value: 'Cánh tay phải', label: 'Cánh tay phải' },
  { value: 'Đùi trái', label: 'Đùi trái' },
  { value: 'Đùi phải', label: 'Đùi phải' },
  { value: 'Khác', label: 'Khác' }
];

const routeOptions = [
  { value: 'Tiêm bắp', label: 'Tiêm bắp' },
  { value: 'Tiêm dưới da', label: 'Tiêm dưới da' },
  { value: 'Tiêm trong da', label: 'Tiêm trong da' },
  { value: 'Tiêm tĩnh mạch', label: 'Tiêm tĩnh mạch' },
  { value: 'Khác', label: 'Khác' }
];

export default function VaccinationRecord() {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();
  const [searchParams] = useSearchParams();
  const scheduleId = searchParams.get('scheduleId');
  const studentId = searchParams.get('studentId');
  const { toast } = useToast();

  const { data: campaignData, isLoading: campaignLoading } =
    useGetVaccinationCampaign(parseInt(campaignId || '0'));

  const form = useForm<RecordFormValues>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: {
      scheduleId: parseInt(scheduleId || '0'),
      studentId: parseInt(studentId || '0'),
      campaignId: parseInt(campaignId || '0'),
      vaccineName: '',
      vaccineBatch: '',
      vaccineOrigin: '',
      vaccineExpiryDate: '',
      dose: '',
      site: '',
      route: '',
      notes: ''
    }
  });

  useEffect(() => {
    if (campaignData) {
      form.setValue('vaccineName', campaignData.vaccineName || '');
    }
  }, [campaignData, form]);

  const createVaccinationRecord = useCreateVaccinationRecord();

  const onSubmit = async (values: RecordFormValues) => {
    try {
      await createVaccinationRecord.mutateAsync(values);

      toast({
        title: 'Thành công',
        description: 'Ghi nhận tiêm chủng thành công',
        variant: 'default'
      });

      navigate(`/dashboard/vaccinations/campaign/${campaignId}/schedules`);
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi',
        variant: 'destructive'
      });
    }
  };

  if (campaignLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
          <Skeleton className="h-8 w-[250px]" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            onClick={() =>
              navigate(
                `/dashboard/vaccinations/campaign/${campaignId}/schedules`
              )
            }
          >
            <Icons.chevronLeft className="h-4 w-4" />
            <span className="sr-only">Quay lại</span>
          </Button>
          <CardTitle className="text-teal-900">Ghi nhận tiêm chủng</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chiến dịch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Tên chiến dịch:</span>{' '}
                  {campaignData?.name}
                </div>
                <div>
                  <span className="font-medium">Mô tả:</span>{' '}
                  {campaignData?.description}
                </div>
                <div>
                  <span className="font-medium">Vắc-xin:</span>{' '}
                  {campaignData?.vaccineName}
                </div>
              </div>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="vaccineName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên vắc-xin</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vaccineBatch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lô vắc-xin</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vaccineOrigin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xuất xứ vắc-xin</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="vaccineExpiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hạn sử dụng</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Liều lượng</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="site"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vị trí tiêm</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn vị trí tiêm" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {siteOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
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
                  name="route"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đường tiêm</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đường tiêm" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {routeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={createVaccinationRecord.isPending}
              >
                {createVaccinationRecord.isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Ghi nhận tiêm chủng
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
