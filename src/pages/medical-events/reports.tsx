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
  Cell
} from 'recharts';

// Dữ liệu mẫu cho biểu đồ
const monthlyStats = [
  { month: 'T1', total: 45, severe: 5, medium: 15, mild: 25 },
  { month: 'T2', total: 38, severe: 3, medium: 12, mild: 23 },
  { month: 'T3', total: 52, severe: 7, medium: 18, mild: 27 },
  { month: 'T4', total: 41, severe: 4, medium: 14, mild: 23 },
  { month: 'T5', total: 47, severe: 6, medium: 16, mild: 25 },
  { month: 'T6', total: 53, severe: 8, medium: 20, mild: 25 }
];

const eventTypeStats = [
  { name: 'Sốt', value: 35, color: '#FF6B6B' },
  { name: 'Chấn thương', value: 25, color: '#4ECDC4' },
  { name: 'Dị ứng', value: 15, color: '#45B7D1' },
  { name: 'Đau đầu', value: 12, color: '#96CEB4' },
  { name: 'Khác', value: 13, color: '#D4A5A5' }
];

export default function MedicalEventReports() {
  const [timeRange, setTimeRange] = useState('6months');

  // Hàm xuất báo cáo
  const exportReport = async (format: 'excel' | 'pdf') => {
    try {
      // TODO: Implement export functionality
      // if (format === 'excel') {
      //   await api.get('/medical-events/export/excel', { responseType: 'blob' });
      // } else {
      //   await api.get('/medical-events/export/pdf', { responseType: 'blob' });
      // }
      console.log(`Exporting report as ${format}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <BasePages
      pageHead="Báo cáo sự kiện y tế | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Sự kiện y tế', link: '/dashboard/medical-events' },
        { title: 'Báo cáo', link: '#' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Báo cáo thống kê sự kiện y tế</h2>
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
              <CardTitle>Thống kê theo tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="severe" name="Nghiêm trọng" fill="#FF6B6B" />
                    <Bar dataKey="medium" name="Trung bình" fill="#4ECDC4" />
                    <Bar dataKey="mild" name="Nhẹ" fill="#45B7D1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân bố loại sự kiện</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={eventTypeStats}
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
                      {eventTypeStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tổng quan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">
                  Tổng số sự kiện
                </p>
                <p className="text-3xl font-bold">276</p>
                <p className="text-sm text-green-600">
                  <Icons.trendingUp className="mr-1 inline-block h-4 w-4" />
                  +12% so với tháng trước
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">
                  Sự kiện nghiêm trọng
                </p>
                <p className="text-3xl font-bold">33</p>
                <p className="text-sm text-red-600">
                  <Icons.trendingDown className="mr-1 inline-block h-4 w-4" />
                  -5% so với tháng trước
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">
                  Thời gian xử lý trung bình
                </p>
                <p className="text-3xl font-bold">45p</p>
                <p className="text-sm text-green-600">
                  <Icons.trendingUp className="mr-1 inline-block h-4 w-4" />
                  Cải thiện 15% so với tháng trước
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">
                  Tỷ lệ xử lý thành công
                </p>
                <p className="text-3xl font-bold">98%</p>
                <p className="text-sm text-gray-600">
                  <Icons.minus className="mr-1 inline-block h-4 w-4" />
                  Không đổi so với tháng trước
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BasePages>
  );
}
