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
import { Link, useSearchParams } from 'react-router-dom';
import DataTable from '@/components/shared/data-table';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetHealthRecords } from '@/queries/health-records.query';
import { Skeleton } from '@/components/ui/skeleton';

interface HealthRecord {
  id: number;
  studentName: string;
  class: string;
  dateOfBirth: string;
  gender: string;
  allergies: string;
  chronicDiseases: string;
  status: string;
}

// Định nghĩa cột cho bảng
const columns = [
  {
    accessorKey: 'studentName',
    header: 'Họ tên',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
      <div className="font-medium text-teal-900">
        {row.getValue('studentName')}
      </div>
    )
  },
  {
    accessorKey: 'class',
    header: 'Lớp',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
      <div className="text-gray-600">{row.getValue('class')}</div>
    )
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Ngày sinh',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
      <div className="text-gray-600">{row.getValue('dateOfBirth')}</div>
    )
  },
  {
    accessorKey: 'gender',
    header: 'Giới tính',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
      <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
        {row.getValue('gender')}
      </span>
    )
  },
  {
    accessorKey: 'allergies',
    header: 'Dị ứng',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const allergies = row.getValue('allergies');
      return allergies === 'Không' ? (
        <div className="text-gray-600">Không</div>
      ) : (
        <Badge variant="destructive">{allergies}</Badge>
      );
    }
  },
  {
    accessorKey: 'chronicDiseases',
    header: 'Bệnh mãn tính',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const diseases = row.getValue('chronicDiseases');
      return diseases === 'Không' ? (
        <div className="text-gray-600">Không</div>
      ) : (
        <Badge variant="destructive">{diseases}</Badge>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const status = row.getValue('status');
      const statusConfig = {
        'Bình thường': { variant: 'success' as const },
        'Cần theo dõi': { variant: 'warning' as const }
      };
      const config = statusConfig[status as keyof typeof statusConfig];
      return <Badge variant={config.variant}>{status}</Badge>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }: { row: { original: HealthRecord } }) => {
      const student = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            asChild
          >
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
  const [classFilter, setClassFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [searchParams] = useSearchParams();

  // Get page and limit from URL
  const page = searchParams?.get('page') ?? '1';
  const limit = searchParams?.get('limit') ?? '10';
  const pageNumber = Number(page);
  const pageSize = Number(limit);

  const { data: healthRecordsData, isLoading } = useGetHealthRecords(
    pageNumber,
    pageSize
  );

  // Lọc dữ liệu học sinh dựa trên các bộ lọc
  const filteredStudents = (
    (healthRecordsData?.data?.items as HealthRecord[]) || []
  ).filter((student) => {
    const matchesSearch = student.studentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesClass =
      !classFilter || classFilter === 'all' || student.class === classFilter;
    const matchesStatus =
      !statusFilter ||
      statusFilter === 'all' ||
      student.status === statusFilter;
    return matchesSearch && matchesClass && matchesStatus;
  });

  // Danh sách lớp học duy nhất
  const uniqueClasses = Array.from(
    new Set(
      ((healthRecordsData?.data?.items as HealthRecord[]) || []).map(
        (student) => student.class
      )
    )
  );

  // Danh sách trạng thái duy nhất
  const uniqueStatuses = Array.from(
    new Set(
      ((healthRecordsData?.data?.items as HealthRecord[]) || []).map(
        (student) => student.status
      )
    )
  );

  if (isLoading) {
    return (
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
    );
  }

  return (
    <>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">
            Hồ sơ sức khỏe học sinh
          </CardTitle>
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <Link to="/dashboard/student-records/add">
              <Icons.plus className="mr-2 h-4 w-4" />
              Thêm hồ sơ mới
            </Link>
          </Button>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Bộ lọc và tìm kiếm */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên học sinh..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:max-w-[300px]"
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Lọc theo lớp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả lớp</SelectItem>
                  {uniqueClasses.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bảng dữ liệu */}
            <div className="flex flex-col gap-4 overflow-hidden bg-white">
              <DataTable
                columns={columns}
                data={filteredStudents}
                pageCount={healthRecordsData?.data?.totalPages || 1}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
