import TextField from '@/components/shared/text-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import __helpers from '@/helpers';
import { useRefetch } from '@/providers/refetch-provider';
import { useCreateUpdateContractType } from '@/queries/contract.query';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const contractSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .nonempty('Bắt buộc nhập tên loại hợp đồng')
    .max(50, 'Tên loại hợp đồng ít hơn 50 kí tự')
});

type ContractTypeFormData = z.infer<typeof contractSchema>;

type Props = {
  type: 'new' | 'update' | 'view';
  contractType?: any;
  onClose?: () => void;
};

export default function ContractTypeDialog({
  type,
  contractType,
  onClose
}: Props) {
  const { refetch } = useRefetch();
  const { toast } = useToast();
  const { mutateAsync: crud } = useCreateUpdateContractType();
  const [formData, setFormData] = useState<Partial<ContractTypeFormData>>({
    id: '',
    name: ''
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContractTypeFormData, string>>
  >({});

  const handleChange = (field: keyof ContractTypeFormData, value: any) => {
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
            acc[key as keyof ContractTypeFormData] =
              errorMessages && errorMessages.length > 0 ? errorMessages[0] : '';
            return acc;
          },
          {} as Partial<Record<keyof ContractTypeFormData, string>>
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
        id: 0
      };
      const res = await crud(model);
      if (res.isSuccess) {
        refetch?.();
        onClose?.();
        toast({
          variant: 'success',
          title: 'Thành công',
          description: 'Thêm thành công.',
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
        ...formData
      };
      const res = await crud(model);
      if (res.isSuccess) {
        refetch?.();
        onClose?.();
        toast({
          variant: 'success',
          title: 'Thành công',
          description: 'Cập nhật thành công.',
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
        ...contractType,
        id: contractType?.id.toString()
      });
    }
  }, [contractType]);

  return (
    <>
      <div className="p-2.5">
        <div className="flex justify-between gap-8">
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="contract-type-number"
                  label="Số loại hợp đồng"
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => handleChange('id', e.target.value)}
                  error={errors.id}
                  placeholder="Nhập số loại hợp đồng"
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="contract-type-name"
                  label="Tên loại hợp đồng"
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required={!isViewMode}
                  error={errors.name}
                  placeholder="Nhập tên loại hợp đồng"
                  disabled={isViewMode}
                />
              </div>
            </div>
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
