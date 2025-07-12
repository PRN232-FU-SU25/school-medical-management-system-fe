import PDFUpload from '@/components/shared/pdf-upload';
import TextField from '@/components/shared/text-field';
import TextareaField from '@/components/shared/textarea-field';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useToast } from '@/components/ui/use-toast';
import { PDF } from '@/constants/SVGIcon';
import __helpers from '@/helpers';
import { useRefetch } from '@/providers/refetch-provider';
import { useCreateUpdateDocument } from '@/queries/document.query';
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
  name: z
    .string()
    .nonempty('Bắt buộc nhập tên tài liệu')
    .max(50, 'Tên hợp đồng ít hơn 50 kí tự'),
  description: z.string().nonempty('Bắt buộc nhập nội dung')
});

type DocumentFormData = z.infer<typeof contractSchema>;

type Props = {
  type: 'new' | 'update' | 'view';
  document?: any;
  onClose?: () => void;
};

export default function DocumentDialog({ type, document, onClose }: Props) {
  const id = useId();
  const { refetch } = useRefetch();
  const { toast } = useToast();
  const { mutateAsync: uploadFile } = useUploadCustomizeFile();
  const { mutateAsync: crud } = useCreateUpdateDocument();
  const { mutateAsync: download } = useDownloadFile();
  const { mutateAsync: open } = useOpenFile();
  const [formData, setFormData] = useState<Partial<DocumentFormData>>({
    id: '',
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof DocumentFormData, string>>
  >({});

  const handleChange = (field: keyof DocumentFormData, value: any) => {
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
            acc[key as keyof DocumentFormData] =
              errorMessages && errorMessages.length > 0 ? errorMessages[0] : '';
            return acc;
          },
          {} as Partial<Record<keyof DocumentFormData, string>>
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
                fileName: fileUrl
              };
              const res = await crud(model);
              if (res === 'Lưu thành công.') {
                refetch?.();
                onClose?.();
                toast({
                  variant: 'success',
                  title: 'Thành công',
                  description: 'Thêm tài liệu thành công.',
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
        description: 'Vui lòng tải tài liệu lên.',
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
                fileName: fileUrl
              };
              const res = await crud(model);
              if (res === 'Lưu thành công.') {
                refetch?.();
                onClose?.();
                toast({
                  variant: 'success',
                  title: 'Thành công',
                  description: 'Cập nhật tài liệu thành công.',
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
            description: 'Cập nhật tài liệu thành công.',
            duration: 3000
          });
        }
      }
    }
  };

  const [isViewMode] = useState(type === 'view');
  const [files, setFiles] = useState<File[]>([]);

  const handleDownload = async () => {
    await download(document.fileName);
  };

  const handleOpenFile = async () => {
    await open(document.fileName);
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  useEffect(() => {
    if (type !== 'new') {
      setFormData({
        ...document,
        id: document?.id.toString()
      });
    }
  }, [document]);
  return (
    <>
      <div className="p-2.5">
        <div className="flex justify-between gap-8">
          <div className="flex w-2/3 flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="document-number"
                  label="Số tài liệu"
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => handleChange('id', e.target.value)}
                  error={errors.id}
                  placeholder="Nhập số tài liệu"
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-full">
                <TextField
                  id="document-name"
                  label="Tên tài liệu"
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required={!isViewMode}
                  error={errors.name}
                  placeholder="Nhập tên tài liệu"
                  disabled={isViewMode}
                />
              </div>
            </div>

            <TextareaField
              id="description"
              label="Mô tả tài liệu đính kèm"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Mô tả tài liệu đính kèm..."
              error={errors.description}
              disabled={isViewMode}
              required={!isViewMode}
            />
          </div>
          <div className="w-1/3 flex-1">
            {!isViewMode ? (
              <>
                <PDFUpload
                  title="Tải tài liệu đính kèm lên"
                  required
                  onChange={handleFileChange}
                  value={files}
                />
              </>
            ) : (
              <>
                <div className="flex w-full flex-col gap-6 font-normal">
                  <div className="text-xl">Tài liệu đính kèm</div>
                  {document && document.fileName && (
                    <div className="w-full">
                      <div className="flex w-full items-start gap-6 rounded-lg bg-secondary p-4">
                        <div>
                          <PDF />
                        </div>
                        <div className="flex h-11 w-full flex-col justify-between">
                          <div className="w-3/4 truncate">
                            {__helpers.getFileName(document.fileName)}
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
                    Xem tài liệu đính kèm
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
