import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BasePages from '@/components/shared/base-pages';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Interface cho dữ liệu sự kiện y tế
interface MedicalEvent {
  id: number;
  studentName: string;
  class: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  severity: string;
  description: string;
  handler: string;
  status: string;
  treatments: Treatment[];
}

interface Treatment {
  id: number;
  date: string;
  time: string;
  description: string;
  medication: string;
  handler: string;
}

export default function MedicalEventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<MedicalEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: Integrate with backend API
        // const response = await api.get(`/medical-events/${id}`);
        // setEvent(response.data);

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEvent({
          id: 1,
          studentName: 'Nguyễn Văn A',
          class: '10A1',
          eventType: 'Sốt',
          date: '15/06/2023',
          time: '09:30',
          location: 'Phòng học 101',
          severity: 'Trung bình',
          description: 'Học sinh bị sốt 38.5 độ C, đau đầu nhẹ',
          handler: 'BS. Trần Thị B',
          status: 'Đã xử lý',
          treatments: [
            {
              id: 1,
              date: '15/06/2023',
              time: '09:35',
              description: 'Cho uống thuốc hạ sốt và nghỉ ngơi tại phòng y tế',
              medication: 'Paracetamol 500mg',
              handler: 'BS. Trần Thị B'
            },
            {
              id: 2,
              date: '15/06/2023',
              time: '10:30',
              description: 'Kiểm tra lại nhiệt độ: 37.5 độ C',
              medication: 'Không',
              handler: 'BS. Trần Thị B'
            },
            {
              id: 3,
              date: '15/06/2023',
              time: '11:30',
              description: 'Nhiệt độ trở về bình thường, cho phép về lớp học',
              medication: 'Không',
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

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <BasePages
        pageHead="Chi tiết sự kiện y tế | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Sự kiện y tế', link: '/dashboard/medical-events' },
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
        pageHead="Chi tiết sự kiện y tế | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Sự kiện y tế', link: '/dashboard/medical-events' },
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

  if (!event) {
    return (
      <BasePages
        pageHead="Chi tiết sự kiện y tế | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Sự kiện y tế', link: '/dashboard/medical-events' },
          { title: 'Chi tiết', link: '#' }
        ]}
      >
        <Alert>
          <Icons.info className="h-4 w-4" />
          <AlertTitle>Không tìm thấy</AlertTitle>
          <AlertDescription>
            Không tìm thấy thông tin sự kiện y tế.
          </AlertDescription>
        </Alert>
      </BasePages>
    );
  }

  return (
    <BasePages
      pageHead="Chi tiết sự kiện y tế | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Sự kiện y tế', link: '/dashboard/medical-events' },
        { title: 'Chi tiết', link: '#' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Chi tiết sự kiện y tế</h2>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/dashboard/medical-events/edit/${id}`}>
                <Icons.pencil className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard/medical-events">
                <Icons.arrowLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin sự kiện</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Học sinh</p>
                  <p>{event.studentName}</p>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Lớp</p>
                  <p>{event.class}</p>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Loại sự kiện
                  </p>
                  <p>{event.eventType}</p>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Thời gian</p>
                  <p>
                    {event.date} {event.time}
                  </p>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Vị trí</p>
                  <p>{event.location}</p>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Mức độ</p>
                  <p>{event.severity}</p>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Người xử lý
                  </p>
                  <p>{event.handler}</p>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Trạng thái
                  </p>
                  <p>{event.status}</p>
                </div>
              </div>
              <div className="col-span-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Mô tả</p>
                  <p>{event.description}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quá trình điều trị</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Thuốc sử dụng</TableHead>
                  <TableHead>Người xử lý</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.treatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell>
                      {treatment.date} {treatment.time}
                    </TableCell>
                    <TableCell>{treatment.description}</TableCell>
                    <TableCell>{treatment.medication}</TableCell>
                    <TableCell>{treatment.handler}</TableCell>
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
