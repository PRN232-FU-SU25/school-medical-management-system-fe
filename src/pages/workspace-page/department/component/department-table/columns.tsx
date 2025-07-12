import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Department } from '../../data/types';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Department>[] = [
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
    header: 'SỐ PHÒNG BAN'
  },
  {
    accessorFn: (key) => key.name,
    header: 'TÊN PHÒNG BAN'
  },
  {
    accessorFn: (key) => key.employeeQuantity,
    header: 'SỐ NHÂN VIÊN'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
