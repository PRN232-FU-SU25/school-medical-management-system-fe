import { useNavigate } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import DataTable from '@/components/shared/data-table';
import {
  useGetParentConsents,
  useGetNewParentConsents,
  useUpdateConsent
} from '@/queries/vaccinations.query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger
} from '@/components/ui/select';

interface VaccinationRequest {
  id: number;
  studentId: string;
  studentFullName: string;
  className: string;
  parentFullName: string;
  isConsented: boolean;
  consentDate: string | null;
  notificationTitle: string;
}

export default function VaccinationRequests() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<VaccinationRequest | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Chưa đồng ý');

  // Get both consented and new requests
  const {
    data: consentedData,
    isLoading: isConsentedLoading,
    refetch: refetchConsented
  } = useGetParentConsents();
  const {
    data: newRequestsData,
    isLoading: isNewLoading,
    refetch: refetchNewRequests
  } = useGetNewParentConsents();
  const updateConsent = useUpdateConsent();

  const handleRequestVaccination = (request: VaccinationRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleConfirmRequest = async () => {
    if (!selectedRequest || !agreeToTerms) return;

    try {
      await updateConsent.mutateAsync({
        id: selectedRequest.id,
        data: {
          isConsented: true,
          consentDate: new Date().toISOString()
        }
      });

      toast({
        title: 'Thành công',
        description: 'Đã đồng ý tiêm chủng thành công',
        variant: 'default'
      });

      setIsDialogOpen(false);
      setAgreeToTerms(false);
      refetchConsented();
      refetchNewRequests();
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
      accessorKey: 'notificationTitle',
      header: 'Chiến dịch',
      cell: ({ row }: { row: { original: VaccinationRequest } }) => (
        <div>{row.original.notificationTitle.split(': ')[1]}</div>
      )
    },
    {
      accessorKey: 'isConsented',
      header: 'Trạng thái',
      cell: ({ row }: { row: { original: VaccinationRequest } }) => (
        <Badge variant={row.original.isConsented ? 'success' : 'warning'}>
          {row.original.isConsented ? 'Đã đồng ý' : 'Chưa đồng ý'}
        </Badge>
      )
    },
    {
      accessorKey: 'consentDate',
      header: 'Ngày đồng ý',
      cell: ({ row }: { row: { original: VaccinationRequest } }) => (
        <div>
          {row.original.consentDate && row.original.isConsented
            ? new Date(row.original.consentDate).toLocaleDateString('vi-VN')
            : '--'}
        </div>
      )
    },
    {
      id: 'actions',
      cell: ({ row }: { row: { original: VaccinationRequest } }) => (
        <Button
          variant="outline"
          size="sm"
          className="text-teal-600 hover:bg-teal-50 hover:text-teal-700"
          onClick={() => handleRequestVaccination(row.original)}
          disabled={row.original.isConsented}
        >
          <Icons.clipboardList className="mr-2 h-4 w-4" />
          Đồng ý
        </Button>
      )
    }
  ];

  if (isConsentedLoading || isNewLoading) {
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

  const uniqueStatuses = ['Đã đồng ý', 'Chưa đồng ý'];

  // Combine and process data
  const allRequests = [...(consentedData || []), ...(newRequestsData || [])];

  const filteredRequests = allRequests.filter((request) => {
    const matchesSearch =
      !searchQuery ||
      request.studentFullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      request.studentId.toString().includes(searchQuery);

    const matchesStatus =
      !statusFilter ||
      statusFilter === 'all' ||
      request.isConsented === (statusFilter === 'Đã đồng ý');

    return matchesSearch && matchesStatus;
  });

  return (
    <>
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
              Đồng ý tiêm chủng cho học sinh
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Bộ lọc và tìm kiếm */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên học sinh hoặc mã số học sinh..."
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

            <DataTable
              columns={columns}
              data={filteredRequests}
              pageCount={Math.ceil((filteredRequests.length || 0) / 10)}
            />

            <div className="text-sm text-gray-500">
              Tổng số: {filteredRequests.length || 0} học sinh
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Xác nhận đồng ý tiêm chủng chiến dịch{' '}
              {selectedRequest?.notificationTitle.split(': ')[1]}
            </DialogTitle>
            <DialogDescription>
              Vui lòng đọc kỹ và xác nhận các điều khoản dưới đây trước khi đồng
              ý tiêm chủng.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Thông tin học sinh</Label>
              <p className="text-sm text-gray-500">
                Họ tên:{' '}
                <span className="font-medium text-gray-900">
                  {selectedRequest?.studentFullName}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Lớp:{' '}
                <span className="font-medium text-gray-900">
                  {selectedRequest?.className}
                </span>
              </p>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) =>
                  setAgreeToTerms(checked as boolean)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tôi đồng ý với các điều khoản
                </label>
                <p className="text-sm text-gray-500">
                  Tôi xác nhận đã đọc và hiểu rõ các thông tin về vắc xin, quy
                  trình tiêm chủng và các rủi ro có thể xảy ra.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setAgreeToTerms(false);
              }}
            >
              Hủy
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleConfirmRequest}
              disabled={!agreeToTerms || updateConsent.isPending}
            >
              {updateConsent.isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
