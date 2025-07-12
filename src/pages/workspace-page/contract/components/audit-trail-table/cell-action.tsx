import { ContractAuditTrail } from '../../data/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import AuditTrailDialog from '../contract-dialog/audit-trail-dialog';
import { Button } from '@/components/ui/button';
import { View } from 'lucide-react';

interface CellActionProps {
  data: ContractAuditTrail;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'link'} className="text-gray-800">
            <View className="mr-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90%] max-w-[80%] overflow-y-auto bg-white 2xl:max-w-[70%]">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-medium">
              Xem chi tiết
            </DialogTitle>
          </DialogHeader>

          <AuditTrailDialog auditTrail={data} />
        </DialogContent>
      </Dialog>
    </>
  );
};
