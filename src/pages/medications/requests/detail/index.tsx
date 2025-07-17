import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetMedicationRequestById,
  useUpdateMedicationRequestStatus
} from '@/queries/medication-requests.query';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import __helpers from '@/helpers';

export default function MedicationRequestDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const requestId = parseInt(id as string);

  const {
    data: request,
    isLoading,
    refetch
  } = useGetMedicationRequestById(requestId);
  const updateStatus = useUpdateMedicationRequestStatus();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Chờ duyệt';
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Từ chối';
      default:
        return status;
    }
  };

  const handleUpdateStatus = async (status: string) => {
    try {
      await updateStatus.mutateAsync({ id: requestId, status });
      toast({
        title: 'Thành công',
        description: `Đã cập nhật trạng thái thành ${getStatusText(status)}`
      });
      refetch();
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật trạng thái. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Icons.xCircle className="mb-2 h-10 w-10 text-red-400" />
        <h3 className="mb-1 text-lg font-medium">Không tìm thấy yêu cầu</h3>
        <p className="text-sm text-gray-500">
          Yêu cầu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <CardTitle className="text-teal-900">Chi tiết yêu cầu thuốc</CardTitle>
        <div className="flex gap-2">
          {request.status.toLowerCase() === 'pending' &&
            __helpers.cookie_get('R') !== 'Parent' && (
              <>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => handleUpdateStatus('Approved')}
                  disabled={updateStatus.isPending}
                >
                  <Icons.check className="mr-2 h-4 w-4" />
                  Duyệt yêu cầu
                </Button>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => handleUpdateStatus('Rejected')}
                  disabled={updateStatus.isPending}
                >
                  <Icons.x className="mr-2 h-4 w-4" />
                  Từ chối
                </Button>
              </>
            )}
          <Button
            variant="outline"
            className="border-teal-600 text-teal-600 hover:bg-teal-50"
            onClick={() => navigate(-1)}
          >
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </CardHeader>

      <CardContent className="grid gap-6 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-medium">Thông tin yêu cầu</h3>
            <div className="rounded-lg border p-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">ID yêu cầu:</dt>
                  <dd className="font-medium">
                    {request.parentMedicationRequestId}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Trạng thái:</dt>
                  <dd>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusText(request.status)}
                    </Badge>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ngày bắt đầu:</dt>
                  <dd className="font-medium">
                    {new Date(request.startDate).toLocaleDateString('vi-VN')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ngày kết thúc:</dt>
                  <dd className="font-medium">
                    {new Date(request.endDate).toLocaleDateString('vi-VN')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ngày yêu cầu:</dt>
                  <dd className="font-medium">
                    {new Date(request.createdAt).toLocaleDateString('vi-VN')}
                  </dd>
                </div>
                {request.updatedAt && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Cập nhật lần cuối:</dt>
                    <dd className="font-medium">
                      {new Date(request.updatedAt).toLocaleDateString('vi-VN')}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Thông tin học sinh</h3>
            <div className="rounded-lg border p-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Họ và tên:</dt>
                  <dd className="font-medium">{request.student.fullName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ngày sinh:</dt>
                  <dd className="font-medium">
                    {new Date(request.student.dob).toLocaleDateString('vi-VN')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Giới tính:</dt>
                  <dd className="font-medium">{request.student.gender}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Lớp:</dt>
                  <dd className="font-medium">{request.student.className}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">ID học sinh:</dt>
                  <dd className="font-medium">{request.student.studentId}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Thông tin phụ huynh</h3>
            <div className="rounded-lg border p-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">ID phụ huynh:</dt>
                  <dd className="font-medium">{request.parent.accountId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Quan hệ với học sinh:</dt>
                  <dd className="font-medium">
                    {request.parent.relationshipToStudent}
                  </dd>
                </div>
                {request.parent.jobTitle && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Nghề nghiệp:</dt>
                    <dd className="font-medium">{request.parent.jobTitle}</dd>
                  </div>
                )}
                {request.parent.workplace && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Nơi làm việc:</dt>
                    <dd className="font-medium">{request.parent.workplace}</dd>
                  </div>
                )}
                {request.parent.emergencyContactName && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Liên hệ khẩn cấp:</dt>
                    <dd className="font-medium">
                      {request.parent.emergencyContactName}
                    </dd>
                  </div>
                )}
                {request.parent.emergencyContactPhone && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">SĐT khẩn cấp:</dt>
                    <dd className="font-medium">
                      {request.parent.emergencyContactPhone}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-medium">Danh sách thuốc</h3>
          <div className="rounded-lg border p-4">
            <div className="grid gap-4 md:grid-cols-2">
              {request.medicationItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                >
                  <h4 className="font-medium">{item.medicineName}</h4>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>
                      <span className="text-gray-500">ID thuốc:</span>{' '}
                      {item.medicationItemId}
                    </p>
                    <p>
                      <span className="text-gray-500">Liều lượng:</span>{' '}
                      {item.dosage}
                    </p>
                    {item.timeOfDay && (
                      <p>
                        <span className="text-gray-500">Thời gian:</span>{' '}
                        {item.timeOfDay}
                      </p>
                    )}
                    {item.instructions && (
                      <p>
                        <span className="text-gray-500">Hướng dẫn:</span>{' '}
                        {item.instructions}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
