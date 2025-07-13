import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetMedicalEventById } from '@/queries/medical-events.query';
import { Link, useParams } from 'react-router-dom';

export default function MedicalEventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const medicalEventId = id ? parseInt(id) : 0;

  const { data: medicalEvent, isLoading } =
    useGetMedicalEventById(medicalEventId);

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <CardTitle className="text-teal-900">Chi tiết sự kiện y tế</CardTitle>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/dashboard/medical-events">
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Học sinh</h3>
              <p className="text-base font-semibold text-teal-900">
                {medicalEvent?.studentFullName}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Loại sự kiện
              </h3>
              <p className="text-base font-semibold text-teal-900">
                {medicalEvent?.eventType}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Ngày xảy ra</h3>
              <p className="text-base font-semibold text-teal-900">
                {new Date(medicalEvent?.date).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Người xử lý</h3>
              <p className="text-base font-semibold text-teal-900">
                {medicalEvent?.nurseFullName}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Ngày tạo</h3>
              <p className="text-base font-semibold text-teal-900">
                {new Date(medicalEvent?.createAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500">Mô tả</h3>
            <p className="mt-1 text-base text-gray-700">
              {medicalEvent?.description || 'Không có mô tả'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
