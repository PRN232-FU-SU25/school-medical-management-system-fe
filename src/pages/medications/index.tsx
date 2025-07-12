import BasePages from '@/components/shared/base-pages';
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
    header: 'Tên thuốc/vật tư'
  },
  {
    accessorKey: 'type',
    header: 'Loại'
  },
  {
    accessorKey: 'dosage',
    header: 'Hàm lượng'
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng',
    cell: ({ row }: any) => {
      const quantity = row.getValue('quantity');
      const unit = row.original.unit;
      return `${quantity} ${unit}`;
    }
  },
  {
    accessorKey: 'expiryDate',
    header: 'Hạn sử dụng'
  },
  {
    accessorKey: 'manufacturer',
    header: 'Nhà sản xuất'
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }: any) => {
      const status = row.getValue('status');
      return (
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
            status === 'Còn hàng'
              ? 'bg-green-100 text-green-800'
              : status === 'Sắp hết'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }: any) => {
      const medication = row.original;
      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Icons.pencil className="h-4 w-4" />
            <span className="sr-only">Chỉnh sửa</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700"
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
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Lọc dữ liệu thuốc dựa trên các bộ lọc
  const filteredMedications = medicationsData.filter((medication) => {
    const matchesSearch =
      medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medication.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? medication.type === typeFilter : true;
    const matchesStatus = statusFilter
      ? medication.status === statusFilter
      : true;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <BasePages
      pageHead="Quản lý thuốc | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý thuốc', link: '/dashboard/medications' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Quản lý thuốc và vật tư y tế</h2>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/dashboard/medications/requests">
                <Icons.clipboardList className="h-4 w-4" />
                Yêu cầu thuốc
              </Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/dashboard/medications/add">
                <Icons.plus className="mr-2 h-4 w-4" />
                Thêm thuốc mới
              </Link>
            </Button>
          </div>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên thuốc hoặc nhà sản xuất..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả loại</SelectItem>
                <SelectItem value="Thuốc hạ sốt">Thuốc hạ sốt</SelectItem>
                <SelectItem value="Sát trùng">Sát trùng</SelectItem>
                <SelectItem value="Vật tư y tế">Vật tư y tế</SelectItem>
                <SelectItem value="Thuốc điều trị">Thuốc điều trị</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả trạng thái</SelectItem>
                <SelectItem value="Còn hàng">Còn hàng</SelectItem>
                <SelectItem value="Sắp hết">Sắp hết</SelectItem>
                <SelectItem value="Cần nhập thêm">Cần nhập thêm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bảng dữ liệu */}
        <DataTable columns={columns} data={filteredMedications} pageCount={1} />
      </div>
    </BasePages>
  );
}
