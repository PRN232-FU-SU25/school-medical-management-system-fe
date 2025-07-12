import { useEffect, useState } from 'react';
import { z } from 'zod';
import DatePicker from '@/components/shared/date-picker';
import SelectField from '@/components/shared/select-field';
import TextField from '@/components/shared/text-field';
import TextareaField from '@/components/shared/textarea-field';
import PDFUpload from '@/components/shared/pdf-upload';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/routes/hooks';
import {
  useCreateContract,
  useGetContractTypeList,
  useGetCustomerList,
  useUpdateContract
} from '@/queries/contract.query';
import {
  useDownloadFile,
  useOpenFile,
  useUploadCustomizeFile
} from '@/queries/file.query';
import { useToast } from '@/components/ui/use-toast';
import __helpers from '@/helpers';
import { Icons } from '@/components/ui/icons';
import { PDF } from '@/constants/SVGIcon';
import { useRefetch } from '@/providers/refetch-provider';

const contractSchema = z.object({
  id: z.string().optional(),
  contractTypeId: z.string().nonempty('Bắt buộc chọn loại hợp đồng'),
  title: z
    .string()
    .nonempty('Bắt buộc nhập tên hợp đồng')
    .max(50, 'Tên hợp đồng ít hơn 50 kí tự'),
  totalAmount: z.number().min(0, 'Giá trị phải lớn hơn hoặc bằng 0').optional(),
  customerId: z.string().nonempty('Bắt buộc chọn khách hàng'),
  effectiveDate: z.string().nonempty('Bắt buộc chọn ngày hiệu lực'),
  expirationDate: z.string().nonempty('Bắt buộc chọn ngày hết hạn'),
  signedDate: z.string().nonempty('Bắt buộc chọn ngày ký'),
  keyContent: z.string().nonempty('Bắt buộc nhập nội dung chính'),
  contractDaysLeft: z.string().optional(),
  appendixDaysLeft: z.string().optional()
});

type ContractFormData = z.infer<typeof contractSchema>;

type Props = {
  mode: 'new' | 'edit' | 'view';
  contract?: any;
};

export default function BasicInfo({ mode, contract }: Props) {
  const { refetch } = useRefetch();
  const { toast } = useToast();
  const router = useRouter();
  const { data: customerList, isPending: isCustomerListPending } =
    useGetCustomerList();
  const { data: typeList, isPending: isTypeListPending } =
    useGetContractTypeList();
  const { mutateAsync: uploadFile } = useUploadCustomizeFile();
  const { mutateAsync: create } = useCreateContract();
  const { mutateAsync: update } = useUpdateContract();
  const { mutateAsync: download } = useDownloadFile();
  const { mutateAsync: open } = useOpenFile();
  const [formData, setFormData] = useState<Partial<ContractFormData>>({
    id: '',
    contractTypeId: '',
    title: '',
    totalAmount: 0,
    customerId: '',
    effectiveDate: '',
    expirationDate: '',
    signedDate: '',
    keyContent: '',
    contractDaysLeft: '',
    appendixDaysLeft: ''
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContractFormData, string>>
  >({});
  const [isViewMode, setIsViewMode] = useState(mode === 'view');
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (mode !== 'new') {
      setFormData({
        ...contract,
        id: contract.id.toString(),
        contractDaysLeft: contract.contractDaysLeft.toString(),
        appendixDaysLeft: contract.appendixDaysLeft.toString(),
        contractTypeId: typeList?.find(
          (type) => type.label === contract?.contractTypeName
        )?.value,
        customerId: customerList?.find(
          (customer) => customer.label === contract?.customerName
        )?.value
      });
    }
  }, [contract, typeList, customerList]);

  const handleChange = (field: keyof ContractFormData, value: any) => {
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
            acc[key as keyof ContractFormData] =
              errorMessages && errorMessages.length > 0 ? errorMessages[0] : '';
            return acc;
          },
          {} as Partial<Record<keyof ContractFormData, string>>
        )
      );
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async () => {
    if (files && files[0]) {
      const customFileName = files[0].name.substring(
        0,
        files[0].name.lastIndexOf('.')
      );
      if (customFileName.length > 20) {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra',
          description: 'Tên file không được vượt quá 20 kí tự.',
          duration: 3000
        });
        return;
      }
      if (validateForm()) {
        const checkMsg = __helpers.validateContractDates(
          formData.signedDate,
          formData.effectiveDate,
          formData.expirationDate
        );
        if (checkMsg !== 'Hợp lệ') {
          toast({
            variant: 'destructive',
            title: 'Có lỗi xảy ra',
            description: checkMsg,
            duration: 3000
          });
          return;
        }
        await uploadFile(
          {
            customFileName,
            file: files[0]
          },
          {
            onSuccess: async (data) => {
              const fileUrl = data?.fileName;
              const model = {
                ...formData,
                contractFile: fileUrl,
                effectiveDate: __helpers.convertToDateString(
                  formData.effectiveDate
                ),
                expirationDate: __helpers.convertToDateString(
                  formData.expirationDate
                ),
                signedDate: __helpers.convertToDateString(formData.signedDate),
                contractDayLeft: parseInt(formData.contractDaysLeft || '0'),
                appendixDayLeft: parseInt(formData.appendixDaysLeft || '0')
              };
              const res = await create(model);
              if (res.data?.contractId) {
                router.push(`/contract/${res.data.contractId}`);
                toast({
                  variant: 'success',
                  title: 'Thành công',
                  description: 'Thêm hợp đồng thành công.',
                  duration: 3000
                });
              }
            },
            onError: (error) => {
              toast({
                variant: 'destructive',
                title: 'Có lỗi xảy ra',
                description: 'Vui lòng kiểm tra kết nối internet.',
                duration: 3000
              });
              console.log(error);
            }
          }
        );
      }
    } else {
      validateForm();
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng tải hợp đồng lên.',
        duration: 3000
      });
    }
  };

  const handleUpdate = async () => {
    if (files && files[0]) {
      const customFileName = files[0].name.substring(
        0,
        files[0].name.lastIndexOf('.')
      );
      if (customFileName.length > 20) {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra',
          description: 'Tên file không được vượt quá 20 kí tự.',
          duration: 3000
        });
        return;
      }
      if (validateForm()) {
        const checkMsg = __helpers.validateContractDates(
          formData.signedDate,
          formData.effectiveDate,
          formData.expirationDate
        );
        if (checkMsg !== 'Hợp lệ') {
          toast({
            variant: 'destructive',
            title: 'Có lỗi xảy ra',
            description: checkMsg,
            duration: 3000
          });
          return;
        }
        await uploadFile(
          {
            customFileName,
            file: files[0]
          },
          {
            onSuccess: async (data) => {
              const fileUrl = data?.fileName;
              const model = {
                ...formData,
                contractFile: fileUrl,
                effectiveDate: __helpers.convertToDateString(
                  formData.effectiveDate
                ),
                expirationDate: __helpers.convertToDateString(
                  formData.expirationDate
                ),
                signedDate: __helpers.convertToDateString(formData.signedDate),
                contractDayLeft: parseInt(formData.contractDaysLeft || '0'),
                appendixDayLeft: parseInt(formData.appendixDaysLeft || '0')
              };
              const res = await update(model);
              if (res === 'Lưu thành công.') {
                setIsViewMode(true);
                refetch?.();
                toast({
                  variant: 'success',
                  title: 'Thành công',
                  description: 'Cập nhật hợp đồng thành công.',
                  duration: 3000
                });
              }
            },
            onError: (error) => {
              toast({
                variant: 'destructive',
                title: 'Có lỗi xảy ra',
                description: 'Vui lòng kiểm tra kết nối internet.',
                duration: 3000
              });
              console.log(error);
            }
          }
        );
      }
    } else {
      if (validateForm()) {
        const checkMsg = __helpers.validateContractDates(
          formData.signedDate,
          formData.effectiveDate,
          formData.expirationDate
        );
        if (checkMsg !== 'Hợp lệ') {
          toast({
            variant: 'destructive',
            title: 'Có lỗi xảy ra',
            description: checkMsg,
            duration: 3000
          });
          return;
        }
        const model = {
          ...formData,
          effectiveDate: __helpers.convertToDateString(formData.effectiveDate),
          expirationDate: __helpers.convertToDateString(
            formData.expirationDate
          ),
          signedDate: __helpers.convertToDateString(formData.signedDate),
          contractDayLeft: parseInt(formData.contractDaysLeft || '0'),
          appendixDayLeft: parseInt(formData.appendixDaysLeft || '0')
        };
        const res = await update(model);
        if (res === 'Lưu thành công.') {
          setIsViewMode(true);
          refetch?.();
          toast({
            variant: 'success',
            title: 'Thành công',
            description: 'Cập nhật hợp đồng thành công.',
            duration: 3000
          });
        }
      }
    }
  };

  const handleDownload = async () => {
    await download(contract.contractFile);
  };

  const handleOpenFile = async () => {
    await open(contract.contractFile);
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  if (isCustomerListPending || isTypeListPending) {
    return <>Đang tải...</>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-8">
        <div className="flex w-2/3 flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="w-full">
              <TextField
                id="contract-number"
                label="Số hợp đồng"
                type="text"
                value={formData.id || ''}
                onChange={(e) => handleChange('id', e.target.value)}
                error={errors.id}
                placeholder="Nhập số hợp đồng"
                disabled={true}
              />
            </div>

            <div className="w-full">
              <TextField
                id="contract-price"
                label="Giá trị hợp đồng (VNĐ)"
                type="number"
                value={formData.totalAmount || ''}
                onChange={(e) =>
                  handleChange('totalAmount', parseInt(e.target.value))
                }
                error={errors.totalAmount}
                placeholder="Nhập giá trị hợp đồng"
                disabled={isViewMode}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-full">
              <TextField
                id="contract-name"
                label="Tên hợp đồng"
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                required={!isViewMode}
                error={errors.title}
                placeholder="Nhập tên hợp đồng"
                disabled={isViewMode}
              />
            </div>

            <div className="w-full">
              <SelectField
                id="type"
                label="Loại hợp đồng"
                options={typeList}
                value={formData.contractTypeId || ''}
                onChange={(value) => handleChange('contractTypeId', value)}
                placeholder="Chọn loại hợp đồng"
                required={!isViewMode}
                error={errors.contractTypeId}
                disabled={isViewMode}
              />
            </div>
          </div>
          <SelectField
            id="customer"
            label="Khách hàng"
            options={customerList}
            value={formData.customerId || ''}
            onChange={(value) => handleChange('customerId', value)}
            placeholder="Chọn khách hàng"
            required={!isViewMode}
            error={errors.customerId}
            disabled={isViewMode}
          />
          <div className="flex items-center gap-6">
            <div className="w-full">
              <DatePicker
                id="effective-date"
                label="Ngày hiệu lực"
                value={formData.effectiveDate}
                onChange={(date) => handleChange('effectiveDate', date)}
                placeholder="Chọn ngày hiệu lực"
                required={!isViewMode}
                error={errors.effectiveDate}
                disabled={isViewMode}
              />
            </div>

            <div className="w-full">
              <DatePicker
                id="expiration-date"
                label="Ngày hết hạn"
                value={formData.expirationDate}
                onChange={(date) => handleChange('expirationDate', date)}
                placeholder="Chọn ngày hết hạn"
                required={!isViewMode}
                error={errors.expirationDate}
                disabled={isViewMode}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-full">
              <DatePicker
                id="signed-date"
                label="Ngày ký"
                value={formData.signedDate}
                onChange={(date) => handleChange('signedDate', date)}
                placeholder="Chọn ngày ký"
                required={!isViewMode}
                error={errors.signedDate}
                disabled={isViewMode}
              />
            </div>

            <div className="w-full"></div>
          </div>

          <TextareaField
            id="description"
            label="Nội dung chính hợp đồng"
            value={formData.keyContent || ''}
            onChange={(e) => handleChange('keyContent', e.target.value)}
            placeholder="Nhập nội dung chính hợp đồng..."
            error={errors.keyContent}
            disabled={isViewMode}
            required={!isViewMode}
          />
        </div>
        <div className="flex w-1/3 flex-1 flex-col gap-6">
          {!isViewMode ? (
            <>
              <PDFUpload
                title="Tải hợp đồng lên"
                required={!isViewMode}
                onChange={handleFileChange}
                value={files}
              />
              <div className="flex flex-col gap-0.5 text-sm">
                <div className="mb-2 text-xl font-normal">
                  Cài đặt thông báo
                </div>
                <div className="flex items-center gap-2">
                  <span>Trước khi hết hạn hợp đồng</span>
                  <TextField
                    id="contractDaysLeft"
                    label=""
                    type="number"
                    //@ts-ignore
                    className="h-7 w-12 rounded-sm border pl-1"
                    value={formData.contractDaysLeft || ''}
                    onChange={(e) =>
                      handleChange('contractDaysLeft', e.target.value)
                    }
                    error={errors.contractDaysLeft}
                    disabled={isViewMode}
                  />
                  <span>ngày</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Trước khi hết hạn phụ lục hợp đồng</span>
                  <TextField
                    id="appendixDaysLeft"
                    label=""
                    type="number"
                    //@ts-ignore
                    className="h-7 w-12 rounded-sm border pl-1"
                    value={formData.appendixDaysLeft || ''}
                    onChange={(e) =>
                      handleChange('appendixDaysLeft', e.target.value)
                    }
                    error={errors.appendixDaysLeft}
                    disabled={isViewMode}
                  />
                  <span>ngày</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full flex-col gap-6 font-normal">
                <div className="text-xl">Hợp đồng</div>
                {contract && contract.contractFile && (
                  <div className="w-full">
                    <div className="flex w-full items-start gap-6 rounded-lg bg-secondary p-4">
                      <div>
                        <PDF />
                      </div>
                      <div className="flex h-11 w-full flex-col justify-between">
                        <div className="w-3/4 truncate">
                          {__helpers.getFileName(contract.contractFile)}
                        </div>
                        <div
                          className="flex cursor-pointer items-end justify-end gap-1 text-xs font-light"
                          onClick={handleDownload}
                        >
                          <div className="flex h-4 w-4 items-center justify-center">
                            <Icons.download className="size-3" />
                          </div>
                          Tải về
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <Button
                  size={'lg'}
                  variant={'outlineBlue'}
                  className="border-2"
                  onClick={handleOpenFile}
                >
                  Xem hợp đồng
                </Button>
              </div>
              <div className="flex flex-col gap-0.5 text-sm">
                <div className="mb-2 text-xl font-normal">Thông báo</div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex gap-1.5">
                    Trước khi hết hạn hợp đồng
                    <span className="text-red-500">
                      {formData.contractDaysLeft || ''}
                    </span>
                    ngày
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex gap-1.5">
                    Trước khi hết hạn phụ lục hợp đồng
                    <span className="text-red-500">
                      {formData.appendixDaysLeft || ''}
                    </span>
                    ngày
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <hr className="h-[1.5px] bg-gray-200" />
      <div className="flex justify-end gap-2.5">
        {!isViewMode ? (
          <>
            <Button
              size={'lg'}
              variant={'destructive'}
              onClick={
                mode === 'new'
                  ? () => router.push('/')
                  : () => setIsViewMode(true)
              }
            >
              Hủy bỏ
            </Button>
            <Button
              size={'lg'}
              onClick={mode === 'new' ? handleSubmit : handleUpdate}
              className="hover:brightness-110"
            >
              Hoàn tất
            </Button>
          </>
        ) : (
          <Button
            size={'lg'}
            onClick={() => setIsViewMode(false)}
            className="hover:brightness-110"
          >
            Chỉnh sửa
          </Button>
        )}
      </div>
    </div>
  );
}
