import BasePages from '@/components/shared/base-pages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/ui/icons';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
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

// Dữ liệu mẫu cho dashboard
const medicalEventsData = [
  { name: 'Tháng 1', count: 12 },
  { name: 'Tháng 2', count: 19 },
  { name: 'Tháng 3', count: 15 },
  { name: 'Tháng 4', count: 8 },
  { name: 'Tháng 5', count: 22 },
  { name: 'Tháng 6', count: 17 }
];

const medicalEventTypesData = [
  { name: 'Tai nạn', value: 25 },
  { name: 'Sốt', value: 35 },
  { name: 'Té ngã', value: 15 },
  { name: 'Dị ứng', value: 10 },
  { name: 'Khác', value: 15 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function DashboardPage() {
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;

  const overviewData = [
    {
      name: 'Sự kiện y tế trong tháng',
      value: 28,
      icon: <Icons.activity className="h-5 w-5 text-blue-600" />
    },
    {
      name: 'Học sinh cần theo dõi',
      value: 15,
      icon: <Icons.user className="h-5 w-5 text-yellow-600" />
    },
    {
      name: 'Yêu cầu thuốc chờ xử lý',
      value: 8,
      icon: <Icons.pill className="h-5 w-5 text-green-600" />
    },
    {
      name: 'Chiến dịch y tế sắp tới',
      value: 2,
      icon: <Icons.calendar className="h-5 w-5 text-purple-600" />
    }
  ];

  const recentEvents = [
    {
      id: 1,
      studentName: 'Nguyễn Văn A',
      class: '10A1',
      eventType: 'Sốt',
      date: '15/06/2023',
      status: 'Đã xử lý'
    },
    {
      id: 2,
      studentName: 'Trần Thị B',
      class: '11A2',
      eventType: 'Té ngã',
      date: '14/06/2023',
      status: 'Đang theo dõi'
    },
    {
      id: 3,
      studentName: 'Lê Văn C',
      class: '9B3',
      eventType: 'Dị ứng',
      date: '13/06/2023',
      status: 'Đã xử lý'
    },
    {
      id: 4,
      studentName: 'Phạm Thị D',
      class: '12C1',
      eventType: 'Đau đầu',
      date: '12/06/2023',
      status: 'Đã xử lý'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Kiểm tra sức khỏe định kỳ - Khối 10',
      date: '20/06/2023',
      type: 'Kiểm tra y tế'
    },
    {
      id: 2,
      title: 'Tiêm chủng vắc-xin HPV - Khối 11 & 12',
      date: '25/06/2023',
      type: 'Tiêm chủng'
    }
  ];

  return (
    <BasePages
      pageHead="Tổng quan | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Tổng quan', link: '/dashboard' }
      ]}
    >
      <div className="dashboard h-full w-full">
        {/* Thống kê tổng quan */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {overviewData.map((item, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                  <h3 className="mt-1 text-3xl font-semibold">{item.value}</h3>
                </div>
                <div className="rounded-full bg-blue-50 p-3">{item.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Biểu đồ thống kê */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sự kiện y tế theo tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={medicalEventsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Số sự kiện" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân loại sự kiện y tế</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={medicalEventTypesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {medicalEventTypesData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab cho sự kiện gần đây và sắp tới */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hoạt động y tế</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent">
              <TabsList className="mb-4">
                <TabsTrigger value="recent">Sự kiện gần đây</TabsTrigger>
                <TabsTrigger value="upcoming">Sự kiện sắp tới</TabsTrigger>
              </TabsList>

              <TabsContent value="recent">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">Học sinh</th>
                        <th className="pb-2 text-left font-medium">Lớp</th>
                        <th className="pb-2 text-left font-medium">
                          Loại sự kiện
                        </th>
                        <th className="pb-2 text-left font-medium">Ngày</th>
                        <th className="pb-2 text-left font-medium">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEvents.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-3">{event.studentName}</td>
                          <td className="py-3">{event.class}</td>
                          <td className="py-3">{event.eventType}</td>
                          <td className="py-3">{event.date}</td>
                          <td className="py-3">
                            <span
                              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                event.status === 'Đã xử lý'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {event.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="upcoming">
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Icons.calendar className="mr-1 h-4 w-4" />
                          <span>{event.date}</span>
                          <span className="mx-2">•</span>
                          <span>{event.type}</span>
                        </div>
                      </div>
                      <Icons.chevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </BasePages>
  );
}
