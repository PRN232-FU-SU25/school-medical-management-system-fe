import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ParentMedicationRequestResponse,
  useGetMedicationRequests,
  useUpdateMedicationRequestStatus
} from '@/queries/medication-requests.query';
import __helpers from '@/helpers';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

export default function MedicationRequestsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // Get page and limit from URL
  const page = searchParams?.get('page') ?? '1';
  const limit = searchParams?.get('limit') ?? '10';
  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const auth = useSelector((state: RootState) => state.auth);

  const {
    data: requestsData,
    isLoading,
    refetch
  } = useGetMedicationRequests(pageNumber, pageSize);

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

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast({
        title: 'Thành công',
        description: `Đã cập nhật trạng thái thành ${getStatusText(status)}`
      });
      refetch();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật trạng thái. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    }
  };

  // Filter requests based on status and search query
  const filteredRequests = (
    (requestsData?.items as ParentMedicationRequestResponse[]) || []
  ).filter((request) => {
    const matchesStatus =
      selectedStatus === 'all' ||
      request.status.toLowerCase() === selectedStatus.toLowerCase();

    // Note: This is a simplified search since we don't have student name in the response
    // In a real app, you might want to fetch student details or have them in the response
    const matchesSearch = searchQuery
      ? request.medicationItems.some((item) =>
          item.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;

    if (auth.userInfo?.role === 'Parent') {
      return (
        matchesStatus &&
        matchesSearch &&
        request.parentId === auth.userInfo?.accountId
      );
    }

    return matchesStatus && matchesSearch;
  });

  // Count requests by status
  const pendingCount = (requestsData?.items || []).filter(
    (request: ParentMedicationRequestResponse) =>
      request.status.toLowerCase() === 'pending'
  ).length;

  const approvedCount = (requestsData?.items || []).filter(
    (request: ParentMedicationRequestResponse) =>
      request.status.toLowerCase() === 'approved'
  ).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Thống kê */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng số yêu cầu
              </CardTitle>
              <Icons.clipboardList className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requestsData?.totalRecords || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
              <Icons.clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã duyệt</CardTitle>
              <Icons.check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bộ lọc */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row">
            <Input
              placeholder="Tìm kiếm theo tên thuốc..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Danh sách yêu cầu */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Danh sách yêu cầu</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50"
                onClick={() => {
                  // Prepare data for Excel
                  const excelData = filteredRequests.map((request) => ({
                    ID: request.parentMedicationRequestId,
                    'Học sinh ID': request.studentId,
                    Thuốc: request.medicationItems
                      .map(
                        (item) =>
                          `${item.medicineName} (${item.dosage}${item.timeOfDay ? ` - ${item.timeOfDay}` : ''})`
                      )
                      .join('\n'),
                    'Ngày bắt đầu': new Date(
                      request.startDate
                    ).toLocaleDateString('vi-VN'),
                    'Ngày kết thúc': new Date(
                      request.endDate
                    ).toLocaleDateString('vi-VN'),
                    'Ngày yêu cầu': new Date(
                      request.createdAt
                    ).toLocaleDateString('vi-VN'),
                    'Trạng thái': getStatusText(request.status)
                  }));

                  // Create workbook and worksheet
                  const wb = XLSX.utils.book_new();
                  const ws = XLSX.utils.json_to_sheet(excelData);

                  // Set column widths
                  const columnWidths = [
                    { wch: 10 }, // ID
                    { wch: 15 }, // Học sinh ID
                    { wch: 40 }, // Thuốc
                    { wch: 15 }, // Ngày bắt đầu
                    { wch: 15 }, // Ngày kết thúc
                    { wch: 15 }, // Ngày yêu cầu
                    { wch: 15 }, // Trạng thái
                    { wch: 30 } // Ghi chú
                  ];
                  ws['!cols'] = columnWidths;

                  // Add the worksheet to the workbook
                  XLSX.utils.book_append_sheet(wb, ws, 'Yêu cầu thuốc');

                  // Generate Excel file
                  XLSX.writeFile(
                    wb,
                    `yeu-cau-thuoc-${new Date().toISOString().split('T')[0]}.xlsx`
                  );
                }}
              >
                <Icons.download className="mr-2 h-4 w-4" />
                Xuất Excel
              </Button>
              {__helpers.cookie_get('R') === 'Parent' && (
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link to="/dashboard/medications/requests/add">
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Tạo yêu cầu mới
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {filteredRequests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Học sinh ID</TableHead>
                    <TableHead>Thuốc</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.parentMedicationRequestId}>
                      <TableCell>
                        <div className="font-medium">
                          {request.parentMedicationRequestId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{request.studentId}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {request.medicationItems.map((item, index) => (
                            <div key={index} className="mb-1">
                              <p className="font-medium">{item.medicineName}</p>
                              <p className="text-sm text-gray-500">
                                {item.dosage}{' '}
                                {item.timeOfDay ? `- ${item.timeOfDay}` : ''}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {new Date(request.startDate).toLocaleDateString(
                              'vi-VN'
                            )}{' '}
                            -{' '}
                            {new Date(request.endDate).toLocaleDateString(
                              'vi-VN'
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            Yêu cầu:{' '}
                            {new Date(request.createdAt).toLocaleDateString(
                              'vi-VN'
                            )}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <Link
                              to={`/dashboard/medications/requests/${request.parentMedicationRequestId}`}
                            >
                              <Icons.eye className="h-4 w-4" />
                              <span className="sr-only">Xem chi tiết</span>
                            </Link>
                          </Button>
                          {request.status.toLowerCase() === 'pending' &&
                            __helpers.cookie_get('R') !== 'Parent' && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                                  onClick={() =>
                                    handleUpdateStatus(
                                      request.parentMedicationRequestId,
                                      'Approved'
                                    )
                                  }
                                  disabled={updateStatus.isPending}
                                >
                                  <Icons.check className="h-4 w-4" />
                                  <span className="sr-only">Duyệt</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                  onClick={() =>
                                    handleUpdateStatus(
                                      request.parentMedicationRequestId,
                                      'Rejected'
                                    )
                                  }
                                  disabled={updateStatus.isPending}
                                >
                                  <Icons.x className="h-4 w-4" />
                                  <span className="sr-only">Từ chối</span>
                                </Button>
                              </>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icons.inbox className="mb-2 h-10 w-10 text-gray-400" />
                <h3 className="mb-1 text-lg font-medium">
                  Không có yêu cầu nào
                </h3>
                <p className="text-sm text-gray-500">
                  Chưa có yêu cầu thuốc nào phù hợp với bộ lọc.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
