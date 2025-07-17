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
import * as XLSX from 'xlsx';
import { RootState } from '@/redux/store';
import __helpers from '@/helpers';
import { useSelector } from 'react-redux';

interface HealthRecord {
  healthRecordId: number;
  studentId: number;
  allergies: string;
  chronicDiseases: string;
  pastTreatments: string;
  vision: string;
  hearing: string;
  vaccinations: string;
  createdAt: string;
  updatedAt: string;
  student: {
    studentId: number;
    fullName: string;
    dob: string;
    gender: string;
    className: string;
    parentId: number;
  };
}

const columns = [
  {
    accessorKey: 'student.fullName',
    header: 'Họ tên',
    cell: ({ row }: { row: { original: HealthRecord } }) => (
      <div className="font-medium text-teal-900">
        {row.original.student.fullName}
      </div>
    )
  },
  {
    accessorKey: 'student.className',
    header: 'Lớp',
    cell: ({ row }: { row: { original: HealthRecord } }) => (
      <div className="text-gray-600">{row.original.student.className}</div>
    )
  },
  {
    accessorKey: 'student.dob',
    header: 'Ngày sinh',
    cell: ({ row }: { row: { original: HealthRecord } }) => (
      <div className="text-gray-600">
        {row.original.student.dob.split('T')[0]}
      </div>
    )
  },
  {
    accessorKey: 'student.gender',
    header: 'Giới tính',
    cell: ({ row }: { row: { original: HealthRecord } }) => (
      <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
        {row.original.student.gender}
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
    accessorKey: 'pastTreatments',
    header: 'Tiền sử điều trị',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const treatments = row.getValue('pastTreatments');
      return treatments === 'Không' ? (
        <div className="text-gray-600">Không</div>
      ) : (
        <Badge variant="warning">{treatments}</Badge>
      );
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
            <Link to={`/dashboard/student-records/${student.healthRecordId}`}>
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
  const [searchParams] = useSearchParams();
  const role = __helpers.cookie_get('R');
  const auth = useSelector((state: RootState) => state.auth);

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
    (healthRecordsData?.items as HealthRecord[]) || []
  ).filter((student) => {
    const matchesSearch = student?.student?.fullName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesClass =
      !classFilter ||
      classFilter === 'all' ||
      student.student?.className === classFilter;

    if (role === 'Parent') {
      return (
        matchesSearch &&
        matchesClass &&
        student.student?.parentId === auth.userInfo.accountId
      );
    }
    return matchesSearch && matchesClass;
  });

  // Danh sách lớp học duy nhất
  const uniqueClasses = Array.from(
    new Set(
      ((healthRecordsData?.items as HealthRecord[]) || []).map(
        (student) => student.student?.className
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
              onClick={() => {
                // Prepare data for Excel
                const excelData = filteredStudents.map((record) => ({
                  'Họ tên': record.student.fullName,
                  Lớp: record.student.className,
                  'Ngày sinh': record.student.dob.split('T')[0],
                  'Giới tính': record.student.gender,
                  'Dị ứng': record.allergies,
                  'Bệnh mãn tính': record.chronicDiseases,
                  'Tiền sử điều trị': record.pastTreatments,
                  'Thị lực': record.vision,
                  'Thính lực': record.hearing,
                  'Tiêm chủng': record.vaccinations,
                  'Ngày tạo': record.createdAt.split('T')[0],
                  'Ngày cập nhật': record.updatedAt
                    ? record.updatedAt.split('T')[0]
                    : ''
                }));

                // Create workbook and worksheet
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(excelData);

                // Set column widths
                const columnWidths = [
                  { wch: 25 }, // Họ tên
                  { wch: 10 }, // Lớp
                  { wch: 12 }, // Ngày sinh
                  { wch: 10 }, // Giới tính
                  { wch: 20 }, // Dị ứng
                  { wch: 20 }, // Bệnh mãn tính
                  { wch: 20 }, // Tiền sử điều trị
                  { wch: 15 }, // Thị lực
                  { wch: 15 }, // Thính lực
                  { wch: 20 }, // Tiêm chủng
                  { wch: 12 }, // Ngày tạo
                  { wch: 12 } // Ngày cập nhật
                ];
                ws['!cols'] = columnWidths;

                // Add the worksheet to the workbook
                XLSX.utils.book_append_sheet(wb, ws, 'Hồ sơ sức khỏe');

                // Generate Excel file
                XLSX.writeFile(
                  wb,
                  `ho-so-suc-khoe-${new Date().toISOString().split('T')[0]}.xlsx`
                );
              }}
            >
              <Icons.download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/dashboard/student-records/add">
                <Icons.plus className="mr-2 h-4 w-4" />
                Thêm hồ sơ mới
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
                  {uniqueClasses.map((className, index) => (
                    <SelectItem key={index} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bảng dữ liệu */}
            <DataTable
              columns={columns}
              data={filteredStudents}
              pageCount={Math.ceil(
                (healthRecordsData?.totalRecords || 0) / pageSize
              )}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
