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

// Dữ liệu mẫu cho danh sách tiêm chủng
const vaccinationsData = [
  {
    id: 1,
    campaignName: 'Tiêm chủng HPV - Đợt 1',
    vaccineType: 'HPV',
    targetGroup: 'Nữ sinh khối 10, 11',
    startDate: '20/06/2023',
    endDate: '25/06/2023',
    totalStudents: 150,
    completedCount: 120,
    status: 'Đang diễn ra'
  },
  {
    id: 2,
    campaignName: 'Tiêm vắc xin cúm mùa',
    vaccineType: 'Influenza',
    targetGroup: 'Toàn trường',
    startDate: '15/07/2023',
    endDate: '20/07/2023',
    totalStudents: 500,
    completedCount: 0,
    status: 'Sắp diễn ra'
  },
  {
    id: 3,
    campaignName: 'Tiêm nhắc COVID-19',
    vaccineType: 'COVID-19',
    targetGroup: 'Học sinh chưa tiêm mũi nhắc',
    startDate: '10/05/2023',
    endDate: '15/05/2023',
    totalStudents: 200,
    completedCount: 180,
    status: 'Đã hoàn thành'
  },
  {
    id: 4,
    campaignName: 'Tiêm phòng viêm não Nhật Bản',
    vaccineType: 'JE',
    targetGroup: 'Khối 12',
    startDate: '01/06/2023',
    endDate: '05/06/2023',
    totalStudents: 120,
    completedCount: 100,
    status: 'Đã hoàn thành'
  }
];

// Định nghĩa cột cho bảng
const columns = [
  {
    accessorKey: 'campaignName',
    header: 'Tên chiến dịch',
    cell: ({ row }: any) => (
      <div className="font-medium text-teal-900">
        {row.getValue('campaignName')}
      </div>
    )
  },
  {
    accessorKey: 'vaccineType',
    header: 'Loại vắc xin',
    cell: ({ row }: any) => (
      <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
        {row.getValue('vaccineType')}
      </span>
    )
  },
  {
    accessorKey: 'targetGroup',
    header: 'Đối tượng',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('targetGroup')}</div>
    )
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày bắt đầu',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('startDate')}</div>
    )
  },
  {
    accessorKey: 'endDate',
    header: 'Ngày kết thúc',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('endDate')}</div>
    )
  },
  {
    accessorKey: 'progress',
    header: 'Tiến độ',
    cell: ({ row }: any) => {
      const completed = row.original.completedCount;
      const total = row.original.totalStudents;
      const percentage = Math.round((completed / total) * 100);
      return (
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-teal-600"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">{percentage}%</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }: any) => {
      const status = row.getValue('status');
      const statusConfig = {
        'Đang diễn ra': { variant: 'warning' },
        'Sắp diễn ra': { variant: 'default' },
        'Đã hoàn thành': { variant: 'success' }
      } as const;
      const config = statusConfig[status as keyof typeof statusConfig];
      return <Badge variant={config.variant}>{status}</Badge>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }: any) => {
      const vaccination = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            asChild
          >
            <Link to={`/dashboard/vaccinations/${vaccination.id}`}>
              <Icons.eye className="h-4 w-4" />
              <span className="sr-only">Xem chi tiết</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
          >
            <Icons.pencil className="h-4 w-4" />
            <span className="sr-only">Chỉnh sửa</span>
          </Button>
        </div>
      );
    }
  }
];

export default function VaccinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  // Lọc dữ liệu tiêm chủng dựa trên các bộ lọc
  const filteredVaccinations = vaccinationsData.filter((vaccination) => {
    const matchesSearch =
      vaccination.campaignName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      vaccination.vaccineType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      !statusFilter ||
      statusFilter === 'all' ||
      vaccination.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">Quản lý tiêm chủng</CardTitle>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/dashboard/vaccinations/reports">
                <Icons.fileBarChart className="h-4 w-4" />
                Báo cáo
              </Link>
            </Button>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/dashboard/vaccinations/campaign">
                <Icons.plus className="mr-2 h-4 w-4" />
                Tạo chiến dịch mới
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
                  placeholder="Tìm kiếm theo tên chiến dịch hoặc loại vắc xin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:max-w-[300px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Sắp diễn ra">Sắp diễn ra</SelectItem>
                  <SelectItem value="Đang diễn ra">Đang diễn ra</SelectItem>
                  <SelectItem value="Đã hoàn thành">Đã hoàn thành</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bảng dữ liệu */}
            <div className="flex flex-col gap-4 overflow-hidden bg-white">
              <DataTable
                columns={columns}
                data={filteredVaccinations}
                pageCount={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
