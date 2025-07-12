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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function HealthCheckups() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [checkups, setCheckups] = useState<HealthCheckup[]>([
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

  // Hàm render badge trạng thái
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: 'Đã khám', variant: 'success' },
      scheduled: { label: 'Chờ khám', variant: 'warning' },
      cancelled: { label: 'Đã hủy', variant: 'destructive' }
    } as const;

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.scheduled;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

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
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[200px]" />
          </CardHeader>
          <CardContent>
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
    <BasePages
      pageHead="Quản lý khám sức khỏe | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý khám sức khỏe', link: '#' }
      ]}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Danh sách khám sức khỏe</CardTitle>
          <Button asChild>
            <Link to="/dashboard/health-checkups/add">
              <Icons.plus className="mr-2 h-4 w-4" />
              Thêm mới
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input
                placeholder="Tìm kiếm theo tên, mã học sinh, lớp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:max-w-[300px]"
              />
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

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Học sinh</TableHead>
                    <TableHead>Lớp</TableHead>
                    <TableHead>Ngày khám</TableHead>
                    <TableHead>Loại khám</TableHead>
                    <TableHead>Bác sĩ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Kết quả</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCheckups.map((checkup) => (
                    <TableRow key={checkup.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{checkup.studentName}</p>
                          <p className="text-sm text-gray-500">
                            {checkup.studentId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{checkup.class}</TableCell>
                      <TableCell>{checkup.checkupDate}</TableCell>
                      <TableCell>{checkup.type}</TableCell>
                      <TableCell>{checkup.doctor}</TableCell>
                      <TableCell>{getStatusBadge(checkup.status)}</TableCell>
                      <TableCell>{checkup.result}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link
                              to={`/dashboard/health-checkups/${checkup.id}`}
                            >
                              <Icons.eye className="h-4 w-4" />
                              <span className="sr-only">Chi tiết</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link
                              to={`/dashboard/health-checkups/edit/${checkup.id}`}
                            >
                              <Icons.pencil className="h-4 w-4" />
                              <span className="sr-only">Chỉnh sửa</span>
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </BasePages>
  );
}
