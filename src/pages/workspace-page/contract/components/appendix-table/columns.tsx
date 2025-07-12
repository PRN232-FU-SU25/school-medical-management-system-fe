import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ContractAppendix } from '../../data/types';
import { CellAction } from './cell-action';

export const columns: ColumnDef<ContractAppendix>[] = [
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
    header: 'SỐ PHỤ LỤC'
  },
  {
    accessorFn: (key) => key.title,
    header: 'TÊN PHỤ LỤC'
  },
  {
    accessorFn: (key) => key.effectiveDate,
    header: 'NGÀY HIỆU LỰC'
  },
  {
    accessorFn: (key) => key.expirationDate,
    header: 'NGÀY HẾT HẠN'
  },
  {
    accessorFn: (key) => key.signedDate,
    header: 'NGÀY KÝ'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
