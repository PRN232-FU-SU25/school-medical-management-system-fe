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
import { Badge } from '@/components/ui/badge';

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
    icon: <Icons.shieldAlert className="h-5 w-5 text-yellow-600" />
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
    header: 'Tên vật tư',
    cell: ({ row }: any) => (
      <div className="font-medium text-teal-900">{row.getValue('name')}</div>
    )
  },
  {
    accessorKey: 'category',
    header: 'Phân loại',
    cell: ({ row }: any) => (
      <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
        {row.getValue('category')}
      </span>
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
    accessorKey: 'minQuantity',
    header: 'Tồn tối thiểu',
    cell: ({ row }: any) => {
      const minQuantity = row.getValue('minQuantity');
      const unit = row.original.unit;
      return (
        <div className="text-gray-600">
          {minQuantity} {unit}
        </div>
      );
    }
  },
  {
    accessorKey: 'location',
    header: 'Vị trí',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('location')}</div>
    )
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Cập nhật',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('lastUpdated')}</div>
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
        'Cần bổ sung': { variant: 'destructive' }
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

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    undefined
  );
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  // Lọc dữ liệu vật tư dựa trên các bộ lọc
  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !categoryFilter ||
      categoryFilter === 'all' ||
      item.category === categoryFilter;
    const matchesStatus =
      !statusFilter || statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {inventoryStats.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-teal-900">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-900">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">Danh sách vật tư y tế</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Icons.download className="h-4 w-4" />
              Xuất báo cáo
            </Button>
            <Button className="gap-2 bg-teal-600 hover:bg-teal-700">
              <Icons.plus className="h-4 w-4" />
              Thêm vật tư mới
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
                  placeholder="Tìm kiếm theo tên vật tư hoặc vị trí..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:max-w-[300px]"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Phân loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="Vật tư tiêu hao">
                    Vật tư tiêu hao
                  </SelectItem>
                  <SelectItem value="Thiết bị y tế">Thiết bị y tế</SelectItem>
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
                  <SelectItem value="Cần bổ sung">Cần bổ sung</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bảng dữ liệu */}
            <div className="flex flex-col gap-4 overflow-hidden bg-white">
              <DataTable
                columns={columns}
                data={filteredInventory}
                pageCount={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
