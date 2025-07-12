import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ContractAuditTrail } from '../../data/types';
import { CellAction } from './cell-action';
import { historyActionMapping, historyCategoryMapping } from '@/constants/data';

export const columns: ColumnDef<ContractAuditTrail>[] = [
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
    accessorFn: (key) => historyActionMapping[key.action] || key.action,
    header: 'HÀNH ĐỘNG'
  },
  {
    accessorFn: (key) => historyCategoryMapping[key.category] || key.category,
    header: 'NỘI DUNG THAY ĐỔI'
  },
  {
    accessorFn: (key) => key.createdBy,
    header: 'BỞI NHÂN VIÊN'
  },
  {
    accessorFn: (key) => key.createdDate,
    header: 'NGÀY THAY ĐỔI'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
