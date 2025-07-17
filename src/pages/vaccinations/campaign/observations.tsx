import React, { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  useCreateObservation,
  useGetRecordObservations
} from '@/queries/vaccinations.query';
import __helpers from '@/helpers';

// Định nghĩa schema validation
const observationFormSchema = z.object({
  recordId: z.number(),
  observationDate: z.string().min(1, 'Thời gian theo dõi là bắt buộc'),
  reactionDetails: z.string().optional(),
  actionTaken: z.string().optional(),
  symptoms: z.string().optional(),
  notes: z.string().optional()
});

type ObservationFormValues = z.infer<typeof observationFormSchema>;

const symptomOptions = [
  {
    value: 'Không có biểu hiện bất thường',
    label: 'Không có biểu hiện bất thường'
  },
  { value: 'Sốt nhẹ', label: 'Sốt nhẹ' },
  { value: 'Đau tại chỗ tiêm', label: 'Đau tại chỗ tiêm' },
  { value: 'Nổi ban đỏ', label: 'Nổi ban đỏ' },
  { value: 'Khó thở', label: 'Khó thở' },
  { value: 'Sốc phản vệ', label: 'Sốc phản vệ' },
  { value: 'Khác', label: 'Khác' }
];

export default function VaccinationObservations() {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();
  const [searchParams] = useSearchParams();
  const recordId = searchParams.get('recordId');
  const { toast } = useToast();
  const role = __helpers.cookie_get('R');

  const {
    data: observations,
    isLoading,
    refetch
  } = useGetRecordObservations(parseInt(recordId || '0'));

  const form = useForm<ObservationFormValues>({
    resolver: zodResolver(observationFormSchema),
    defaultValues: {
      recordId: parseInt(recordId || '0'),
      observationDate: new Date().toISOString().split('.')[0],
      reactionDetails: '',
      actionTaken: '',
      symptoms: '',
      notes: ''
    }
  });

  const createObservation = useCreateObservation();

  const onSubmit = async (values: ObservationFormValues) => {
    try {
      await createObservation.mutateAsync(values);

      toast({
        title: 'Thành công',
        description: 'Ghi nhận theo dõi sau tiêm thành công',
        variant: 'default'
      });

      form.reset({
        recordId: parseInt(recordId || '0'),
        observationDate: new Date().toISOString().split('.')[0],
        reactionDetails: '',
        actionTaken: '',
        symptoms: '',
        notes: ''
      });

      refetch();
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
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
          <CardTitle className="text-teal-900">
            Theo dõi sau tiêm chủng
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Danh sách theo dõi</TabsTrigger>
            {role !== 'Parent' && (
              <TabsTrigger value="add">Thêm mới theo dõi</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="list">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Chi tiết phản ứng</TableHead>
                  <TableHead>Hành động đã thực hiện</TableHead>
                  <TableHead>Triệu chứng</TableHead>
                  <TableHead>Ghi chú</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {observations?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  observations?.map((obs: any) => (
                    <TableRow key={obs.id}>
                      <TableCell>
                        {new Date(obs.observationDate).toLocaleString('vi-VN')}
                      </TableCell>
                      <TableCell>{obs.reactionDetails || '--'}</TableCell>
                      <TableCell>{obs.actionTaken || '--'}</TableCell>
                      <TableCell>{obs.symptoms || '--'}</TableCell>
                      <TableCell>{obs.notes || '--'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="observationDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thời gian theo dõi</FormLabel>
                          <FormControl>
                            <Input
                              type="datetime-local"
                              {...field}
                              value={field.value.substring(0, 16)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="reactionDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chi tiết phản ứng</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ví dụ: Sốt nhẹ" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="actionTaken"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hành động đã thực hiện</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ví dụ: Đã tiêm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="symptoms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Triệu chứng</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn triệu chứng" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {symptomOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
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
                      disabled={createObservation.isPending}
                    >
                      {createObservation.isPending && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      <Icons.plus className="mr-2 h-4 w-4" />
                      Thêm mới theo dõi
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
