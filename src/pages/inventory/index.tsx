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
import DataTable from '@/components/shared/data-table';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Dữ liệu mẫu cho kho vật tư y tế
const inventoryData = [
  {
    id: 1,
    name: 'Khẩu trang y tế',
    category: 'Vật tư tiêu hao',
    unit: 'Hộp',
    quantity: 50,
    minQuantity: 20,
    location: 'Tủ A1',
    lastUpdated: '15/06/2023',
    status: 'Còn hàng'
  },
  {
    id: 2,
    name: 'Nhiệt kế điện tử',
    category: 'Thiết bị y tế',
    unit: 'Cái',
    quantity: 5,
    minQuantity: 3,
    location: 'Tủ B2',
    lastUpdated: '10/06/2023',
    status: 'Sắp hết'
  },
  {
    id: 3,
    name: 'Bông gạc vô trùng',
    category: 'Vật tư tiêu hao',
    unit: 'Gói',
    quantity: 100,
    minQuantity: 30,
    location: 'Tủ A2',
    lastUpdated: '12/06/2023',
    status: 'Còn hàng'
  },
  {
    id: 4,
    name: 'Máy đo huyết áp',
    category: 'Thiết bị y tế',
    unit: 'Cái',
    quantity: 2,
    minQuantity: 2,
    location: 'Tủ B1',
    lastUpdated: '01/06/2023',
    status: 'Cần bổ sung'
  }
];

// Thống kê tổng quan
const inventoryStats = [
  {
    title: 'Tổng số vật tư',
    value: '157',
    icon: <Icons.package className="h-5 w-5 text-blue-600" />
  },
  {
    title: 'Cần bổ sung',
    value: '3',
    icon: <Icons.alertTriangle className="h-5 w-5 text-yellow-600" />
  },
  {
    title: 'Sắp hết hạn',
    value: '5',
    icon: <Icons.calendar className="h-5 w-5 text-red-600" />
  },
  {
    title: 'Cập nhật gần đây',
    value: '12',
    icon: <Icons.activity className="h-5 w-5 text-green-600" />
  }
];

// Định nghĩa cột cho bảng
const columns = [
  {
    accessorKey: 'name',
    header: 'Tên vật tư'
  },
  {
    accessorKey: 'category',
    header: 'Phân loại'
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
    accessorKey: 'minQuantity',
    header: 'Tồn tối thiểu',
    cell: ({ row }: any) => {
      const minQuantity = row.getValue('minQuantity');
      const unit = row.original.unit;
      return `${minQuantity} ${unit}`;
    }
  },
  {
    accessorKey: 'location',
    header: 'Vị trí'
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Cập nhật'
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

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Lọc dữ liệu vật tư dựa trên các bộ lọc
  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <BasePages
      pageHead="Kho vật tư y tế | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Kho vật tư y tế', link: '/dashboard/inventory' }
      ]}
    >
      <div className="space-y-6">
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {inventoryStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Danh sách vật tư y tế</h2>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Icons.download className="h-4 w-4" />
              Xuất báo cáo
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Icons.plus className="h-4 w-4" />
              Thêm vật tư mới
            </Button>
          </div>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên vật tư hoặc vị trí..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Phân loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả loại</SelectItem>
                <SelectItem value="Vật tư tiêu hao">Vật tư tiêu hao</SelectItem>
                <SelectItem value="Thiết bị y tế">Thiết bị y tế</SelectItem>
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
                <SelectItem value="Cần bổ sung">Cần bổ sung</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bảng dữ liệu */}
        <DataTable columns={columns} data={filteredInventory} pageCount={1} />
      </div>
    </BasePages>
  );
}
