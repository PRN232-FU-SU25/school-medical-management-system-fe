import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, Equal, MoreHorizontal, Trash, View } from 'lucide-react';
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
import { Customer } from '../../data/types';
import {
  useAssignCustomerDepartment,
  useDeleteCustomer
} from '@/queries/customer.query';
import CustomerDialog from '../customer-dialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SelectField from '@/components/shared/select-field';
import { useGetDropdownDepartment } from '@/queries/department.query';

interface CellActionProps {
  data: Customer;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { refetch } = useRefetch();
  const [loading] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [department, setDepartment] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const { data: departments } = useGetDropdownDepartment();
  const { mutateAsync: deleteCustomer } = useDeleteCustomer();
  const { mutateAsync: assign } = useAssignCustomerDepartment();
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;

  const onConfirm = async () => {
    const res = await deleteCustomer(data.id);
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

  const handleSubmit = async () => {
    if (department) {
      const model = {
        id: 0,
        customerId: data.id,
        deparmentId: department
      };
      const res = await assign(model);
      if (res?.isSuccess) {
        toast({
          variant: 'success',
          title: 'Thành công',
          description: 'Phân công thành công.',
          duration: 3000
        });
        setIsAssignDialogOpen(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra',
          description: 'Phân công thất bại.',
          duration: 3000
        });
      }
    } else {
      setDepartmentError('Bắt buộc chọn 1 phòng ban');
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
              Xem khách hàng
            </DialogTitle>
          </DialogHeader>

          <CustomerDialog type="view" customer={data} />
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
              Cập nhật khách hàng
            </DialogTitle>
          </DialogHeader>

          <CustomerDialog
            type="update"
            customer={data}
            onClose={() => setIsUpdateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isAssignDialogOpen}
        onOpenChange={() => {
          setIsAssignDialogOpen(!isAssignDialogOpen);
        }}
      >
        <DialogContent className="max-h-[90%] max-w-[80%] overflow-y-auto bg-white 2xl:max-w-[70%]">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-medium">
              Phân công vào phòng ban
            </DialogTitle>
          </DialogHeader>
          <SelectField
            id="department"
            label="Phòng ban"
            options={departments}
            value={department || ''}
            onChange={(value) => setDepartment(value)}
            placeholder="Chọn phòng ban"
            required
            error={departmentError}
          />
          <div>
            <Button
              className="w-full text-base font-normal"
              size={'lg'}
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
          </div>
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
          {role === 'Admin' && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsUpdateDialogOpen(true)}
            >
              <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
            </DropdownMenuItem>
          )}
          {role === 'Admin' && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsAssignDialogOpen(true)}
            >
              <Equal className="mr-2 h-4 w-4" /> Phân công
            </DropdownMenuItem>
          )}
          {role === 'Admin' && (
            <DropdownMenuItem
              className="cursor-pointer text-red-500"
              onClick={() => setIsDeleteAlertOpen(true)}
            >
              <Trash className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
