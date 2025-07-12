import TextField from '@/components/shared/text-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import __helpers from '@/helpers';
import { useRefetch } from '@/providers/refetch-provider';
import { useCreateUpdateCustomer } from '@/queries/customer.query';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import DetailInfo from './DetailInfo';

const contractSchema = z.object({
  id: z.string().optional(),
  companyName: z
    .string()
    .nonempty('Bắt buộc nhập tên khách hàng')
    .max(50, 'Tên khách hàng ít hơn 50 kí tự'),
  taxIdentificationNumber: z.string().nonempty('Bắt buộc nhập mã số thuế'),
  email: z
    .string()
    .nonempty('Bắt buộc nhập email')
    .max(30, 'Email ít hơn 30 kí tự'),
  phoneNumber: z
    .string()
    .nonempty('Bắt buộc nhập số điện thoại')
    .length(10, 'Số điện thoại phải có 10 số'),
  address: z
    .string()
    .nonempty('Bắt buộc nhập địa chỉ')
    .max(50, 'Địa chỉ ít hơn 50 kí tự')
});

type CustomerFormData = z.infer<typeof contractSchema>;

type Props = {
  type: 'new' | 'update' | 'view';
  customer?: any;
  onClose?: () => void;
};

export default function CustomerDialog({ type, customer, onClose }: Props) {
  const { refetch } = useRefetch();
  const { toast } = useToast();
  const { mutateAsync: crud } = useCreateUpdateCustomer();
  const [formData, setFormData] = useState<Partial<CustomerFormData>>({
    id: '',
    companyName: '',
    taxIdentificationNumber: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomerFormData, string>>
  >({});

  const handleChange = (field: keyof CustomerFormData, value: any) => {
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
            acc[key as keyof CustomerFormData] =
              errorMessages && errorMessages.length > 0 ? errorMessages[0] : '';
            return acc;
          },
          {} as Partial<Record<keyof CustomerFormData, string>>
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
          description: 'Thêm khách hàng thành công.',
          duration: 3000
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra',
          description: 'Vui lòng kiểm tra kết nối internet.',
          duration: 3000
        });
      }
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
          description: 'Cập nhật khách hàng thành công.',
          duration: 3000
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra',
          description: 'Vui lòng kiểm tra kết nối internet.',
          duration: 3000
        });
      }
    }
  };

  const [isViewMode] = useState(type === 'view');

  useEffect(() => {
    if (type !== 'new') {
      setFormData({
        ...customer,
        id: customer?.id.toString()
      });
    }
  }, [customer]);

  return (
    <>
      <div className="p-2.5">
        <div className="flex justify-between gap-8">
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="customer-number"
                  label="Mã khách hàng"
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => handleChange('id', e.target.value)}
                  error={errors.id}
                  placeholder="Nhập mã khách hàng"
                  disabled={true}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="customer-name"
                  label="Tên khách hàng"
                  type="text"
                  value={formData.companyName || ''}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  required={!isViewMode}
                  error={errors.companyName}
                  placeholder="Nhập tên khách hàng"
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="tax"
                  label="Mã số thuế"
                  type="text"
                  value={formData.taxIdentificationNumber || ''}
                  onChange={(e) =>
                    handleChange('taxIdentificationNumber', e.target.value)
                  }
                  required={!isViewMode}
                  error={errors.taxIdentificationNumber}
                  placeholder="Nhập mã số thuế"
                  disabled={isViewMode}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="email"
                  label="Email"
                  type="text"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={errors.email}
                  placeholder="Nhập email"
                  disabled={isViewMode}
                  required={!isViewMode}
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="phone"
                  label="Số điện thoại"
                  type="text"
                  value={formData.phoneNumber || ''}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  required={!isViewMode}
                  error={errors.phoneNumber}
                  placeholder="Nhập số điện thoại"
                  disabled={isViewMode}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="address"
                  label="Địa chỉ"
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  required={!isViewMode}
                  error={errors.address}
                  placeholder="Nhập địa chỉ"
                  disabled={isViewMode}
                />
              </div>
            </div>
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
        <DetailInfo customerId={customer?.id} />
      )}
    </>
  );
}
