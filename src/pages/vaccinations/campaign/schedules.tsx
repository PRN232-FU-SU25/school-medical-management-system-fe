import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  useGetVaccinationRecordByCampaignAndStudent,
  useGetCampaignVaccinationSchedules
} from '@/queries/vaccinations.query';
import DataTable from '@/components/shared/data-table';
import __helpers from '@/helpers';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface VaccinationSchedule {
  id: number;
  studentId: number;
  studentCode: string;
  studentName: string;
  className: string;
  scheduleDate: string;
  isVaccinated: boolean;
  vaccinationRecordId?: number;
  status: string;
  parentId: number;
}

export default function VaccinationSchedules() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const [currentPage] = useState(1);
  const [pageSize] = useState(10);
  const role = __helpers.cookie_get('R');
  const auth = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetCampaignVaccinationSchedules(
    parseInt(campaignId || '0'),
    currentPage,
    pageSize
  );

  const filteredSchedules: any = (
    (data?.items as VaccinationSchedule[]) || []
  ).filter((schedule) => {
    if (role === 'Parent') {
      return schedule.parentId === auth.userInfo.accountId;
    }
    return true;
  });

  const { mutateAsync: getVaccinationRecordByCampaignAndStudent } =
    useGetVaccinationRecordByCampaignAndStudent();

  const handleStartVaccination = (scheduleId: number, studentId: number) => {
    navigate(
      `/dashboard/vaccinations/campaign/${campaignId}/record?scheduleId=${scheduleId}&studentId=${studentId}`
    );
  };

  const handlePostVaccination = async (studentId: number) => {
    const vaccinationRecord = await getVaccinationRecordByCampaignAndStudent({
      campaignId: parseInt(campaignId || '0'),
      studentId
    });
    console.log(vaccinationRecord);
    navigate(
      `/dashboard/vaccinations/campaign/${campaignId}/observations?recordId=${vaccinationRecord?.recordId}`
    );
  };

  const columns = [
    {
      accessorKey: 'index',
      header: 'STT',
      cell: ({ row }: { row: { index: number } }) => (
        <div>{(currentPage - 1) * pageSize + row.index + 1}</div>
      )
    },
    {
      accessorKey: 'studentId',
      header: 'Mã số học sinh'
    },
    {
      accessorKey: 'studentFullName',
      header: 'Họ và tên'
    },
    {
      accessorKey: 'className',
      header: 'Lớp'
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }: { row: { original: VaccinationSchedule } }) => (
        <Badge variant={row.original.status === 'Đã tiêm' ? 'success' : 'info'}>
          {row.original.status}
        </Badge>
      )
    },
    {
      id: 'actions',
      cell: ({ row }: { row: { original: VaccinationSchedule } }) => {
        const schedule = row.original;
        return (
          <div className="flex justify-end">
            {schedule.status === 'Đã tiêm' ? (
              <Button
                variant="default"
                size="sm"
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => handlePostVaccination(schedule.studentId)}
              >
                Theo dõi sau tiêm
              </Button>
            ) : (
              role !== 'Parent' && (
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() =>
                    handleStartVaccination(schedule.id, schedule.studentId)
                  }
                >
                  Tiêm chủng
                </Button>
              )
            )}
          </div>
        );
      }
    }
  ];

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
          <Skeleton className="h-8 w-[250px]" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
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
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            onClick={() =>
              navigate(
                `/dashboard/vaccinations/campaign/${campaignId}/consents`
              )
            }
          >
            <Icons.chevronLeft className="h-4 w-4" />
            <span className="sr-only">Quay lại</span>
          </Button>
          <CardTitle className="text-teal-900">Lịch tiêm chủng</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredSchedules || []}
            pageCount={Math.ceil(filteredSchedules.length / pageSize)}
          />

          <div className="text-sm text-gray-500">
            Tổng số: {filteredSchedules.length || 0} lịch tiêm chủng
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
