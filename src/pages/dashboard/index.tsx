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
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useNavigate } from 'react-router-dom';

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

const healthTrendsData = [
  { name: 'Tháng 1', sốt: 65, đauBụng: 28, cảmCúm: 40 },
  { name: 'Tháng 2', sốt: 59, đauBụng: 48, cảmCúm: 38 },
  { name: 'Tháng 3', sốt: 80, đauBụng: 40, cảmCúm: 42 },
  { name: 'Tháng 4', sốt: 81, đauBụng: 19, cảmCúm: 33 },
  { name: 'Tháng 5', sốt: 56, đauBụng: 36, cảmCúm: 25 },
  { name: 'Tháng 6', sốt: 55, đauBụng: 27, cảmCúm: 30 }
];

const COLORS = ['#0DB4B9', '#14B8A6', '#0EA5E9', '#8B5CF6', '#F59E0B'];

export default function DashboardPage() {
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;
  const navigate = useNavigate();
  if (role !== 'Admin' && role !== 'SchoolNurse') {
    navigate('/');
  }

  const overviewData = [
    {
      name: 'Sự kiện y tế trong tháng',
      value: 28,
      icon: <Icons.activity className="h-5 w-5 text-teal-600" />,
      color: 'from-teal-500 to-cyan-500',
      textColor: 'text-teal-700'
    },
    {
      name: 'Học sinh cần theo dõi',
      value: 15,
      icon: <Icons.user className="h-5 w-5 text-cyan-600" />,
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-700'
    },
    {
      name: 'Yêu cầu thuốc chờ xử lý',
      value: 8,
      icon: <Icons.pill className="h-5 w-5 text-emerald-600" />,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-700'
    },
    {
      name: 'Chiến dịch y tế sắp tới',
      value: 2,
      icon: <Icons.calendar className="h-5 w-5 text-indigo-600" />,
      color: 'from-indigo-500 to-purple-500',
      textColor: 'text-indigo-700'
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
    <>
      <div className="dashboard h-full w-full">
        {/* Thống kê tổng quan */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {overviewData.map((item, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md">
              <div
                className={`h-1 w-full bg-gradient-to-r ${item.color}`}
              ></div>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                  <h3
                    className={`mt-2 text-3xl font-semibold ${item.textColor}`}
                  >
                    {item.value}
                  </h3>
                </div>
                <div className="rounded-full bg-gray-50 p-3 shadow-sm">
                  {item.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Biểu đồ thống kê */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
              <CardTitle className="text-teal-900">
                Sự kiện y tế theo tháng
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={medicalEventsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="Số sự kiện"
                      fill="#0DB4B9"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
              <CardTitle className="text-teal-900">
                Phân loại sự kiện y tế
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
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
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biểu đồ xu hướng sức khỏe */}
        <Card className="mb-8 border-none shadow-md">
          <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
            <CardTitle className="text-teal-900">
              Xu hướng sức khỏe học sinh
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={healthTrendsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sốt"
                    stroke="#0DB4B9"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="đauBụng"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cảmCúm"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tab cho sự kiện gần đây và sắp tới */}
        <Card className="mb-6 border-none shadow-md">
          <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
            <CardTitle className="text-teal-900">Hoạt động y tế</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="recent">
              <TabsList className="mb-4 bg-gray-100">
                <TabsTrigger
                  value="recent"
                  className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-900"
                >
                  Sự kiện gần đây
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-900"
                >
                  Sự kiện sắp tới
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-teal-900">
                        <th className="pb-3 text-left font-medium">Học sinh</th>
                        <th className="pb-3 text-left font-medium">Lớp</th>
                        <th className="pb-3 text-left font-medium">
                          Loại sự kiện
                        </th>
                        <th className="pb-3 text-left font-medium">Ngày</th>
                        <th className="pb-3 text-left font-medium">
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
                                  ? 'bg-teal-100 text-teal-800'
                                  : 'bg-amber-100 text-amber-800'
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
                      className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
                    >
                      <div>
                        <h4 className="font-medium text-teal-900">
                          {event.title}
                        </h4>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Icons.calendar className="mr-1 h-4 w-4 text-teal-500" />
                          <span>{event.date}</span>
                          <span className="mx-2">•</span>
                          <span>{event.type}</span>
                        </div>
                      </div>
                      <div className="rounded-full bg-teal-50 p-2 text-teal-600">
                        <Icons.chevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
