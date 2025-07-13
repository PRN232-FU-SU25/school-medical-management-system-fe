import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export default function VaccinationDetailPage() {
  // Mock data for demonstration
  const campaign = {
    id: 1,
    name: 'Tiêm chủng cúm mùa 2024',
    vaccine: 'Vắc xin cúm 4 trong 1',
    manufacturer: 'GlaxoSmithKline',
    batchNumber: 'FL2024001',
    targetGroups: ['Học sinh THPT'],
    startDate: '20/01/2024',
    endDate: '25/01/2024',
    location: 'Phòng y tế trường',
    status: 'upcoming',
    description:
      'Chiến dịch tiêm chủng vắc xin cúm định kỳ cho học sinh trường THPT.',
    requirements: [
      'Mang theo thẻ học sinh',
      'Ăn đầy đủ trước khi tiêm',
      'Mặc trang phục thoải mái',
      'Nghỉ ngơi đầy đủ trước ngày tiêm'
    ],
    statistics: {
      totalStudents: 1200,
      registeredStudents: 850,
      completedStudents: 0
    },
    schedule: [
      {
        date: '20/01/2024',
        time: '08:00 - 11:30',
        class: '10A1, 10A2',
        registered: 120,
        status: 'upcoming'
      },
      {
        date: '20/01/2024',
        time: '13:30 - 16:30',
        class: '10A3, 10A4',
        registered: 115,
        status: 'upcoming'
      },
      {
        date: '21/01/2024',
        time: '08:00 - 11:30',
        class: '11A1, 11A2',
        registered: 125,
        status: 'upcoming'
      }
    ],
    medicalStaff: [
      {
        name: 'BS. Nguyễn Văn A',
        role: 'Bác sĩ chính',
        shift: 'Sáng'
      },
      {
        name: 'BS. Trần Thị B',
        role: 'Bác sĩ chính',
        shift: 'Chiều'
      },
      {
        name: 'YT. Lê Văn C',
        role: 'Y tá',
        shift: 'Cả ngày'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Sắp diễn ra';
      case 'ongoing':
        return 'Đang diễn ra';
      case 'completed':
        return 'Đã hoàn thành';
      default:
        return status;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Thông tin cơ bản */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{campaign.name}</h2>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(campaign.status)}>
                  {getStatusText(campaign.status)}
                </Badge>
                <span className="text-gray-500">
                  {campaign.startDate} - {campaign.endDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Icons.pencil className="h-4 w-4" />
                <span>Chỉnh sửa</span>
              </Button>
              <Button variant="outline" className="gap-2">
                <Icons.post className="h-4 w-4" />
                <span>Xuất báo cáo</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="font-medium">Vắc xin</p>
                <p className="text-gray-500">{campaign.vaccine}</p>
              </div>
              <div>
                <p className="font-medium">Nhà sản xuất</p>
                <p className="text-gray-500">{campaign.manufacturer}</p>
              </div>
              <div>
                <p className="font-medium">Số lô</p>
                <p className="text-gray-500">{campaign.batchNumber}</p>
              </div>
              <div>
                <p className="font-medium">Địa điểm</p>
                <p className="text-gray-500">{campaign.location}</p>
              </div>
            </div>
            <div>
              <p className="font-medium">Mô tả</p>
              <p className="text-gray-500">{campaign.description}</p>
            </div>
            <div>
              <p className="font-medium">Yêu cầu chuẩn bị</p>
              <ul className="ml-6 list-disc text-gray-500">
                {campaign.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Thống kê */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng số học sinh
              </CardTitle>
              <Icons.users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaign.statistics.totalStudents}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã đăng ký</CardTitle>
              <Icons.clipboardCheck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaign.statistics.registeredStudents}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã tiêm</CardTitle>
              <Icons.check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaign.statistics.completedStudents}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lịch tiêm */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch tiêm chủng</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Số lượng đăng ký</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaign.schedule.map((schedule, index) => (
                  <TableRow key={index}>
                    <TableCell>{schedule.date}</TableCell>
                    <TableCell>{schedule.time}</TableCell>
                    <TableCell>{schedule.class}</TableCell>
                    <TableCell>{schedule.registered}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(schedule.status)}>
                        {getStatusText(schedule.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Xem danh sách
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Nhân viên y tế */}
        <Card>
          <CardHeader>
            <CardTitle>Nhân viên y tế tham gia</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Ca trực</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaign.medicalStaff.map((staff, index) => (
                  <TableRow key={index}>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.shift}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
