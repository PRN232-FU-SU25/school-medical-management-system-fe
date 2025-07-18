import { Accept, useDropzone } from 'react-dropzone';
import { Icons } from '../ui/icons';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { PDF } from '@/constants/SVGIcon';

type PDFUploadProps = {
  onChange: (value: File[]) => void;
  value: File[];
  title?: string;
  required?: boolean;
};

export default function PDFUpload({
  onChange,
  value,
  title = 'Tải lên',
  required = false
}: PDFUploadProps) {
  const { toast } = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf' as unknown as Accept,
    onDrop: (acceptedFiles: File[]) => {
      const pdfFiles = acceptedFiles.filter(
        (file) => file.type === 'application/pdf'
      );

      if (pdfFiles.length < acceptedFiles.length) {
        toast({
          variant: 'destructive',
          title: 'Không hợp lệ',
          description: 'Vui lòng chọn file có định dạng pdf.'
        });
      }

      onChange(pdfFiles);
    }
  });

  function formatFileSize(size: number): string {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  }

  return (
    <div className="flex w-full flex-col gap-6 font-normal">
      <div className="text-xl">
        {title}
        {required && <span className="text-red-500"> *</span>}
      </div>
      <div
        {...getRootProps()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-4 border-dashed border-sky-600 px-2 py-6 hover:border-primary"
      >
        <input {...getInputProps({ accept: 'application/pdf' })} />
        <Icons.cloudUpload className="h-10 w-10" />
        <p className="mt-3 text-center text-base">
          Chọn một tệp hoặc kéo và thả vào đây
        </p>
        <p className="mb-3 text-center text-xs text-gray-500">
          Định dạng PDF, tối đa 50MB
        </p>
        <Button size={'lg'} variant={'outline'} className="border-2">
          Chọn từ thiết bị
        </Button>
      </div>
      {value && value.length > 0 && (
        <div className="w-full">
          <p className="mb-2.5 text-sm font-medium">Đã tải lên</p>
          <div className="relative flex w-full items-center gap-6 rounded-lg bg-secondary p-4">
            <div>
              <PDF />
            </div>
            <div className="w-full">
              <div className="w-2/3 truncate">{value[0].name}</div>
              <div className="flex items-center gap-2.5 text-sm font-light">
                <div className="flex items-center text-gray-400">
                  {formatFileSize(value[0].size)}
                  <Icons.dot />
                </div>
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400">
                  <Icons.check className="size-2.5 text-white" />
                </div>
                Hoàn tất
              </div>
            </div>
            <Icons.close
              className="absolute right-2 top-2 size-4 cursor-pointer"
              onClick={() => onChange([])}
            />
          </div>
        </div>
      )}
    </div>
  );
}
