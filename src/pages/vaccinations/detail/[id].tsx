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

// Interface cho dữ liệu tiêm chủng
interface Vaccination {
  id: number;
  studentName: string;
  studentId: string;
  class: string;
  vaccineName: string;
  vaccineType: string;
  manufacturer: string;
  batchNumber: string;
  dosageNumber: string;
  vaccinationDate: string;
  nextDueDate: string;
  location: string;
  provider: string;
  notes: string;
  status: string;
  parentConsent: string;
  sideEffects: string;
  history: VaccinationHistory[];
}

interface VaccinationHistory {
  id: number;
  date: string;
  action: string;
  description: string;
  handler: string;
}

export default function VaccinationDetails() {
  const { id } = useParams();
  const [vaccination, setVaccination] = useState<Vaccination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVaccinationDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: Integrate with backend API
        // const response = await api.get(`/vaccinations/${id}`);
        // setVaccination(response.data);

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setVaccination({
          id: 1,
          studentName: 'Nguyễn Văn A',
          studentId: 'HS001',
          class: '10A1',
          vaccineName: 'Vaccine COVID-19',
          vaccineType: 'COVID-19',
          manufacturer: 'Pfizer',
          batchNumber: 'PFZ123',
          dosageNumber: '1',
          vaccinationDate: '2024-03-15',
          nextDueDate: '2024-06-15',
          location: 'Phòng y tế trường',
          provider: 'BS. Trần Thị B',
          notes: 'Tiêm mũi 1 vaccine COVID-19',
          status: 'completed',
          parentConsent: 'approved',
          sideEffects: 'Không có',
          history: [
            {
              id: 1,
              date: '2024-03-10',
              action: 'Đăng ký',
              description: 'Đăng ký tiêm chủng',
              handler: 'Nguyễn Văn X'
            },
            {
              id: 2,
              date: '2024-03-12',
              action: 'Phụ huynh đồng ý',
              description: 'Phụ huynh đã đồng ý cho tiêm chủng',
              handler: 'System'
            },
            {
              id: 3,
              date: '2024-03-15',
              action: 'Tiêm chủng',
              description: 'Đã tiêm mũi 1',
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

    fetchVaccinationDetails();
  }, [id]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Chờ tiêm', variant: 'warning' },
      completed: { label: 'Đã tiêm', variant: 'success' },
      cancelled: { label: 'Đã hủy', variant: 'destructive' },
      rescheduled: { label: 'Đã đổi lịch', variant: 'secondary' }
    } as const;

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getConsentBadge = (consent: string) => {
    const consentConfig = {
      pending: { label: 'Chờ xác nhận', variant: 'warning' },
      approved: { label: 'Đã đồng ý', variant: 'success' },
      rejected: { label: 'Không đồng ý', variant: 'destructive' }
    } as const;

    const config =
      consentConfig[consent as keyof typeof consentConfig] ||
      consentConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <BasePages
        pageHead="Chi tiết tiêm chủng | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Quản lý tiêm chủng', link: '/dashboard/vaccinations' },
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
        pageHead="Chi tiết tiêm chủng | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Quản lý tiêm chủng', link: '/dashboard/vaccinations' },
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

  if (!vaccination) {
    return (
      <BasePages
        pageHead="Chi tiết tiêm chủng | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Quản lý tiêm chủng', link: '/dashboard/vaccinations' },
          { title: 'Chi tiết', link: '#' }
        ]}
      >
        <Alert>
          <Icons.info className="h-4 w-4" />
          <AlertTitle>Không tìm thấy</AlertTitle>
          <AlertDescription>
            Không tìm thấy thông tin tiêm chủng.
          </AlertDescription>
        </Alert>
      </BasePages>
    );
  }

  return (
    <BasePages
      pageHead="Chi tiết tiêm chủng | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý tiêm chủng', link: '/dashboard/vaccinations' },
        { title: 'Chi tiết', link: '#' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Chi tiết tiêm chủng</h2>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/dashboard/vaccinations/edit/${id}`}>
                <Icons.pencil className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard/vaccinations">
                <Icons.arrowLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Thông tin tiêm chủng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Tên học sinh
                    </p>
                    <p>{vaccination.studentName}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Mã học sinh
                    </p>
                    <p>{vaccination.studentId}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Lớp</p>
                    <p>{vaccination.class}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Tên vaccine
                    </p>
                    <p>{vaccination.vaccineName}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Loại vaccine
                    </p>
                    <p>{vaccination.vaccineType}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Nhà sản xuất
                    </p>
                    <p>{vaccination.manufacturer}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Số lô</p>
                    <p>{vaccination.batchNumber}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Số mũi tiêm
                    </p>
                    <p>Mũi {vaccination.dosageNumber}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Ngày tiêm
                    </p>
                    <p>{vaccination.vaccinationDate}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Ngày tiêm tiếp theo
                    </p>
                    <p>{vaccination.nextDueDate || 'Không có'}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Địa điểm tiêm
                    </p>
                    <p>{vaccination.location}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Người thực hiện
                    </p>
                    <p>{vaccination.provider}</p>
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
                    Trạng thái tiêm chủng
                  </p>
                  <p className="mt-1">{getStatusBadge(vaccination.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phụ huynh đồng ý
                  </p>
                  <p className="mt-1">
                    {getConsentBadge(vaccination.parentConsent)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ghi chú</p>
                  <p className="mt-1">{vaccination.notes || 'Không có'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tác dụng phụ sau tiêm
                  </p>
                  <p className="mt-1">
                    {vaccination.sideEffects || 'Không có'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lịch sử tiêm chủng</CardTitle>
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
                {vaccination.history.map((record) => (
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
