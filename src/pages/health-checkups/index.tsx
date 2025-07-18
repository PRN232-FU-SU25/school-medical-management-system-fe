import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import DataTable from '@/components/shared/data-table';

// Interface cho dữ liệu khám sức khỏe
interface HealthCheckup {
  id: number;
  studentName: string;
  studentId: string;
  class: string;
  checkupDate: string;
  type: string;
  doctor: string;
  status: string;
  result: string;
}

// Định nghĩa cột cho bảng
const columns = [
  {
    accessorKey: 'student',
    header: 'Học sinh',
    cell: ({ row }: any) => (
      <div>
        <p className="font-medium text-teal-900">{row.original.studentName}</p>
        <p className="text-sm text-gray-500">{row.original.studentId}</p>
      </div>
    )
  },
  {
    accessorKey: 'class',
    header: 'Lớp',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('class')}</div>
    )
  },
  {
    accessorKey: 'checkupDate',
    header: 'Ngày khám',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('checkupDate')}</div>
    )
  },
  {
    accessorKey: 'type',
    header: 'Loại khám',
    cell: ({ row }: any) => (
      <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
        {row.getValue('type')}
      </span>
    )
  },
  {
    accessorKey: 'doctor',
    header: 'Bác sĩ',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('doctor')}</div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }: any) => {
      const status = row.getValue('status');
      const statusConfig = {
        completed: { label: 'Đã khám', variant: 'success' },
        scheduled: { label: 'Chờ khám', variant: 'warning' },
        cancelled: { label: 'Đã hủy', variant: 'destructive' }
      } as const;
      const config =
        statusConfig[status as keyof typeof statusConfig] ||
        statusConfig.scheduled;
      return <Badge variant={config.variant}>{config.label}</Badge>;
    }
  },
  {
    accessorKey: 'result',
    header: 'Kết quả',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('result')}</div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }: any) => {
      const checkup = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            asChild
          >
            <Link to={`/dashboard/health-checkups/${checkup.id}`}>
              <Icons.eye className="h-4 w-4" />
              <span className="sr-only">Chi tiết</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            asChild
          >
            <Link to={`/dashboard/health-checkups/edit/${checkup.id}`}>
              <Icons.pencil className="h-4 w-4" />
              <span className="sr-only">Chỉnh sửa</span>
            </Link>
          </Button>
        </div>
      );
    }
  }
];

export default function HealthCheckups() {
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [checkups] = useState<HealthCheckup[]>([
    {
      id: 1,
      studentName: 'Nguyễn Văn A',
      studentId: 'HS001',
      class: '10A1',
      checkupDate: '2024-03-15',
      type: 'Định kỳ',
      doctor: 'BS. Trần Thị B',
      status: 'completed',
      result: 'Bình thường'
    },
    {
      id: 2,
      studentName: 'Trần Thị B',
      studentId: 'HS002',
      class: '11A2',
      checkupDate: '2024-03-16',
      type: 'Chuyên khoa',
      doctor: 'BS. Lê Văn C',
      status: 'scheduled',
      result: 'Chờ khám'
    },
    {
      id: 3,
      studentName: 'Phạm Văn C',
      studentId: 'HS003',
      class: '12A1',
      checkupDate: '2024-03-14',
      type: 'Cấp cứu',
      doctor: 'BS. Nguyễn Thị D',
      status: 'completed',
      result: 'Cần theo dõi'
    }
  ]);

  // Hàm lọc và tìm kiếm dữ liệu
  const filteredCheckups = checkups.filter((checkup) => {
    const matchesSearch =
      checkup.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkup.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkup.class.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || checkup.status === statusFilter;
    const matchesType = typeFilter === 'all' || checkup.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading) {
    return (
      <BasePages
        pageHead="Quản lý khám sức khỏe | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Quản lý khám sức khỏe', link: '#' }
        ]}
      >
        <Card className="border-none shadow-md">
          <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
            <Skeleton className="h-8 w-[200px]" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-10 w-[150px]" />
                <Skeleton className="h-10 w-[150px]" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </BasePages>
    );
  }

  return (
    <>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">
            Danh sách khám sức khỏe
          </CardTitle>
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <Link to="/dashboard/health-checkups/add">
              <Icons.plus className="mr-2 h-4 w-4" />
              Thêm mới
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên, mã học sinh, lớp..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 sm:max-w-[300px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="completed">Đã khám</SelectItem>
                  <SelectItem value="scheduled">Chờ khám</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Loại khám" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại khám</SelectItem>
                  <SelectItem value="Định kỳ">Định kỳ</SelectItem>
                  <SelectItem value="Chuyên khoa">Chuyên khoa</SelectItem>
                  <SelectItem value="Cấp cứu">Cấp cứu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-4 overflow-hidden bg-white">
              <DataTable
                columns={columns}
                data={filteredCheckups}
                pageCount={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
