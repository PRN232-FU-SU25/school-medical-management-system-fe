import TableSearchInput from '@/components/shared/table-search-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useState } from 'react';
import DepartmentDialog from '../department-dialog';

export default function DepartmentTableActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <Button
          className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white"
          onClick={() => setIsDialogOpen(true)}
          size={'lg'}
        >
          Thêm phòng ban
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
                Thêm phòng ban
              </DialogTitle>
            </DialogHeader>

            <DepartmentDialog
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
