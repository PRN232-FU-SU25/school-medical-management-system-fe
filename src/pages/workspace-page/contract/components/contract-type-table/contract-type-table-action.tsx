import TableSearchInput from '@/components/shared/table-search-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import ContractTypeDialog from '../contract-dialog/contract-type-dialog';
import { useState } from 'react';

export default function ContractTypeTableActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <Button
          className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white"
          onClick={() => setIsDialogOpen(true)}
          size={'lg'}
        >
          Thêm loại hợp đồng
        </Button>
        <Dialog
          open={isDialogOpen}
          onOpenChange={() => {
            setIsDialogOpen(!isDialogOpen);
          }}
        >
          <DialogContent className="max-h-[90%] max-w-[80%] overflow-y-auto bg-white 2xl:max-w-[70%]">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl font-medium">
                Thêm loại hợp đồng
              </DialogTitle>
            </DialogHeader>

            <ContractTypeDialog
              type="new"
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-1 justify-end">
        <TableSearchInput placeholder="Tìm kiếm" />
      </div>
    </div>
  );
}
