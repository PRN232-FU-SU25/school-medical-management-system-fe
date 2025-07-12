import TextField from '@/components/shared/text-field';
import TextareaField from '@/components/shared/textarea-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRefetch } from '@/providers/refetch-provider';
import { useCreateUpdateService } from '@/queries/service.query';
import { useId } from '@/routes/hooks/use-id';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const contractSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .nonempty('Bắt buộc nhập tên dịch vụ')
    .max(50, 'Tên hợp đồng ít hơn 50 kí tự'),
  unitPrice: z
    .number()
    .min(0, 'Giá trị phải lớn hơn hoặc bằng 0')
    .refine((value) => value !== undefined, {
      message: 'Bắt buộc nhập giá trị'
    }),
  tax: z.number().min(0, 'Giá trị phải lớn hơn hoặc bằng 0').optional(),
  description: z.string().nonempty('Bắt buộc nhập nội dung')
});

type ServiceFormData = z.infer<typeof contractSchema>;

type Props = {
  type: 'new' | 'update' | 'view';
  service?: any;
  onClose?: () => void;
};

export default function ServiceDialog({ type, service, onClose }: Props) {
  const id = useId();
  const { refetch } = useRefetch();
  const { toast } = useToast();
  const { mutateAsync: crud } = useCreateUpdateService();
  const [formData, setFormData] = useState<Partial<ServiceFormData>>({
    id: '',
    name: '',
    unitPrice: 0,
    tax: 0,
    description: ''
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ServiceFormData, string>>
  >({});

  const handleChange = (field: keyof ServiceFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const result = contractSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(
        Object.keys(fieldErrors).reduce(
          (acc, key) => {
            const errorMessages = fieldErrors[key]?._errors;
            acc[key as keyof ServiceFormData] =
              errorMessages && errorMessages.length > 0 ? errorMessages[0] : '';
            return acc;
          },
          {} as Partial<Record<keyof ServiceFormData, string>>
        )
      );
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const model = {
        ...formData,
        id: 0,
        contractId: id
      };
      const res = await crud(model);
      if (res === 'Lưu thành công.') {
        refetch?.();
        onClose?.();
        toast({
          variant: 'success',
          title: 'Thành công',
          description: 'Thêm dịch vụ thành công.',
          duration: 3000
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng kiểm tra kết nối internet.',
        duration: 3000
      });
    }
  };

  const handleUpdate = async () => {
    if (validateForm()) {
      const model = {
        ...formData,
        contractId: id
      };
      const res = await crud(model);
      if (res === 'Lưu thành công.') {
        refetch?.();
        onClose?.();
        toast({
          variant: 'success',
          title: 'Thành công',
          description: 'Cập nhật dịch vụ thành công.',
          duration: 3000
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng kiểm tra kết nối internet.',
        duration: 3000
      });
    }
  };

  const [isViewMode] = useState(type === 'view');

  useEffect(() => {
    if (type !== 'new') {
      setFormData({
        ...service,
        id: service?.id.toString()
      });
    }
  }, [service]);

  return (
    <>
      <div className="p-2.5">
        <div className="flex justify-between gap-8">
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="service-number"
                  label="Số dịch vụ"
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => handleChange('id', e.target.value)}
                  error={errors.id}
                  placeholder="Nhập số dịch vụ"
                  disabled={true}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="service-name"
                  label="Tên dịch vụ"
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required={!isViewMode}
                  error={errors.name}
                  placeholder="Nhập tên dịch vụ"
                  disabled={isViewMode}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="service-price"
                  label="Giá trị (VNĐ)"
                  type="number"
                  value={formData.unitPrice || ''}
                  onChange={(e) =>
                    handleChange('unitPrice', parseInt(e.target.value))
                  }
                  error={errors.unitPrice}
                  placeholder="Nhập giá trị"
                  disabled={isViewMode}
                  required={!isViewMode}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="service-tax"
                  label="Thuế (%)"
                  type="number"
                  value={formData.tax || ''}
                  onChange={(e) =>
                    handleChange('tax', parseInt(e.target.value))
                  }
                  error={errors.tax}
                  placeholder="Nhập thuế"
                  disabled={isViewMode}
                />
              </div>
            </div>

            <TextareaField
              id="description"
              label="Mô tả dịch vụ"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Mô tả dịch vụ..."
              error={errors.description}
              disabled={isViewMode}
              required={!isViewMode}
            />
          </div>
        </div>
      </div>

      {type !== 'view' && (
        <div>
          <Button
            className="w-full text-base font-normal"
            size={'lg'}
            onClick={type === 'new' ? handleSubmit : handleUpdate}
          >
            {type === 'new' && 'Thêm mới'}
            {type === 'update' && 'Cập nhật'}
          </Button>
        </div>
      )}
    </>
  );
}
