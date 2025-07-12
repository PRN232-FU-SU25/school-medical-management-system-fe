import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BasePages from '@/components/shared/base-pages';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Interface cho dữ liệu thuốc
interface Medication {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  batchNumber: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  storageLocation: string;
  minQuantity: number;
  description: string;
  usageInstructions: string;
  sideEffects: string;
  status: string;
  transactions: Transaction[];
}

interface Transaction {
  id: number;
  date: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  handler: string;
}

export default function MedicationDetails() {
  const { id } = useParams();
  const [medication, setMedication] = useState<Medication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicationDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: Integrate with backend API
        // const response = await api.get(`/medications/${id}`);
        // setMedication(response.data);

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMedication({
          id: 1,
          name: 'Paracetamol',
          category: 'Giảm đau',
          manufacturer: 'Công ty Dược phẩm ABC',
          batchNumber: 'BATCH123',
          quantity: 100,
          unit: 'viên',
          expiryDate: '2024-12-31',
          storageLocation: 'Tủ A1',
          minQuantity: 20,
          description: 'Thuốc giảm đau, hạ sốt',
          usageInstructions:
            'Uống 1-2 viên mỗi 4-6 giờ khi cần. Không quá 8 viên/ngày.',
          sideEffects: 'Buồn nôn, đau dạ dày (hiếm gặp)',
          status: 'active',
          transactions: [
            {
              id: 1,
              date: '2024-03-15',
              type: 'in',
              quantity: 200,
              reason: 'Nhập kho mới',
              handler: 'Nguyễn Văn A'
            },
            {
              id: 2,
              date: '2024-03-16',
              type: 'out',
              quantity: 50,
              reason: 'Cấp phát cho học sinh',
              handler: 'Trần Thị B'
            },
            {
              id: 3,
              date: '2024-03-17',
              type: 'out',
              quantity: 50,
              reason: 'Cấp phát cho phòng y tế',
              handler: 'Trần Thị B'
            }
          ]
        });
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicationDetails();
  }, [id]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Đang sử dụng', variant: 'success' },
      inactive: { label: 'Ngừng sử dụng', variant: 'secondary' },
      out_of_stock: { label: 'Hết hàng', variant: 'destructive' },
      expired: { label: 'Hết hạn', variant: 'destructive' }
    } as const;

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.inactive;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <BasePages
        pageHead="Chi tiết thuốc | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Quản lý thuốc', link: '/dashboard/medications' },
          { title: 'Chi tiết', link: '#' }
        ]}
      >
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-[200px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </BasePages>
    );
  }

  if (error) {
    return (
      <BasePages
        pageHead="Chi tiết thuốc | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Quản lý thuốc', link: '/dashboard/medications' },
          { title: 'Chi tiết', link: '#' }
        ]}
      >
        <Alert variant="destructive">
          <Icons.alertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </BasePages>
    );
  }

  if (!medication) {
    return (
      <BasePages
        pageHead="Chi tiết thuốc | Hệ thống quản lý y tế học đường"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Quản lý thuốc', link: '/dashboard/medications' },
          { title: 'Chi tiết', link: '#' }
        ]}
      >
        <Alert>
          <Icons.info className="h-4 w-4" />
          <AlertTitle>Không tìm thấy</AlertTitle>
          <AlertDescription>Không tìm thấy thông tin thuốc.</AlertDescription>
        </Alert>
      </BasePages>
    );
  }

  return (
    <BasePages
      pageHead="Chi tiết thuốc | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý thuốc', link: '/dashboard/medications' },
        { title: 'Chi tiết', link: '#' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Chi tiết thuốc</h2>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/dashboard/medications/edit/${id}`}>
                <Icons.pencil className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard/medications">
                <Icons.arrowLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Tên thuốc
                    </p>
                    <p>{medication.name}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Loại thuốc
                    </p>
                    <p>{medication.category}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Nhà sản xuất
                    </p>
                    <p>{medication.manufacturer}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Số lô</p>
                    <p>{medication.batchNumber}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Số lượng
                    </p>
                    <p>
                      {medication.quantity} {medication.unit}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Ngày hết hạn
                    </p>
                    <p>{medication.expiryDate}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Vị trí lưu trữ
                    </p>
                    <p>{medication.storageLocation}</p>
                  </div>
                </div>
                <div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Trạng thái
                    </p>
                    <p>{getStatusBadge(medication.status)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin tồn kho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Số lượng hiện tại
                  </p>
                  <p className="mt-1 text-3xl font-bold">
                    {medication.quantity}
                    <span className="ml-1 text-base font-normal text-gray-500">
                      {medication.unit}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Số lượng tối thiểu
                  </p>
                  <p className="mt-1 text-3xl font-bold">
                    {medication.minQuantity}
                    <span className="ml-1 text-base font-normal text-gray-500">
                      {medication.unit}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Trạng thái tồn kho
                  </p>
                  <p className="mt-1">
                    {medication.quantity <= medication.minQuantity ? (
                      <Badge variant="destructive">Cần nhập thêm</Badge>
                    ) : (
                      <Badge variant="success">Đủ số lượng</Badge>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin chi tiết</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Mô tả</p>
                <p className="mt-1">{medication.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Hướng dẫn sử dụng
                </p>
                <p className="mt-1">{medication.usageInstructions}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Tác dụng phụ
                </p>
                <p className="mt-1">{medication.sideEffects || 'Không có'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lịch sử xuất/nhập kho</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Lý do</TableHead>
                  <TableHead>Người thực hiện</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medication.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      {transaction.type === 'in' ? (
                        <Badge variant="success">Nhập kho</Badge>
                      ) : (
                        <Badge variant="destructive">Xuất kho</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {transaction.quantity} {medication.unit}
                    </TableCell>
                    <TableCell>{transaction.reason}</TableCell>
                    <TableCell>{transaction.handler}</TableCell>
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
