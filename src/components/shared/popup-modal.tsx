import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

type TPopupModalProps = {
  onConfirm?: () => void;
  loading?: boolean;
  renderModal: (onClose: () => void) => React.ReactNode;
  label?: string;
};
export default function PopupModal({ renderModal, label }: TPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <Button
        className="border-2 border-primary bg-white text-xs text-primary hover:bg-primary hover:text-white md:text-sm"
        size={'lg'}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={'!bg-background !px-1'}
      >
        <ScrollArea className="h-[80dvh] px-6  ">
          {renderModal(onClose)}
        </ScrollArea>
      </Modal>
    </>
  );
}
