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

// Dữ liệu mẫu cho danh sách sự kiện y tế
const medicalEventsData = [
  {
    id: 1,
    studentName: 'Nguyễn Văn A',
    class: '10A1',
    eventType: 'Sốt',
    date: '15/06/2023',
    time: '09:30',
    location: 'Phòng học 101',
    severity: 'Trung bình',
    status: 'Đã xử lý',
    handler: 'BS. Trần Thị B'
  },
  {
    id: 2,
    studentName: 'Trần Thị C',
    class: '11A2',
    eventType: 'Té ngã',
    date: '15/06/2023',
    time: '10:15',
    location: 'Sân trường',
    severity: 'Nhẹ',
    status: 'Đã xử lý',
    handler: 'BS. Lê Văn D'
  },
  {
    id: 3,
    studentName: 'Lê Văn E',
    class: '12B1',
    eventType: 'Dị ứng',
    date: '14/06/2023',
    time: '14:20',
    location: 'Căn tin',
    severity: 'Nghiêm trọng',
    status: 'Đang theo dõi',
    handler: 'BS. Trần Thị B'
  },
  {
    id: 4,
    studentName: 'Phạm Thị G',
    class: '10A3',
    eventType: 'Đau đầu',
    date: '14/06/2023',
    time: '11:45',
    location: 'Phòng y tế',
    severity: 'Nhẹ',
    status: 'Đã xử lý',
    handler: 'BS. Lê Văn D'
  }
];

// Định nghĩa cột cho bảng
const columns = [
  {
    accessorKey: 'studentName',
    header: 'Học sinh',
    cell: ({ row }: any) => (
      <div className="font-medium text-teal-900">
        {row.getValue('studentName')}
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
    accessorKey: 'eventType',
    header: 'Loại sự kiện',
    cell: ({ row }: any) => (
      <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
        {row.getValue('eventType')}
      </span>
    )
  },
  {
    accessorKey: 'date',
    header: 'Ngày'
  },
  {
    accessorKey: 'time',
    header: 'Thời gian'
  },
  {
    accessorKey: 'severity',
    header: 'Mức độ',
    cell: ({ row }: any) => {
      const severity = row.getValue('severity');
      const severityConfig = {
        'Nghiêm trọng': { variant: 'destructive' },
        'Trung bình': { variant: 'warning' },
        Nhẹ: { variant: 'success' }
      } as const;
      const config = severityConfig[severity as keyof typeof severityConfig];
      return <Badge variant={config.variant}>{severity}</Badge>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }: any) => {
      const status = row.getValue('status');
      const statusConfig = {
        'Đã xử lý': { variant: 'success' },
        'Đang theo dõi': { variant: 'warning' }
      } as const;
      const config = statusConfig[status as keyof typeof statusConfig];
      return <Badge variant={config.variant}>{status}</Badge>;
    }
  },
  {
    accessorKey: 'handler',
    header: 'Người xử lý',
    cell: ({ row }: any) => (
      <div className="text-gray-600">{row.getValue('handler')}</div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }: any) => {
      const event = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            asChild
          >
            <Link to={`/dashboard/medical-events/${event.id}`}>
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

export default function MedicalEventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [severityFilter, setSeverityFilter] = useState<string | undefined>(
    undefined
  );

  // Lọc dữ liệu sự kiện y tế dựa trên các bộ lọc
  const filteredEvents = medicalEventsData.filter((event) => {
    const matchesSearch =
      event.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      !statusFilter || statusFilter === 'all' || event.status === statusFilter;
    const matchesSeverity =
      !severityFilter ||
      severityFilter === 'all' ||
      event.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">Sự kiện y tế</CardTitle>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/dashboard/medical-events/reports">
                <Icons.fileBarChart className="h-4 w-4" />
                Báo cáo
              </Link>
            </Button>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/dashboard/medical-events/add">
                <Icons.plus className="mr-2 h-4 w-4" />
                Thêm sự kiện mới
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
                  placeholder="Tìm kiếm theo tên học sinh hoặc loại sự kiện..."
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
                  <SelectItem value="Đã xử lý">Đã xử lý</SelectItem>
                  <SelectItem value="Đang theo dõi">Đang theo dõi</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Mức độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả mức độ</SelectItem>
                  <SelectItem value="Nhẹ">Nhẹ</SelectItem>
                  <SelectItem value="Trung bình">Trung bình</SelectItem>
                  <SelectItem value="Nghiêm trọng">Nghiêm trọng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bảng dữ liệu */}
            <div className="flex flex-col gap-4 overflow-hidden bg-white">
              <DataTable
                columns={columns}
                data={filteredEvents}
                pageCount={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
