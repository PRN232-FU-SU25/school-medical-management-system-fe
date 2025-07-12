import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Customer } from '../../data/types';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Customer>[] = [
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
    header: 'MÃ KHÁCH HÀNG'
  },
  {
    accessorFn: (key) => key.companyName,
    header: 'TÊN KHÁCH HÀNG'
  },
  {
    accessorFn: (key) => key.taxIdentificationNumber,
    header: 'MÃ SỐ THUẾ'
  },
  {
    accessorFn: (key) => key.email,
    header: 'EMAIL LIÊN HỆ'
  },
  {
    accessorFn: (key) => key.phoneNumber,
    header: 'SỐ ĐIỆN THOẠI'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
