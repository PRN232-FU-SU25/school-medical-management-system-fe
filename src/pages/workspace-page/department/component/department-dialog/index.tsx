import TextField from '@/components/shared/text-field';
import TextareaField from '@/components/shared/textarea-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import __helpers from '@/helpers';
import { useRefetch } from '@/providers/refetch-provider';
import { useCreateUpdateDepartment } from '@/queries/department.query';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import DetailInfo from './DetailInfo';

const contractSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .nonempty('Bắt buộc nhập tên phòng ban')
    .max(50, 'Tên loại hợp đồng ít hơn 50 kí tự'),
  description: z.string().nonempty('Bắt buộc nhập mô tả'),
  employeeQuantity: z
    .number()
    .min(1, 'Có ít nhất 1 nhân viên trong phòng')
    .refine((value) => value !== undefined, {
      message: 'Bắt buộc nhập giá trị'
    })
});

type DepartmentFormData = z.infer<typeof contractSchema>;

type Props = {
  type: 'new' | 'update' | 'view';
  department?: any;
  onClose?: () => void;
};

export default function DepartmentDialog({ type, department, onClose }: Props) {
  const { refetch } = useRefetch();
  const { toast } = useToast();
  const { mutateAsync: crud } = useCreateUpdateDepartment();
  const [formData, setFormData] = useState<Partial<DepartmentFormData>>({
    id: '',
    name: '',
    description: '',
    employeeQuantity: 1
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof DepartmentFormData, string>>
  >({});

  const handleChange = (field: keyof DepartmentFormData, value: any) => {
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
            acc[key as keyof DepartmentFormData] =
              errorMessages && errorMessages.length > 0 ? errorMessages[0] : '';
            return acc;
          },
          {} as Partial<Record<keyof DepartmentFormData, string>>
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
        ...department,
        id: department?.id.toString()
      });
    }
  }, [department]);

  return (
    <>
      <div className="p-2.5">
        <div className="flex justify-between gap-8">
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="department-number"
                  label="Số phòng ban"
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => handleChange('id', e.target.value)}
                  error={errors.id}
                  placeholder="Nhập số phòng ban"
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="department-name"
                  label="Tên phòng ban"
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required={!isViewMode}
                  error={errors.name}
                  placeholder="Nhập tên phòng ban"
                  disabled={isViewMode}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="employee-quantity"
                  label="Số lượng nhân viên"
                  type="number"
                  value={formData.employeeQuantity || ''}
                  onChange={(e) =>
                    handleChange('employeeQuantity', parseInt(e.target.value))
                  }
                  error={errors.employeeQuantity}
                  placeholder="Nhập số lượng nhân viên"
                  disabled={isViewMode}
                  required={!isViewMode}
                />
              </div>
            </div>

            <TextareaField
              id="description"
              label="Mô tả phòng ban"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Mô tả phòng ban..."
              error={errors.description}
              disabled={isViewMode}
              required={!isViewMode}
            />
          </div>
        </div>
      </div>

      {type !== 'view' ? (
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
      ) : (
        <DetailInfo departmentId={department?.id} />
      )}
    </>
  );
}
