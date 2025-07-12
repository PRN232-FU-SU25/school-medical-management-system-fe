import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

export const employeeColumns: ColumnDef<any>[] = [
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
    header: 'MÃ NHÂN VIÊN'
  },
  {
    accessorFn: (key) => key.fullName,
    header: 'TÊN NHÂN VIÊN'
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
    accessorFn: (key) =>
      key.roles[0] === 'Employee' ? 'Nhân viên' : 'Quản lí',
    header: 'CHỨC VỤ'
  }
];
