import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BasePages from '@/components/shared/base-pages';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Interface cho dữ liệu khám sức khỏe
interface HealthCheckup {
  id: number;
  studentName: string;
  studentId: string;
  class: string;
  checkupDate: string;
  type: string;
  doctor: string;
  location: string;
  height: string;
  weight: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  vision: string;
  hearing: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  followUpDate: string;
  status: string;
  result: string;
  history: HealthCheckupHistory[];
}

interface HealthCheckupHistory {
  id: number;
  date: string;
  action: string;
  description: string;
  handler: string;
}

export default function HealthCheckupDetails() {
  const { id } = useParams();
  const [checkup, setCheckup] = useState<HealthCheckup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCheckupDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: Integrate with backend API
        // const response = await api.get(`/health-checkups/${id}`);
        // setCheckup(response.data);

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCheckup({
          id: 1,
          studentName: 'Nguyễn Văn A',
          studentId: 'HS001',
          class: '10A1',
          checkupDate: '2024-03-15',
          type: 'Định kỳ',
          doctor: 'BS. Trần Thị B',
          location: 'Phòng y tế trường',
          height: '170',
          weight: '60',
          bloodPressure: '120/80',
          heartRate: '80',
          temperature: '36.5',
          vision: '20/20',
          hearing: 'Bình thường',
          diagnosis: 'Khỏe mạnh',
          treatment: 'Không cần điều trị',
          notes: 'Sức khỏe tốt',
          followUpDate: '2024-09-15',
          status: 'completed',
          result: 'Bình thường',
          history: [
            {
              id: 1,
              date: '2024-03-14',
              action: 'Đăng ký khám',
              description: 'Đăng ký khám sức khỏe định kỳ',
              handler: 'Nguyễn Văn X'
            },
            {
              id: 2,
              date: '2024-03-15',
              action: 'Khám sức khỏe',
              description: 'Thực hiện khám sức khỏe định kỳ',
              handler: 'BS. Trần Thị B'
            },
            {
              id: 3,
              date: '2024-03-15',
              action: 'Hoàn thành',
              description: 'Hoàn thành khám sức khỏe',
              handler: 'BS. Trần Thị B'
            }
          ]
        });
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCheckupDetails();
  }, [id]);

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
        pageHead="Chi tiết khám sức khỏe | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          {
            title: 'Quản lý khám sức khỏe',
            link: '/dashboard/health-checkups'
          },
          { title: 'Chi tiết', link: '#' }
        ]}
      >
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-[200px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </BasePages>
    );
  }

  if (error) {
    return (
      <BasePages
        pageHead="Chi tiết khám sức khỏe | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          {
            title: 'Quản lý khám sức khỏe',
            link: '/dashboard/health-checkups'
          },
          { title: 'Chi tiết', link: '#' }
        ]}
      >
        <Alert variant="destructive">
          <Icons.alertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </BasePages>
    );
  }

  if (!checkup) {
    return (
      <BasePages
        pageHead="Chi tiết khám sức khỏe | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          {
            title: 'Quản lý khám sức khỏe',
            link: '/dashboard/health-checkups'
          },
          { title: 'Chi tiết', link: '#' }
        ]}
      >
        <Alert>
          <Icons.info className="h-4 w-4" />
          <AlertTitle>Không tìm thấy</AlertTitle>
          <AlertDescription>
            Không tìm thấy thông tin khám sức khỏe.
          </AlertDescription>
        </Alert>
      </BasePages>
    );
  }

  return (
    <BasePages
      pageHead="Chi tiết khám sức khỏe | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý khám sức khỏe', link: '/dashboard/health-checkups' },
        { title: 'Chi tiết', link: '#' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Chi tiết khám sức khỏe</h2>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/dashboard/health-checkups/edit/${id}`}>
                <Icons.pencil className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard/health-checkups">
                <Icons.arrowLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Thông tin khám sức khỏe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Tên học sinh
                    </p>
                    <p>{checkup.studentName}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Mã học sinh
                    </p>
                    <p>{checkup.studentId}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Lớp</p>
                    <p>{checkup.class}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Ngày khám
                    </p>
                    <p>{checkup.checkupDate}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Loại khám
                    </p>
                    <p>{checkup.type}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Bác sĩ</p>
                    <p>{checkup.doctor}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Địa điểm khám
                    </p>
                    <p>{checkup.location}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Ngày tái khám
                    </p>
                    <p>{checkup.followUpDate || 'Không có'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trạng thái</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Trạng thái khám
                  </p>
                  <p className="mt-1">{getStatusBadge(checkup.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Kết quả tổng quát
                  </p>
                  <p className="mt-1">{checkup.result}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Chỉ số sức khỏe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Chiều cao</p>
                  <p className="mt-1">{checkup.height} cm</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Cân nặng</p>
                  <p className="mt-1">{checkup.weight} kg</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Huyết áp</p>
                  <p className="mt-1">{checkup.bloodPressure} mmHg</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Nhịp tim</p>
                  <p className="mt-1">{checkup.heartRate} nhịp/phút</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Nhiệt độ</p>
                  <p className="mt-1">{checkup.temperature}°C</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Thị lực</p>
                  <p className="mt-1">{checkup.vision}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Thính lực</p>
                  <p className="mt-1">{checkup.hearing}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chẩn đoán và điều trị</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Chẩn đoán</p>
                  <p className="mt-1">{checkup.diagnosis}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phương pháp điều trị
                  </p>
                  <p className="mt-1">{checkup.treatment}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ghi chú</p>
                  <p className="mt-1">{checkup.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lịch sử khám</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Hành động</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Người thực hiện</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkup.history.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.action}</TableCell>
                    <TableCell>{record.description}</TableCell>
                    <TableCell>{record.handler}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </BasePages>
  );
}
