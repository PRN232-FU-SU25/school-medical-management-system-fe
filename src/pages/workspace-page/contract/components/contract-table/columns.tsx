import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Contract } from '../../data/types';
import helper from '@/helpers/index';

export const columns: ColumnDef<Contract>[] = [
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
    header: 'SỐ HỢP ĐỒNG'
  },
  {
    accessorFn: (key) => key.title,
    header: 'TÊN HỢP ĐỒNG'
  },
  {
    accessorFn: (key) => key.customerName,
    header: 'KHÁCH HÀNG'
  },
  {
    accessorFn: (key) => key.totalAmount,
    header: 'GIÁ TRỊ (VNĐ)',
    cell: (info) => {
      const price = Number(info.getValue());
      return price ? helper.formatNumberWithDot(price) : 'Chưa có';
    }
  },
  {
    accessorFn: (key) => key.contractTypeName,
    header: 'LOẠI HỢP ĐỒNG'
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
