import DatePicker from '@/components/shared/date-picker';
import PDFUpload from '@/components/shared/pdf-upload';
import TextField from '@/components/shared/text-field';
import TextareaField from '@/components/shared/textarea-field';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useToast } from '@/components/ui/use-toast';
import { PDF } from '@/constants/SVGIcon';
import __helpers from '@/helpers';
import { useRefetch } from '@/providers/refetch-provider';
import { useCreateUpdateAppendix } from '@/queries/appendix.query';
import {
  useDownloadFile,
  useOpenFile,
  useUploadCustomizeFile
} from '@/queries/file.query';
import { useId } from '@/routes/hooks/use-id';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const contractSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .nonempty('Bắt buộc nhập tên phụ lục hợp đồng')
    .max(50, 'Tên hợp đồng ít hơn 50 kí tự'),
  effectiveDate: z.string().nonempty('Bắt buộc chọn ngày hiệu lực'),
  expirationDate: z.string().nonempty('Bắt buộc chọn ngày hết hạn'),
  signedDate: z.string().nonempty('Bắt buộc chọn ngày ký'),
  content: z.string().nonempty('Bắt buộc nhập nội dung')
});

type AppendixFormData = z.infer<typeof contractSchema>;

type Props = {
  type: 'new' | 'update' | 'view';
  appendix?: any;
  onClose?: () => void;
};

export default function AppendixDialog({ type, appendix, onClose }: Props) {
  const id = useId();
  const { refetch } = useRefetch();
  const { toast } = useToast();
  const { mutateAsync: uploadFile } = useUploadCustomizeFile();
  const { mutateAsync: crud } = useCreateUpdateAppendix();
  const { mutateAsync: download } = useDownloadFile();
  const { mutateAsync: open } = useOpenFile();
  const [formData, setFormData] = useState<Partial<AppendixFormData>>({
    id: '',
    title: '',
    effectiveDate: '',
    expirationDate: '',
    signedDate: '',
    content: ''
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof AppendixFormData, string>>
  >({});

  const handleChange = (field: keyof AppendixFormData, value: any) => {
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
            acc[key as keyof AppendixFormData] =
              errorMessages && errorMessages.length > 0 ? errorMessages[0] : '';
            return acc;
          },
          {} as Partial<Record<keyof AppendixFormData, string>>
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
                id: 0,
                contractId: id,
                fileName: fileUrl,
                effectiveDate: __helpers.convertToDateString(
                  formData.effectiveDate
                ),
                expirationDate: __helpers.convertToDateString(
                  formData.expirationDate
                ),
                signedDate: __helpers.convertToDateString(formData.signedDate)
              };
              const res = await crud(model);
              if (res === 'Lưu thành công.') {
                refetch?.();
                onClose?.();
                toast({
                  variant: 'success',
                  title: 'Thành công',
                  description: 'Thêm phụ lục thành công.',
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
        description: 'Vui lòng tải phụ lục hợp đồng lên.',
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
                contractId: id,
                fileName: fileUrl,
                effectiveDate: __helpers.convertToDateString(
                  formData.effectiveDate
                ),
                expirationDate: __helpers.convertToDateString(
                  formData.expirationDate
                ),
                signedDate: __helpers.convertToDateString(formData.signedDate)
              };
              const res = await crud(model);
              if (res === 'Lưu thành công.') {
                refetch?.();
                onClose?.();
                toast({
                  variant: 'success',
                  title: 'Thành công',
                  description: 'Cập nhật phụ lục thành công.',
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
          contractId: id,
          effectiveDate: __helpers.convertToDateString(formData.effectiveDate),
          expirationDate: __helpers.convertToDateString(
            formData.expirationDate
          ),
          signedDate: __helpers.convertToDateString(formData.signedDate)
        };
        const res = await crud(model);
        if (res === 'Lưu thành công.') {
          refetch?.();
          onClose?.();
          toast({
            variant: 'success',
            title: 'Thành công',
            description: 'Cập nhật phụ lục thành công.',
            duration: 3000
          });
        }
      }
    }
  };

  const [isViewMode] = useState(type === 'view');
  const [files, setFiles] = useState<File[]>([]);

  const handleDownload = async () => {
    await download(appendix.fileName);
  };

  const handleOpenFile = async () => {
    await open(appendix.fileName);
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  useEffect(() => {
    if (type !== 'new') {
      setFormData({
        ...appendix,
        id: appendix?.id.toString()
      });
    }
  }, [appendix]);

  return (
    <>
      <div className="p-2.5">
        <div className="flex justify-between gap-8">
          <div className="flex w-2/3 flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="appendix-number"
                  label="Số phụ lục hợp đồng"
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => handleChange('id', e.target.value)}
                  error={errors.id}
                  placeholder="Nhập số phụ lục hợp đồng"
                  disabled={true}
                />
              </div>

              <div className="w-full">
                <TextField
                  id="appendix-name"
                  label="Tên phụ lục hợp đồng"
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required={!isViewMode}
                  error={errors.title}
                  placeholder="Nhập tên phụ lục hợp đồng"
                  disabled={isViewMode}
                />
              </div>
            </div>
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
              label="Mô tả phụ lục hợp đồng"
              value={formData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Mô tả phụ lục hợp đồng..."
              error={errors.content}
              disabled={isViewMode}
              required={!isViewMode}
            />
          </div>
          <div className="w-1/3 flex-1">
            {!isViewMode ? (
              <>
                <PDFUpload
                  title="Tải phụ lục hợp đồng lên"
                  required
                  onChange={handleFileChange}
                  value={files}
                />
              </>
            ) : (
              <>
                <div className="flex w-full flex-col gap-6 font-normal">
                  <div className="text-xl">Phụ lục hợp đồng</div>
                  {appendix && appendix.fileName && (
                    <div className="w-full">
                      <div className="flex w-full items-start gap-6 rounded-lg bg-secondary p-4">
                        <div>
                          <PDF />
                        </div>
                        <div className="flex h-11 w-full flex-col justify-between">
                          <div className="w-3/4 truncate">
                            {__helpers.getFileName(appendix.fileName)}
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
                    Xem phụ lục hợp đồng
                  </Button>
                </div>
              </>
            )}
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
