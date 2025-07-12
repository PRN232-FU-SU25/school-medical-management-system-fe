import { ColumnDef } from '@tanstack/react-table';
import { Contract } from './types';
import { formatNumberWithCommas } from './helpers';
export const contractColumns: ColumnDef<Contract>[] = [
  {
    header: 'Số hợp đồng',
    accessorFn: (key) => key?.id
  },
  {
    header: 'Tên hợp đồng',
    accessorFn: (key) => key?.title
  },
  {
    header: 'Nội dung',
    accessorFn: (key) => key?.keyContent
  },
  {
    header: 'Khách hàng',
    accessorFn: (key) => key?.customerName
  },
  {
    header: 'Loại hợp đồng',
    accessorFn: (key) => key?.contractTypeName
  },
  {
    header: 'Giá trị (VNĐ)',
    accessorFn: (key) => key?.totalAmount,
    cell: (info) => formatNumberWithCommas(Number(info.getValue()))
  },
  {
    header: 'Ngày hiệu lực',
    accessorFn: (key) => key?.effectiveDate
  },
  {
    header: 'Ngày hết hạn',
    accessorFn: (key) => key?.expirationDate
  },
  {
    header: 'Ngày ký',
    accessorFn: (key) => key?.signedDate
  }
];
