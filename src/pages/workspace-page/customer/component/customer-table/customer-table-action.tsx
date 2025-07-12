import TableSearchInput from '@/components/shared/table-search-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useState } from 'react';
import CustomerDialog from '../customer-dialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function CustomerTableActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;

  return (
    <div className="flex items-center justify-between">
      {role === 'Admin' && (
        <div className="flex gap-3">
          <Button
            className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white"
            onClick={() => setIsDialogOpen(true)}
            size={'lg'}
          >
            Thêm khách hàng
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
                  Thêm khách hàng
                </DialogTitle>
              </DialogHeader>

              <CustomerDialog
                type="new"
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
      <div className="flex flex-1 justify-end">
        <TableSearchInput placeholder="Tìm kiếm khách hàng" />
      </div>
    </div>
  );
}
