import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, History, MoreHorizontal, Trash, View } from 'lucide-react';
import { useState } from 'react';
import { ContractService } from '../../data/types';
import { AlertWarning } from '@/components/shared/alert-warning';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import ServiceDialog from '../contract-dialog/service-dialog';
import { useId } from '@/routes/hooks/use-id';
import { useRefetch } from '@/providers/refetch-provider';
import { useDeleteService } from '@/queries/service.query';
import { toast } from '@/components/ui/use-toast';
import AuditTrailTableDialog from '../contract-dialog/audit-trail-table-dialog';
import { useGetAllContractServiceHistory } from '@/queries/history.query';

interface CellActionProps {
  data: ContractService;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const id = useId();
  const { refetch } = useRefetch();
  const [loading] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const { mutateAsync: deleteService } = useDeleteService();

  const onConfirm = async () => {
    const res = await deleteService({
      contractId: id,
      serviceId: data.id
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
            useGetHistory={useGetAllContractServiceHistory}
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
              Xem dịch vụ
            </DialogTitle>
          </DialogHeader>

          <ServiceDialog type="view" service={data} />
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
              Cập nhật dịch vụ
            </DialogTitle>
          </DialogHeader>

          <ServiceDialog
            type="update"
            service={data}
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
