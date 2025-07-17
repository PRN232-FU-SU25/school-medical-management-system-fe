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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import {
  useGetMedicalSupplyById,
  useUpdateMedicalSupply
} from '@/queries/medical-supplies.query';

const supplyTypes = [
  { value: 'Medicine', label: 'Thuốc' },
  { value: 'Equipment', label: 'Thiết bị' },
  { value: 'FirstAid', label: 'Sơ cứu' },
  { value: 'Hygiene', label: 'Vệ sinh' },
  { value: 'Other', label: 'Khác' }
];

const supplyStatuses = [
  { value: 'Available', label: 'Còn hàng' },
  { value: 'Low', label: 'Sắp hết' },
  { value: 'Out', label: 'Hết hàng' }
];

const formSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên thuốc/vật tư'),
  type: z.string().min(1, 'Vui lòng chọn loại'),
  description: z.string().optional(),
  instructions: z.string().optional(),
  quantityAvailable: z.number().min(0, 'Số lượng không được âm'),
  unit: z.string().optional(),
  expiryDate: z.string().optional(),
  status: z.string().min(1, 'Vui lòng chọn trạng thái')
});

export default function EditMedicalSupplyPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const supplyId = parseInt(id as string);

  const { data: supplyData, isLoading } = useGetMedicalSupplyById(supplyId);
  const { mutateAsync: updateSupply, isPending: isUpdating } =
    useUpdateMedicalSupply();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      description: '',
      instructions: '',
      quantityAvailable: 0,
      unit: 'Đơn vị',
      expiryDate: '',
      status: ''
    }
  });

  useEffect(() => {
    if (supplyData) {
      form.reset({
        name: supplyData.name,
        type: supplyData.type,
        description: supplyData.description || '',
        instructions: supplyData.instructions || '',
        quantityAvailable: supplyData.quantityAvailable,
        unit: supplyData.unit || 'Đơn vị',
        expiryDate: supplyData.expiryDate
          ? supplyData.expiryDate.split('T')[0]
          : '',
        status: supplyData.status
      });
    }
  }, [supplyData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateSupply({
        id: supplyId,
        model: {
          ...values,
          expiryDate: values.expiryDate
            ? new Date(values.expiryDate)
            : undefined
        }
      });
      toast({
        title: 'Thành công',
        description: 'Cập nhật thuốc/vật tư thành công',
        variant: 'success'
      });
      navigate('/dashboard/medications');
    } catch (error) {
      toast({
        title: 'Thất bại',
        description: 'Có lỗi xảy ra khi cập nhật thuốc/vật tư',
        variant: 'destructive'
      });
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
          Chỉnh sửa thuốc/vật tư y tế
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên thuốc/vật tư</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên thuốc/vật tư" {...field} />
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
                    <FormLabel>Loại</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {supplyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập mô tả thuốc/vật tư"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hướng dẫn sử dụng</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập hướng dẫn sử dụng"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantityAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập số lượng"
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
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đơn vị</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập đơn vị" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryDate"
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
                        {supplyStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                disabled={isUpdating}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating && (
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
