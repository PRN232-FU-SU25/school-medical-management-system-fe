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

// Dữ liệu mẫu cho danh sách học sinh
const studentsData = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    class: '10A1',
    dateOfBirth: '15/05/2008',
    gender: 'Nam',
    allergies: 'Hải sản',
    chronicDiseases: 'Không',
    status: 'Bình thường'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    class: '10A2',
    dateOfBirth: '22/08/2008',
    gender: 'Nữ',
    allergies: 'Không',
    chronicDiseases: 'Hen suyễn',
    status: 'Cần theo dõi'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    class: '11B1',
    dateOfBirth: '10/03/2007',
    gender: 'Nam',
    allergies: 'Không',
    chronicDiseases: 'Không',
    status: 'Bình thường'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    class: '11B2',
    dateOfBirth: '05/11/2007',
    gender: 'Nữ',
    allergies: 'Phấn hoa',
    chronicDiseases: 'Không',
    status: 'Bình thường'
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    class: '12C1',
    dateOfBirth: '18/12/2006',
    gender: 'Nam',
    allergies: 'Không',
    chronicDiseases: 'Tiểu đường',
    status: 'Cần theo dõi'
  }
];

// Định nghĩa cột cho bảng
const columns = [
  {
    accessorKey: 'name',
    header: 'Họ tên'
  },
  {
    accessorKey: 'class',
    header: 'Lớp'
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Ngày sinh'
  },
  {
    accessorKey: 'gender',
    header: 'Giới tính'
  },
  {
    accessorKey: 'allergies',
    header: 'Dị ứng'
  },
  {
    accessorKey: 'chronicDiseases',
    header: 'Bệnh mãn tính'
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }: any) => {
      const status = row.getValue('status');
      return (
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
            status === 'Cần theo dõi'
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
      const student = row.original;
      return (
        <div className="flex space-x-2">
          <Button asChild variant="ghost" size="icon">
            <Link to={`/dashboard/student-records/${student.id}`}>
              <Icons.eye className="h-4 w-4" />
              <span className="sr-only">Xem chi tiết</span>
            </Link>
          </Button>
        </div>
      );
    }
  }
];

export default function StudentRecordsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Lọc dữ liệu học sinh dựa trên các bộ lọc
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesClass = classFilter ? student.class === classFilter : true;
    const matchesStatus = statusFilter ? student.status === statusFilter : true;
    return matchesSearch && matchesClass && matchesStatus;
  });

  // Danh sách lớp học duy nhất
  const uniqueClasses = Array.from(
    new Set(studentsData.map((student) => student.class))
  );

  // Danh sách trạng thái duy nhất
  const uniqueStatuses = Array.from(
    new Set(studentsData.map((student) => student.status))
  );

  return (
    <BasePages
      pageHead="Hồ sơ sức khỏe học sinh | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Hồ sơ sức khỏe học sinh', link: '/dashboard/student-records' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Hồ sơ sức khỏe học sinh</h2>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/dashboard/student-records/add">
              <Icons.plus className="mr-2 h-4 w-4" />
              Thêm hồ sơ mới
            </Link>
          </Button>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên học sinh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc theo lớp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả lớp</SelectItem>
                {uniqueClasses.map((className) => (
                  <SelectItem key={className} value={className}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả trạng thái</SelectItem>
                {uniqueStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bảng dữ liệu */}
        <DataTable columns={columns} data={filteredStudents} pageCount={1} />
      </div>
    </BasePages>
  );
}
