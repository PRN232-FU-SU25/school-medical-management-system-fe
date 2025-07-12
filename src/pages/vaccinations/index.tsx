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
    header: 'Tên chiến dịch'
  },
  {
    accessorKey: 'vaccineType',
    header: 'Loại vắc xin'
  },
  {
    accessorKey: 'targetGroup',
    header: 'Đối tượng'
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày bắt đầu'
  },
  {
    accessorKey: 'endDate',
    header: 'Ngày kết thúc'
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
              className="h-full rounded-full bg-blue-600"
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
      return (
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
            status === 'Đang diễn ra'
              ? 'bg-blue-100 text-blue-800'
              : status === 'Sắp diễn ra'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
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
      const vaccination = row.original;
      return (
        <div className="flex space-x-2">
          <Button asChild variant="ghost" size="icon">
            <Link to={`/dashboard/vaccinations/${vaccination.id}`}>
              <Icons.eye className="h-4 w-4" />
              <span className="sr-only">Xem chi tiết</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
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
  const [statusFilter, setStatusFilter] = useState('');

  // Lọc dữ liệu tiêm chủng dựa trên các bộ lọc
  const filteredVaccinations = vaccinationsData.filter((vaccination) => {
    const matchesSearch =
      vaccination.campaignName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      vaccination.vaccineType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter
      ? vaccination.status === statusFilter
      : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <BasePages
      pageHead="Quản lý tiêm chủng | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý tiêm chủng', link: '/dashboard/vaccinations' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Quản lý tiêm chủng</h2>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/dashboard/vaccinations/reports">
                <Icons.fileBarChart className="h-4 w-4" />
                Báo cáo
              </Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/dashboard/vaccinations/campaign">
                <Icons.plus className="mr-2 h-4 w-4" />
                Tạo chiến dịch mới
              </Link>
            </Button>
          </div>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên chiến dịch hoặc loại vắc xin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả trạng thái</SelectItem>
                <SelectItem value="Sắp diễn ra">Sắp diễn ra</SelectItem>
                <SelectItem value="Đang diễn ra">Đang diễn ra</SelectItem>
                <SelectItem value="Đã hoàn thành">Đã hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bảng dữ liệu */}
        <DataTable
          columns={columns}
          data={filteredVaccinations}
          pageCount={1}
        />
      </div>
    </BasePages>
  );
}
