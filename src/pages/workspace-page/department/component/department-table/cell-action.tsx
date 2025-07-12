import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash, View } from 'lucide-react';
import { useState } from 'react';
import { AlertWarning } from '@/components/shared/alert-warning';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useRefetch } from '@/providers/refetch-provider';
import { toast } from '@/components/ui/use-toast';
import { Department } from '../../data/types';
import { useDeleteDepartment } from '@/queries/department.query';
import DepartmentDialog from '../department-dialog';

interface CellActionProps {
  data: Department;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { refetch } = useRefetch();
  const [loading] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { mutateAsync: deleteDepartment } = useDeleteDepartment();

  const onConfirm = async () => {
    const res = await deleteDepartment(data.id);
    if (res?.isSuccess) {
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
        open={isViewDialogOpen}
        onOpenChange={() => {
          setIsViewDialogOpen(!isViewDialogOpen);
        }}
      >
        <DialogContent className="max-h-[90%] max-w-[80%] overflow-y-auto bg-white 2xl:max-w-[70%]">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-medium">
              Xem phòng ban
            </DialogTitle>
          </DialogHeader>

          <DepartmentDialog type="view" department={data} />
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
              Cập nhật phòng ban
            </DialogTitle>
          </DialogHeader>

          <DepartmentDialog
            type="update"
            department={data}
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
