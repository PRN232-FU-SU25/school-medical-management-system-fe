import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, History, MoreHorizontal, Trash, View } from 'lucide-react';
import { useState } from 'react';
import { ContractAppendix } from '../../data/types';
import { AlertWarning } from '@/components/shared/alert-warning';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import AppendixDialog from '../contract-dialog/appendix-dialog';
import { useDeleteAppendix } from '@/queries/appendix.query';
import { useId } from '@/routes/hooks/use-id';
import { useRefetch } from '@/providers/refetch-provider';
import { toast } from '@/components/ui/use-toast';
import AuditTrailTableDialog from '../contract-dialog/audit-trail-table-dialog';
import { useGetAllContractAppendixHistory } from '@/queries/history.query';

interface CellActionProps {
  data: ContractAppendix;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const id = useId();
  const { refetch } = useRefetch();
  const [loading] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const { mutateAsync: deleteAppendix } = useDeleteAppendix();

  const onConfirm = async () => {
    const res = await deleteAppendix({
      contractId: id,
      appendixId: data.id
    });
    if (res === 'Lưu thành công.') {
      toast({
        variant: 'success',
        title: 'Thành công',
        description: 'Xóa thành công.',
        duration: 3000
      });
      refetch?.();
    }
  };

  return (
    <>
      <AlertWarning
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <Dialog
        open={isHistoryDialogOpen}
        onOpenChange={() => {
          setIsHistoryDialogOpen(!isHistoryDialogOpen);
        }}
      >
        <DialogContent className="max-h-[90%] max-w-[80%] overflow-y-auto bg-white 2xl:max-w-[70%]">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-medium">
              Xem lịch sử
            </DialogTitle>
          </DialogHeader>

          <AuditTrailTableDialog
            itemId={data.id}
            useGetHistory={useGetAllContractAppendixHistory}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isViewDialogOpen}
        onOpenChange={() => {
          setIsViewDialogOpen(!isViewDialogOpen);
        }}
      >
        <DialogContent className="max-h-[90%] max-w-[80%] overflow-y-auto bg-white 2xl:max-w-[70%]">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-medium">
              Xem phụ lục hợp đồng
            </DialogTitle>
          </DialogHeader>

          <AppendixDialog type="view" appendix={data} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isUpdateDialogOpen}
        onOpenChange={() => {
          setIsUpdateDialogOpen(!isUpdateDialogOpen);
        }}
      >
        <DialogContent className="max-h-[90%] max-w-[80%] overflow-y-auto bg-white 2xl:max-w-[70%]">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-medium">
              Cập nhật phụ lục hợp đồng
            </DialogTitle>
          </DialogHeader>

          <AppendixDialog
            type="update"
            appendix={data}
            onClose={() => setIsUpdateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-36">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsViewDialogOpen(true)}
          >
            <View className="mr-2 h-4 w-4" /> Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsUpdateDialogOpen(true)}
          >
            <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsHistoryDialogOpen(true)}
          >
            <History className="mr-2 h-4 w-4" /> Xem lịch sử
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={() => setIsDeleteAlertOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
