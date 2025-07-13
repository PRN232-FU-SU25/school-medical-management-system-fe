import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { useGetHealthRecordByStudent } from '@/queries/health-records.query';
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
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { data: healthRecord, isLoading } = useGetHealthRecordByStudent(
    Number(studentId)
  );

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

  if (!healthRecord?.data) {
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

  const record = healthRecord.data;

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
            onClick={() =>
              navigate(`/dashboard/student-records/edit/${record.id}`)
            }
          >
            <Icons.pencil className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <dl className="divide-y divide-gray-100">
          <InfoRow label="Họ và tên" value={record.studentName} />
          <InfoRow label="Lớp" value={record.class} />
          <InfoRow label="Ngày sinh" value={record.dateOfBirth} />
          <InfoRow label="Giới tính" value={record.gender} />
          <InfoRow label="Nhóm máu" value={record.bloodType} />
          <InfoRow
            label="Dị ứng"
            value={record.allergies}
            badge={record.allergies !== 'Không'}
            badgeVariant="destructive"
          />
          <InfoRow
            label="Bệnh mãn tính"
            value={record.chronicDiseases}
            badge={record.chronicDiseases !== 'Không'}
            badgeVariant="destructive"
          />
          <InfoRow label="Chiều cao" value={`${record.height} cm`} />
          <InfoRow label="Cân nặng" value={`${record.weight} kg`} />
          <InfoRow label="Thị lực mắt trái" value={record.visionLeft} />
          <InfoRow label="Thị lực mắt phải" value={record.visionRight} />
          <InfoRow
            label="Trạng thái"
            value={record.status}
            badge
            badgeVariant={
              record.status === 'Bình thường' ? 'success' : 'warning'
            }
          />
          {record.note && <InfoRow label="Ghi chú" value={record.note} />}
          <InfoRow
            label="Ngày tạo"
            value={new Date(record.createdAt).toLocaleDateString('vi-VN')}
          />
          <InfoRow
            label="Cập nhật lần cuối"
            value={new Date(record.updatedAt).toLocaleDateString('vi-VN')}
          />
        </dl>
      </CardContent>
    </Card>
  );
}
