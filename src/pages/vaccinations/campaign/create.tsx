import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  useCreateVaccinationCampaign,
  useUpdateVaccinationCampaign,
  useGetVaccinationCampaign
} from '@/queries/vaccinations.query';

// Định nghĩa schema validation
const campaignFormSchema = z
  .object({
    name: z.string().min(1, 'Tên chiến dịch là bắt buộc'),
    description: z.string().optional(),
    date: z.string().min(1, 'Ngày bắt đầu là bắt buộc')
  })
  .refine(
    (data) => {
      if (data.date) {
        return new Date(data.date) >= new Date();
      }
      return true;
    },
    {
      message: 'Ngày tổ chức phải ở tương lai',
      path: ['date']
    }
  );

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

export default function VaccinationCampaignForm() {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();
  const isEditMode = !!campaignId;
  const { toast } = useToast();

  const { data: existingCampaign, isLoading: fetchingCampaign } =
    useGetVaccinationCampaign(isEditMode ? parseInt(campaignId) : 0);

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: '',
      description: '',
      date: ''
    }
  });

  useEffect(() => {
    if (isEditMode && existingCampaign) {
      form.reset({
        name: existingCampaign.name || '',
        description: existingCampaign.description || '',
        date: existingCampaign.date
          ? new Date(existingCampaign.date).toISOString().split('T')[0]
          : ''
      });
    }
  }, [existingCampaign, isEditMode, form]);

  const createCampaign = useCreateVaccinationCampaign();
  const updateCampaign = useUpdateVaccinationCampaign();

  const onSubmit = async (values: CampaignFormValues) => {
    try {
      if (isEditMode) {
        await updateCampaign.mutateAsync({
          id: parseInt(campaignId || '0'),
          data: values
        });

        toast({
          title: 'Thành công',
          description: 'Cập nhật chiến dịch tiêm chủng thành công',
          variant: 'default'
        });
      } else {
        await createCampaign.mutateAsync(values);

        toast({
          title: 'Thành công',
          description: 'Tạo mới chiến dịch tiêm chủng thành công',
          variant: 'default'
        });
      }

      navigate('/dashboard/vaccinations');
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi',
        variant: 'destructive'
      });
    }
  };

  if (isEditMode && fetchingCampaign) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
          <Skeleton className="h-8 w-[250px]" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
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
            onClick={() => navigate('/dashboard/vaccinations')}
          >
            <Icons.chevronLeft className="h-4 w-4" />
            <span className="sr-only">Quay lại</span>
          </Button>
          <CardTitle className="text-teal-900">
            {isEditMode
              ? 'Cập nhật chiến dịch tiêm chủng'
              : 'Tạo mới chiến dịch tiêm chủng'}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên chiến dịch</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả chiến dịch</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày tổ chức</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={
                isEditMode ? updateCampaign.isPending : createCampaign.isPending
              }
            >
              {(isEditMode
                ? updateCampaign.isPending
                : createCampaign.isPending) && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isEditMode ? 'Cập nhật chiến dịch' : 'Tạo mới chiến dịch'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
