import { useState } from 'react';
import BasePages from '@/components/shared/base-pages';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default function NotificationsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');

  // Mock data for demonstration
  const notifications = [
    {
      id: 1,
      title: 'Yêu cầu cấp thuốc mới',
      message:
        'Phụ huynh của học sinh Nguyễn Văn A đã gửi yêu cầu cấp thuốc mới.',
      type: 'medication',
      status: 'unread',
      time: '5 phút trước',
      link: '/dashboard/medications/requests'
    },
    {
      id: 2,
      title: 'Chiến dịch tiêm chủng sắp diễn ra',
      message:
        'Chiến dịch tiêm chủng cúm mùa 2024 sẽ bắt đầu trong 2 ngày tới.',
      type: 'vaccination',
      status: 'read',
      time: '2 giờ trước',
      link: '/dashboard/vaccinations/1'
    },
    {
      id: 3,
      title: 'Cập nhật hồ sơ sức khỏe',
      message: 'Hồ sơ sức khỏe của 5 học sinh đã được cập nhật.',
      type: 'health-record',
      status: 'read',
      time: '1 ngày trước',
      link: '/dashboard/student-records'
    },
    {
      id: 4,
      title: 'Thuốc sắp hết hạn',
      message: 'Có 3 loại thuốc sẽ hết hạn trong tháng tới.',
      type: 'inventory',
      status: 'unread',
      time: '2 ngày trước',
      link: '/dashboard/inventory'
    },
    {
      id: 5,
      title: 'Lịch khám sức khỏe định kỳ',
      message: 'Đã cập nhật lịch khám sức khỏe định kỳ học kỳ 1.',
      type: 'health-checkup',
      status: 'read',
      time: '3 ngày trước',
      link: '/dashboard/health-checkups'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Icons.pill className="h-5 w-5 text-blue-500" />;
      case 'vaccination':
        return <Icons.syringe className="h-5 w-5 text-green-500" />;
      case 'health-record':
        return <Icons.clipboardList className="h-5 w-5 text-purple-500" />;
      case 'inventory':
        return <Icons.package className="h-5 w-5 text-orange-500" />;
      case 'health-checkup':
        return <Icons.stethoscope className="h-5 w-5 text-red-500" />;
      default:
        return <Icons.bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'medication':
        return 'Thuốc';
      case 'vaccination':
        return 'Tiêm chủng';
      case 'health-record':
        return 'Hồ sơ sức khỏe';
      case 'inventory':
        return 'Kho vật tư';
      case 'health-checkup':
        return 'Khám sức khỏe';
      default:
        return type;
    }
  };

  const filteredNotifications =
    selectedType === 'all'
      ? notifications
      : notifications.filter(
          (notification) => notification.type === selectedType
        );

  return (
    <BasePages
      pageHead="Thông báo | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Thông báo', link: '/dashboard/notifications' }
      ]}
    >
      <div className="space-y-6">
        {/* Thống kê */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng số thông báo
              </CardTitle>
              <Icons.bell className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chưa đọc</CardTitle>
              <Icons.bellRing className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter((n) => n.status === 'unread').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bộ lọc */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Loại thông báo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả thông báo</SelectItem>
                <SelectItem value="medication">Thuốc</SelectItem>
                <SelectItem value="vaccination">Tiêm chủng</SelectItem>
                <SelectItem value="health-record">Hồ sơ sức khỏe</SelectItem>
                <SelectItem value="inventory">Kho vật tư</SelectItem>
                <SelectItem value="health-checkup">Khám sức khỏe</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Icons.check className="h-4 w-4" />
              <span>Đánh dấu tất cả đã đọc</span>
            </Button>
          </CardContent>
        </Card>

        {/* Danh sách thông báo */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách thông báo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 rounded-lg border p-4 ${
                    notification.status === 'unread' ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{notification.title}</h3>
                        {notification.status === 'unread' && (
                          <Badge className="bg-blue-100 text-blue-800">
                            Mới
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-gray-600">{notification.message}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <Badge variant="outline">
                        {getTypeText(notification.type)}
                      </Badge>
                      <Button variant="link" className="h-auto p-0">
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </BasePages>
  );
}
