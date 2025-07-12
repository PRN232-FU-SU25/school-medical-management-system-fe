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
  { month: 'T1', total: 150, completed: 130, abnormal: 20, cancelled: 5 },
  { month: 'T2', total: 180, completed: 160, abnormal: 25, cancelled: 8 },
  { month: 'T3', total: 200, completed: 180, abnormal: 30, cancelled: 10 },
  { month: 'T4', total: 160, completed: 140, abnormal: 15, cancelled: 5 },
  { month: 'T5', total: 190, completed: 170, abnormal: 28, cancelled: 12 },
  { month: 'T6', total: 220, completed: 200, abnormal: 35, cancelled: 15 }
];

const checkupTypeStats = [
  { name: 'Định kỳ', value: 45, color: '#4ECDC4' },
  { name: 'Chuyên khoa', value: 35, color: '#FF6B6B' },
  { name: 'Cấp cứu', value: 20, color: '#45B7D1' }
];

const healthMetricsStats = [
  { month: 'T1', bmi: 21.5, bloodPressure: 115, heartRate: 75 },
  { month: 'T2', bmi: 21.8, bloodPressure: 118, heartRate: 78 },
  { month: 'T3', bmi: 22.0, bloodPressure: 120, heartRate: 80 },
  { month: 'T4', bmi: 21.7, bloodPressure: 117, heartRate: 76 },
  { month: 'T5', bmi: 21.9, bloodPressure: 119, heartRate: 77 },
  { month: 'T6', bmi: 22.1, bloodPressure: 121, heartRate: 79 }
];

export default function HealthCheckupReports() {
  const [timeRange, setTimeRange] = useState('6months');

  // Hàm xuất báo cáo
  const exportReport = async (format: 'excel' | 'pdf') => {
    try {
      // TODO: Implement export functionality
      // if (format === 'excel') {
      //   await api.get('/health-checkups/export/excel', { responseType: 'blob' });
      // } else {
      //   await api.get('/health-checkups/export/pdf', { responseType: 'blob' });
      // }
      console.log(`Exporting report as ${format}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <BasePages
      pageHead="Báo cáo khám sức khỏe | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Quản lý khám sức khỏe', link: '/dashboard/health-checkups' },
        { title: 'Báo cáo', link: '#' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Báo cáo thống kê khám sức khỏe</h2>
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
                    <Bar dataKey="completed" name="Đã khám" fill="#4ECDC4" />
                    <Bar dataKey="abnormal" name="Bất thường" fill="#FFD93D" />
                    <Bar dataKey="cancelled" name="Đã hủy" fill="#FF6B6B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân bố theo loại khám</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={checkupTypeStats}
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
                      {checkupTypeStats.map((entry, index) => (
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
              <CardTitle>Chỉ số sức khỏe trung bình</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthMetricsStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="bmi"
                      name="BMI"
                      stroke="#4ECDC4"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="bloodPressure"
                      name="Huyết áp (mmHg)"
                      stroke="#FF6B6B"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="heartRate"
                      name="Nhịp tim (nhịp/phút)"
                      stroke="#45B7D1"
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
                    Tổng số lần khám
                  </p>
                  <p className="text-3xl font-bold">1,100</p>
                  <p className="text-sm text-green-600">
                    <Icons.trendingUp className="mr-1 inline-block h-4 w-4" />
                    +220 lần trong tháng này
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Tỷ lệ hoàn thành
                  </p>
                  <p className="text-3xl font-bold">91%</p>
                  <p className="text-sm text-green-600">
                    <Icons.trendingUp className="mr-1 inline-block h-4 w-4" />
                    Tăng 3% so với tháng trước
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Tỷ lệ bất thường
                  </p>
                  <p className="text-3xl font-bold">15%</p>
                  <p className="text-sm text-red-600">
                    <Icons.trendingDown className="mr-1 inline-block h-4 w-4" />
                    Giảm 2% so với tháng trước
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
