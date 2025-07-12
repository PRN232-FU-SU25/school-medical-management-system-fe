import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash, View } from 'lucide-react';
import { useRouter } from '@/routes/hooks';
import { useState } from 'react';
import { Contract } from '../../data/types';
import { AlertWarning } from '@/components/shared/alert-warning';
import { useDeleteContract } from '@/queries/contract.query';
import { toast } from '@/components/ui/use-toast';
import { useRefetch } from '@/providers/refetch-provider';

interface CellActionProps {
  data: Contract;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { refetch } = useRefetch();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteContract } = useDeleteContract();
  const router = useRouter();

  const onConfirm = async () => {
    const res = await deleteContract(data.id);
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
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
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
            onClick={() => router.push(`/contract/${data.id}`)}
          >
            <View className="mr-2 h-4 w-4" /> Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/contract/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
