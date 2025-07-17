import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import DataTable from '@/components/shared/data-table';
import {
  useGetCampaignConsents,
  useGenerateVaccinationSchedule
} from '@/queries/vaccinations.query';

interface VaccinationConsent {
  id: number;
  studentCode: string;
  studentName: string;
  className: string;
  parentName: string;
  isConsented: boolean;
  consentDate: string;
}

export default function VaccinationConsents() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data, isLoading } = useGetCampaignConsents(
    parseInt(campaignId || '0'),
    currentPage,
    pageSize
  );

  const generateSchedule = useGenerateVaccinationSchedule();

  const handleGenerateSchedule = async () => {
    try {
      await generateSchedule.mutateAsync({
        campaignId: parseInt(campaignId || '0'),
        scheduleDate: selectedDate
      });

      toast({
        title: 'Thành công',
        description: 'Lên lịch tiêm chủng thành công',
        variant: 'default'
      });

      navigate(`/dashboard/vaccinations/campaign/${campaignId}/schedules`);
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi',
        variant: 'destructive'
      });
    }
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
      accessorKey: 'parentFullName',
      header: 'Phụ huynh'
    },
    {
      accessorKey: 'isConsented',
      header: 'Trạng thái',
      cell: ({ row }: { row: { original: VaccinationConsent } }) => (
        <Badge variant={row.original.isConsented ? 'success' : 'destructive'}>
          {row.original.isConsented ? 'Đã đồng ý' : 'Chưa đồng ý'}
        </Badge>
      )
    },
    {
      accessorKey: 'consentDate',
      header: 'Ngày đồng ý',
      cell: ({ row }: { row: { original: VaccinationConsent } }) => (
        <div>
          {row.original.consentDate
            ? new Date(row.original.consentDate).toLocaleDateString('vi-VN')
            : '--'}
        </div>
      )
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
            onClick={() => navigate('/dashboard/vaccinations')}
          >
            <Icons.chevronLeft className="h-4 w-4" />
            <span className="sr-only">Quay lại</span>
          </Button>
          <CardTitle className="text-teal-900">
            Danh sách phụ huynh đã đồng ý tiêm chủng
          </CardTitle>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="w-[180px]"
          />
          <Button
            variant="default"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleGenerateSchedule}
            disabled={generateSchedule.isPending}
          >
            {generateSchedule.isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Lên lịch tiêm chủng
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={data?.items || []}
            pageCount={data?.totalPages || 1}
          />

          <div className="text-sm text-gray-500">
            Tổng số: {data?.totalItems || 0} học sinh đã đồng ý tiêm chủng
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
