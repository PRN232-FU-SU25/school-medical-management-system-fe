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
import { Link, useSearchParams } from 'react-router-dom';
import DataTable from '@/components/shared/data-table';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetVaccinationCampaigns } from '@/queries/vaccinations.query';
import * as XLSX from 'xlsx';

interface VaccinationCampaign {
  campaignId: number;
  name: string;
  description?: string;
  date: string;
  status?: string; // Added to fix linter errors
}

// Định nghĩa cột cho bảng
const columns = [
  {
    accessorKey: 'name',
    header: 'Tên chiến dịch',
    cell: ({ row }: { row: { original: VaccinationCampaign } }) => (
      <div className="font-medium text-teal-900">{row.original.name}</div>
    )
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    cell: ({ row }: { row: { original: VaccinationCampaign } }) => (
      <div className="text-gray-600">{row.original.description || '--'}</div>
    )
  },
  {
    accessorKey: 'date',
    header: 'Ngày tổ chức',
    cell: ({ row }: { row: { original: VaccinationCampaign } }) => (
      <div className="text-gray-600">
        {new Date(row.original.date).toLocaleDateString('vi-VN')}
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const status = row.getValue('status') || 'Không xác định';
      const statusConfig: Record<
        string,
        { variant: 'success' | 'warning' | 'default' | 'destructive' }
      > = {
        'Sắp diễn ra': { variant: 'default' },
        'Đang diễn ra': { variant: 'warning' },
        'Đã hoàn thành': { variant: 'success' },
        'Không xác định': { variant: 'destructive' }
      };
      const config = statusConfig[status] || statusConfig['Không xác định'];

      return <Badge variant={config.variant}>{status}</Badge>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }: { row: { original: VaccinationCampaign } }) => {
      const campaign = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            asChild
          >
            <Link
              to={`/dashboard/vaccinations/campaign/${campaign.campaignId}/consents`}
            >
              <Icons.userCheck className="h-4 w-4" />
              <span className="sr-only">Phiếu đồng ý</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            asChild
          >
            <Link
              to={`/dashboard/vaccinations/campaign/${campaign.campaignId}/schedules`}
            >
              <Icons.calendar className="h-4 w-4" />
              <span className="sr-only">Lịch tiêm</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            asChild
          >
            <Link
              to={`/dashboard/vaccinations/campaign/${campaign.campaignId}`}
            >
              <Icons.pencil className="h-4 w-4" />
              <span className="sr-only">Chỉnh sửa</span>
            </Link>
          </Button>
        </div>
      );
    }
  }
];

export default function VaccinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [searchParams] = useSearchParams();

  // Get page and limit from URL
  const page = searchParams?.get('page') ?? '1';
  const limit = searchParams?.get('limit') ?? '10';
  const pageNumber = Number(page);
  const pageSize = Number(limit);

  const { data: campaignsData, isLoading } = useGetVaccinationCampaigns(
    pageNumber,
    pageSize
  );

  // Process and filter campaign data
  const processedCampaigns = (campaignsData?.items || []).map(
    (campaign: VaccinationCampaign) => {
      // Determine status based on date
      const now = new Date();
      const campaignDate = new Date(campaign.date);

      let status = '';
      if (now < campaignDate) status = 'Sắp diễn ra';
      else if (now.toDateString() === campaignDate.toDateString())
        status = 'Đang diễn ra';
      else status = 'Đã hoàn thành';

      return {
        ...campaign,
        status
      };
    }
  );

  // Filter campaigns based on search and status filter
  const filteredCampaigns = processedCampaigns.filter(
    (campaign: VaccinationCampaign) => {
      const matchesSearch =
        !searchQuery ||
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        !statusFilter ||
        statusFilter === 'all' ||
        campaign.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  // List of unique statuses
  const uniqueStatuses = ['Sắp diễn ra', 'Đang diễn ra', 'Đã hoàn thành'];

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-[250px]" />
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
    );
  }

  return (
    <>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">Quản lý tiêm chủng</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
              onClick={() => {
                // Prepare data for Excel
                const excelData = filteredCampaigns.map(
                  (campaign: VaccinationCampaign) => ({
                    'Tên chiến dịch': campaign.name,
                    'Mô tả': campaign.description || 'Không có',
                    'Ngày tổ chức': new Date(campaign.date).toLocaleDateString(
                      'vi-VN'
                    ),
                    'Trạng thái': campaign.status,
                    'Ghi chú': 'Không có' // No notes field in the new interface
                  })
                );

                // Create workbook and worksheet
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(excelData);

                // Set column widths
                const columnWidths = [
                  { wch: 30 }, // Tên chiến dịch
                  { wch: 30 }, // Mô tả
                  { wch: 15 }, // Ngày tổ chức
                  { wch: 15 }, // Trạng thái
                  { wch: 30 } // Ghi chú
                ];
                ws['!cols'] = columnWidths;

                // Add the worksheet to the workbook
                XLSX.utils.book_append_sheet(wb, ws, 'Chiến dịch tiêm chủng');

                // Generate Excel file
                XLSX.writeFile(
                  wb,
                  `chien-dich-tiem-chung-${new Date().toISOString().split('T')[0]}.xlsx`
                );
              }}
            >
              <Icons.download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/dashboard/vaccinations/campaign/create">
                <Icons.plus className="mr-2 h-4 w-4" />
                Tạo chiến dịch mới
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Bộ lọc và tìm kiếm */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên chiến dịch hoặc mô tả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:max-w-[300px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:max-w-[200px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  {uniqueStatuses.map((status, index) => (
                    <SelectItem key={index} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bảng dữ liệu */}
            <DataTable
              columns={columns}
              data={filteredCampaigns}
              pageCount={Math.ceil(
                (campaignsData?.totalRecords || 0) / pageSize
              )}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
