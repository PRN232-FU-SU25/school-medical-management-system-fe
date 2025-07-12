import { useState } from 'react';
import BasePages from '@/components/shared/base-pages';
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

export default function MedicationRequestsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock data for demonstration
  const requests = [
    {
      id: 1,
      studentName: 'Nguyễn Văn A',
      studentId: 'SV001',
      class: '10A1',
      medicationName: 'Paracetamol',
      dosage: '500mg',
      frequency: '3 lần/ngày',
      startDate: '15/01/2024',
      endDate: '17/01/2024',
      reason: 'Sốt nhẹ',
      status: 'pending',
      requestedBy: 'Nguyễn Thị B (Phụ huynh)',
      requestDate: '14/01/2024'
    },
    {
      id: 2,
      studentName: 'Trần Thị C',
      studentId: 'SV002',
      class: '11A2',
      medicationName: 'Ventolin',
      dosage: '2 nhát xịt',
      frequency: 'Khi cần',
      startDate: '10/01/2024',
      endDate: '10/02/2024',
      reason: 'Hen suyễn',
      status: 'approved',
      requestedBy: 'Trần Văn D (Phụ huynh)',
      requestDate: '09/01/2024'
    },
    {
      id: 3,
      studentName: 'Lê Văn E',
      studentId: 'SV003',
      class: '12A3',
      medicationName: 'Cetirizine',
      dosage: '10mg',
      frequency: '1 lần/ngày',
      startDate: '12/01/2024',
      endDate: '19/01/2024',
      reason: 'Dị ứng phấn hoa',
      status: 'rejected',
      requestedBy: 'Lê Thị F (Phụ huynh)',
      requestDate: '11/01/2024'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
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
    switch (status) {
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

  const filteredRequests =
    selectedStatus === 'all'
      ? requests
      : requests.filter((request) => request.status === selectedStatus);

  return (
    <BasePages
      pageHead="Yêu cầu cấp thuốc | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý thuốc', link: '/dashboard/medications' },
        { title: 'Yêu cầu cấp thuốc', link: '/dashboard/medications/requests' }
      ]}
    >
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
              <div className="text-2xl font-bold">{requests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
              <Icons.clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter((r) => r.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã duyệt</CardTitle>
              <Icons.check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter((r) => r.status === 'approved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bộ lọc */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row">
            <Input
              placeholder="Tìm kiếm theo tên học sinh, mã số..."
              className="flex-1"
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
          <CardHeader>
            <CardTitle>Danh sách yêu cầu</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Học sinh</TableHead>
                  <TableHead>Thuốc</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Lý do</TableHead>
                  <TableHead>Người yêu cầu</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.studentName}</p>
                        <p className="text-sm text-gray-500">
                          {request.studentId} - {request.class}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.medicationName}</p>
                        <p className="text-sm text-gray-500">
                          {request.dosage} - {request.frequency}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {request.startDate} - {request.endDate}
                        </p>
                        <p className="text-sm text-gray-500">
                          Yêu cầu: {request.requestDate}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
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
                        >
                          <Icons.eye className="h-4 w-4" />
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                            >
                              <Icons.check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Icons.close className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
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
