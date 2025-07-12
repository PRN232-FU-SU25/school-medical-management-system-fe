import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ContractService } from '../../data/types';
import { CellAction } from './cell-action';
import helpers from '@/helpers';

export const columns: ColumnDef<ContractService>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="!text-white"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="!text-white"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorFn: (key) => key.id,
    header: 'SỐ DỊCH VỤ'
  },
  {
    accessorFn: (key) => key.name,
    header: 'TÊN DỊCH VỤ'
  },
  {
    accessorFn: (key) => key.totalPrice,
    header: 'GIÁ TRỊ (VNĐ)',
    cell: (info) => helpers.formatNumberWithDot(Number(info.getValue()))
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
