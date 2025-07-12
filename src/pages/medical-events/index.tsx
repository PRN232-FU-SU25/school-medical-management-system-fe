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
    header: 'Học sinh'
  },
  {
    accessorKey: 'class',
    header: 'Lớp'
  },
  {
    accessorKey: 'eventType',
    header: 'Loại sự kiện'
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
      return (
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
            severity === 'Nghiêm trọng'
              ? 'bg-red-100 text-red-800'
              : severity === 'Trung bình'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
          }`}
        >
          {severity}
        </span>
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
            status === 'Đang theo dõi'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: 'handler',
    header: 'Người xử lý'
  },
  {
    id: 'actions',
    cell: ({ row }: any) => {
      const event = row.original;
      return (
        <div className="flex space-x-2">
          <Button asChild variant="ghost" size="icon">
            <Link to={`/dashboard/medical-events/${event.id}`}>
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

export default function MedicalEventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  // Lọc dữ liệu sự kiện y tế dựa trên các bộ lọc
  const filteredEvents = medicalEventsData.filter((event) => {
    const matchesSearch =
      event.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? event.status === statusFilter : true;
    const matchesSeverity = severityFilter
      ? event.severity === severityFilter
      : true;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <BasePages
      pageHead="Sự kiện y tế | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Sự kiện y tế', link: '/dashboard/medical-events' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Sự kiện y tế</h2>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/dashboard/medical-events/add">
              <Icons.plus className="mr-2 h-4 w-4" />
              Thêm sự kiện mới
            </Link>
          </Button>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên học sinh hoặc loại sự kiện..."
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
                <SelectItem value="Đã xử lý">Đã xử lý</SelectItem>
                <SelectItem value="Đang theo dõi">Đang theo dõi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mức độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả mức độ</SelectItem>
                <SelectItem value="Nhẹ">Nhẹ</SelectItem>
                <SelectItem value="Trung bình">Trung bình</SelectItem>
                <SelectItem value="Nghiêm trọng">Nghiêm trọng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bảng dữ liệu */}
        <DataTable columns={columns} data={filteredEvents} pageCount={1} />
      </div>
    </BasePages>
  );
}
