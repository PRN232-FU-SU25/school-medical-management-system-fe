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
const monthlyStats = [
  { month: 'T1', total: 120, completed: 100, pending: 15, cancelled: 5 },
  { month: 'T2', total: 150, completed: 130, pending: 15, cancelled: 5 },
  { month: 'T3', total: 180, completed: 160, pending: 15, cancelled: 5 },
  { month: 'T4', total: 140, completed: 120, pending: 15, cancelled: 5 },
  { month: 'T5', total: 160, completed: 140, pending: 15, cancelled: 5 },
  { month: 'T6', total: 200, completed: 180, pending: 15, cancelled: 5 }
];

const vaccineTypeStats = [
  { name: 'COVID-19', value: 35, color: '#FF6B6B' },
  { name: 'Viêm gan B', value: 25, color: '#4ECDC4' },
  { name: 'MMR', value: 20, color: '#45B7D1' },
  { name: 'HPV', value: 15, color: '#96CEB4' },
  { name: 'Khác', value: 5, color: '#D4A5A5' }
];

const consentStats = [
  { month: 'T1', rate: 85 },
  { month: 'T2', rate: 88 },
  { month: 'T3', rate: 92 },
  { month: 'T4', rate: 90 },
  { month: 'T5', rate: 95 },
  { month: 'T6', rate: 98 }
];

export default function VaccinationReports() {
  const [timeRange, setTimeRange] = useState('6months');

  // Hàm xuất báo cáo
  const exportReport = async (format: 'excel' | 'pdf') => {
    try {
      // TODO: Implement export functionality
      // if (format === 'excel') {
      //   await api.get('/vaccinations/export/excel', { responseType: 'blob' });
      // } else {
      //   await api.get('/vaccinations/export/pdf', { responseType: 'blob' });
      // }
      console.log(`Exporting report as ${format}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <BasePages
      pageHead="Báo cáo tiêm chủng | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý tiêm chủng', link: '/dashboard/vaccinations' },
        { title: 'Báo cáo', link: '#' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Báo cáo thống kê tiêm chủng</h2>
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
                    <Bar dataKey="completed" name="Đã tiêm" fill="#4ECDC4" />
                    <Bar dataKey="pending" name="Chờ tiêm" fill="#FFD93D" />
                    <Bar dataKey="cancelled" name="Đã hủy" fill="#FF6B6B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân bố theo loại vaccine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vaccineTypeStats}
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
                      {vaccineTypeStats.map((entry, index) => (
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
              <CardTitle>Tỷ lệ đồng ý của phụ huynh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={consentStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      name="Tỷ lệ đồng ý (%)"
                      stroke="#4ECDC4"
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
                    Tổng số mũi tiêm
                  </p>
                  <p className="text-3xl font-bold">950</p>
                  <p className="text-sm text-green-600">
                    <Icons.trendingUp className="mr-1 inline-block h-4 w-4" />
                    +180 mũi trong tháng này
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Tỷ lệ hoàn thành
                  </p>
                  <p className="text-3xl font-bold">89%</p>
                  <p className="text-sm text-green-600">
                    <Icons.trendingUp className="mr-1 inline-block h-4 w-4" />
                    Tăng 5% so với tháng trước
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Tỷ lệ tác dụng phụ
                  </p>
                  <p className="text-3xl font-bold">0.5%</p>
                  <p className="text-sm text-gray-600">
                    <Icons.minus className="mr-1 inline-block h-4 w-4" />
                    Không đổi so với tháng trước
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
