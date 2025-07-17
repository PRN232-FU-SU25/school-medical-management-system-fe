import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { useGetHealthRecordById } from '@/queries/health-records.query';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface InfoRowProps {
  label: string;
  value: string | number;
  badge?: boolean;
  badgeVariant?: 'default' | 'success' | 'warning' | 'destructive';
}

const InfoRow = ({ label, value, badge, badgeVariant }: InfoRowProps) => (
  <div className="grid grid-cols-3 gap-4 py-3">
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="col-span-2">
      {badge ? (
        <Badge variant={badgeVariant}>{value}</Badge>
      ) : (
        <span className="text-gray-900">{value}</span>
      )}
    </dd>
  </div>
);

export default function HealthRecordDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('id from params:', id);
  console.log('id after Number conversion:', Number(id));
  const { data: healthRecord, isLoading } = useGetHealthRecordById(Number(id));

  const genderMap = {
    Male: 'Nam',
    Female: 'Nữ',
    Other: 'Khác'
  };

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 py-3">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="col-span-2 h-6 w-[200px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!healthRecord) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">Không tìm thấy hồ sơ</CardTitle>
          <Button
            variant="outline"
            className="border-teal-600 text-teal-600 hover:bg-teal-50"
            onClick={() => navigate(-1)}
          >
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <CardTitle className="text-teal-900">Chi tiết hồ sơ sức khỏe</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-teal-600 text-teal-600 hover:bg-teal-50"
            onClick={() => navigate(-1)}
          >
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => navigate(`/dashboard/student-records/${id}/edit`)}
          >
            <Icons.pencil className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <dl className="divide-y divide-gray-100">
          <InfoRow label="Họ và tên" value={healthRecord.student.fullName} />
          <InfoRow label="Lớp" value={healthRecord.student.className} />
          <InfoRow
            label="Ngày sinh"
            value={new Date(healthRecord.student.dob).toLocaleDateString(
              'vi-VN'
            )}
          />
          <InfoRow
            label="Giới tính"
            value={
              genderMap[healthRecord.student.gender as keyof typeof genderMap]
            }
          />
          <InfoRow
            label="Dị ứng"
            value={healthRecord.allergies}
            badge={healthRecord.allergies !== 'Không'}
            badgeVariant="destructive"
          />
          <InfoRow
            label="Bệnh mãn tính"
            value={healthRecord.chronicDiseases}
            badge={healthRecord.chronicDiseases !== 'Không'}
            badgeVariant="destructive"
          />
          <InfoRow
            label="Tiền sử điều trị"
            value={healthRecord.pastTreatments}
            badge={healthRecord.pastTreatments !== 'Không'}
            badgeVariant="warning"
          />
          <InfoRow
            label="Thị lực"
            value={healthRecord.vision}
            badge={healthRecord.vision !== 'Bình thường'}
            badgeVariant="warning"
          />
          <InfoRow
            label="Thính lực"
            value={healthRecord.hearing}
            badge={healthRecord.hearing !== 'Bình thường'}
            badgeVariant="warning"
          />
          <InfoRow
            label="Tiêm chủng"
            value={healthRecord.vaccinations}
            badge={healthRecord.vaccinations !== 'Đầy đủ'}
            badgeVariant="warning"
          />
          <InfoRow
            label="Ngày tạo"
            value={new Date(healthRecord.createdAt).toLocaleDateString('vi-VN')}
          />
          {healthRecord.updatedAt && (
            <InfoRow
              label="Cập nhật lần cuối"
              value={new Date(healthRecord.updatedAt).toLocaleDateString(
                'vi-VN'
              )}
            />
          )}
        </dl>
      </CardContent>
    </Card>
  );
}
