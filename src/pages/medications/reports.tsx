import { useState } from 'react';
import BasePages from '@/components/shared/base-pages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Dữ liệu mẫu cho biểu đồ
const monthlyUsage = [
  { month: 'T1', used: 150, added: 200 },
  { month: 'T2', used: 180, added: 150 },
  { month: 'T3', used: 200, added: 250 },
  { month: 'T4', used: 170, added: 180 },
  { month: 'T5', used: 190, added: 200 },
  { month: 'T6', used: 220, added: 250 }
];

const categoryStats = [
  { name: 'Giảm đau', value: 30, color: '#FF6B6B' },
  { name: 'Hạ sốt', value: 25, color: '#4ECDC4' },
  { name: 'Kháng sinh', value: 15, color: '#45B7D1' },
  { name: 'Chống dị ứng', value: 20, color: '#96CEB4' },
  { name: 'Sơ cứu', value: 10, color: '#D4A5A5' }
];

const expiryStats = [
  { month: 'T7', quantity: 50 },
  { month: 'T8', quantity: 75 },
  { month: 'T9', quantity: 100 },
  { month: 'T10', quantity: 25 },
  { month: 'T11', quantity: 80 },
  { month: 'T12', quantity: 60 }
];

export default function MedicationReports() {
  const [timeRange, setTimeRange] = useState('6months');

  // Hàm xuất báo cáo
  const exportReport = async (format: 'excel' | 'pdf') => {
    try {
      // TODO: Implement export functionality
      // if (format === 'excel') {
      //   await api.get('/medications/export/excel', { responseType: 'blob' });
      // } else {
      //   await api.get('/medications/export/pdf', { responseType: 'blob' });
      // }
      console.log(`Exporting report as ${format}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <BasePages
      pageHead="Báo cáo thuốc | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý thuốc', link: '/dashboard/medications' },
        { title: 'Báo cáo', link: '#' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Báo cáo thống kê thuốc</h2>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 ngày qua</SelectItem>
                <SelectItem value="30days">30 ngày qua</SelectItem>
                <SelectItem value="6months">6 tháng qua</SelectItem>
                <SelectItem value="1year">1 năm qua</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => exportReport('excel')}
            >
              <Icons.fileSpreadsheet className="h-4 w-4" />
              Xuất Excel
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => exportReport('pdf')}
            >
              <Icons.filePdf className="h-4 w-4" />
              Xuất PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê sử dụng theo tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="used" name="Đã sử dụng" fill="#FF6B6B" />
                    <Bar dataKey="added" name="Đã nhập" fill="#4ECDC4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân bố theo loại thuốc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dự kiến hết hạn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={expiryStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="quantity"
                      name="Số lượng"
                      stroke="#FF6B6B"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tổng quan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Tổng số loại thuốc
                  </p>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-sm text-green-600">
                    <Icons.trendingUp className="mr-1 inline-block h-4 w-4" />
                    +5 loại mới trong tháng này
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Thuốc sắp hết hạn
                  </p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm text-red-600">
                    <Icons.alertTriangle className="mr-1 inline-block h-4 w-4" />
                    Cần xử lý trong 30 ngày tới
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Thuốc cần nhập thêm
                  </p>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-sm text-yellow-600">
                    <Icons.alertCircle className="mr-1 inline-block h-4 w-4" />
                    Dưới mức tồn kho tối thiểu
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BasePages>
  );
}
