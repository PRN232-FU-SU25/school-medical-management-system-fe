import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Icons } from '@/components/ui/icons';
import { Link } from 'react-router-dom';
import DataTable from '@/components/shared/data-table';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Dữ liệu mẫu cho danh sách thuốc
const medicationsData = [
  {
    id: 1,
    name: 'Paracetamol',
    type: 'Thuốc hạ sốt',
    unit: 'Viên',
    dosage: '500mg',
    quantity: 100,
    expiryDate: '12/2024',
    manufacturer: 'Công ty Dược A',
    status: 'Còn hàng'
  },
  {
    id: 2,
    name: 'Betadine',
    type: 'Sát trùng',
    unit: 'Chai',
    dosage: '100ml',
    quantity: 20,
    expiryDate: '06/2024',
    manufacturer: 'Công ty Dược B',
    status: 'Sắp hết'
  },
  {
    id: 3,
    name: 'Băng gạc vô trùng',
    type: 'Vật tư y tế',
    unit: 'Gói',
    dosage: 'N/A',
    quantity: 50,
    expiryDate: '12/2025',
    manufacturer: 'Công ty Y tế C',
    status: 'Còn hàng'
  },
  {
    id: 4,
    name: 'Thuốc ho',
    type: 'Thuốc điều trị',
    unit: 'Chai',
    dosage: '60ml',
    quantity: 5,
    expiryDate: '03/2024',
    manufacturer: 'Công ty Dược D',
    status: 'Cần nhập thêm'
  }
];

// Định nghĩa cột cho bảng
const columns = [
  {
    accessorKey: 'name',
    header: 'Tên thuốc/vật tư',
    cell: ({ row }: any) => (
      <div className="font-medium text-teal-900">{row.getValue('name')}</div>
    )
  },
  {
    accessorKey: 'type',
    header: 'Loại',
    cell: ({ row }: any) => (
      <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
        {row.getValue('type')}
      </span>
    )
  },
  {
    accessorKey: 'dosage',
    header: 'Hàm lượng',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('dosage')}</div>
    )
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng',
    cell: ({ row }: any) => {
      const quantity = row.getValue('quantity');
      const unit = row.original.unit;
      return (
        <div className="font-medium">
          {quantity} {unit}
        </div>
      );
    }
  },
  {
    accessorKey: 'expiryDate',
    header: 'Hạn sử dụng',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('expiryDate')}</div>
    )
  },
  {
    accessorKey: 'manufacturer',
    header: 'Nhà sản xuất',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('manufacturer')}</div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }: any) => {
      const status = row.getValue('status');
      const statusConfig = {
        'Còn hàng': { variant: 'success' },
        'Sắp hết': { variant: 'warning' },
        'Cần nhập thêm': { variant: 'destructive' }
      } as const;
      const config = statusConfig[status as keyof typeof statusConfig];
      return <Badge variant={config.variant}>{status}</Badge>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }: any) => {
      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
          >
            <Icons.pencil className="h-4 w-4" />
            <span className="sr-only">Chỉnh sửa</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Icons.trash className="h-4 w-4" />
            <span className="sr-only">Xóa</span>
          </Button>
        </div>
      );
    }
  }
];

export default function MedicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  // Lọc dữ liệu thuốc dựa trên các bộ lọc
  const filteredMedications = medicationsData.filter((medication) => {
    const matchesSearch =
      medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medication.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      !typeFilter || typeFilter === 'all' || medication.type === typeFilter;
    const matchesStatus =
      !statusFilter ||
      statusFilter === 'all' ||
      medication.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">
            Quản lý thuốc và vật tư y tế
          </CardTitle>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/dashboard/medications/requests">
                <Icons.clipboardList className="h-4 w-4" />
                Yêu cầu thuốc
              </Link>
            </Button>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/dashboard/medications/add">
                <Icons.plus className="mr-2 h-4 w-4" />
                Thêm thuốc mới
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Bộ lọc và tìm kiếm */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên thuốc hoặc nhà sản xuất..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:max-w-[300px]"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="Thuốc hạ sốt">Thuốc hạ sốt</SelectItem>
                  <SelectItem value="Sát trùng">Sát trùng</SelectItem>
                  <SelectItem value="Vật tư y tế">Vật tư y tế</SelectItem>
                  <SelectItem value="Thuốc điều trị">Thuốc điều trị</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Còn hàng">Còn hàng</SelectItem>
                  <SelectItem value="Sắp hết">Sắp hết</SelectItem>
                  <SelectItem value="Cần nhập thêm">Cần nhập thêm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bảng dữ liệu */}
            <div className="flex flex-col gap-4 overflow-hidden bg-white">
              <DataTable
                columns={columns}
                data={filteredMedications}
                pageCount={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
