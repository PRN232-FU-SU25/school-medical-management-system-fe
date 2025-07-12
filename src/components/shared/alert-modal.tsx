import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

type TAlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
};
export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title = 'Xác nhận',
  description = 'Bạn có chắc muốn tiếp tục chứ?'
}: TAlertModalProps) => {
  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Quay lại
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          className=""
          onClick={onConfirm}
        >
          Tiếp tục
        </Button>
      </div>
    </Modal>
  );
};
