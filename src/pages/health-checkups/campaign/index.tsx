import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HealthCheckupCampaignPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for demonstration
  const campaigns = [
    {
      id: 1,
      name: 'Khám sức khỏe định kỳ học kỳ 1',
      type: 'Khám tổng quát',
      targetGroups: ['Học sinh THPT'],
      startDate: '05/02/2024',
      endDate: '15/02/2024',
      location: 'Phòng y tế trường',
      status: 'upcoming',
      totalStudents: 1200,
      registeredStudents: 1150,
      completedStudents: 0,
      examinations: [
        'Khám nội khoa',
        'Đo thị lực',
        'Đo chiều cao, cân nặng',
        'Khám răng hàm mặt',
        'Xét nghiệm cơ bản'
      ]
    },
    {
      id: 2,
      name: 'Khám sàng lọc cong vẹo cột sống',
      type: 'Khám chuyên khoa',
      targetGroups: ['Học sinh khối 10'],
      startDate: '15/01/2024',
      endDate: '20/01/2024',
      location: 'Phòng y tế trường',
      status: 'completed',
      totalStudents: 400,
      registeredStudents: 395,
      completedStudents: 390,
      examinations: [
        'Khám cột sống',
        'Chụp X-quang (nếu cần)',
        'Tư vấn tập luyện'
      ]
    }
  ];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement form submission
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <>
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Danh sách chiến dịch</TabsTrigger>
          <TabsTrigger value="new">Tạo chiến dịch mới</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {/* Thống kê */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng số chiến dịch
                </CardTitle>
                <Icons.clipboardList className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaigns.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Đang diễn ra
                </CardTitle>
                <Icons.activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.filter((c) => c.status === 'ongoing').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sắp diễn ra
                </CardTitle>
                <Icons.calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.filter((c) => c.status === 'upcoming').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Danh sách chiến dịch */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách chiến dịch khám sức khỏe</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên chiến dịch</TableHead>
                    <TableHead>Loại khám</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Địa điểm</TableHead>
                    <TableHead>Tiến độ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-sm text-gray-500">
                            {campaign.targetGroups.join(', ')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.type}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {campaign.startDate} - {campaign.endDate}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.location}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">
                            Đăng ký: {campaign.registeredStudents}/
                            {campaign.totalStudents}
                          </p>
                          <div className="h-2 w-full rounded-full bg-gray-100">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{
                                width: `${(campaign.registeredStudents / campaign.totalStudents) * 100}%`
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>
                          {getStatusText(campaign.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Icons.eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Icons.pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin chiến dịch</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên chiến dịch</Label>
                      <Input
                        id="name"
                        placeholder="Nhập tên chiến dịch"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Loại khám</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại khám" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            Khám tổng quát
                          </SelectItem>
                          <SelectItem value="specialized">
                            Khám chuyên khoa
                          </SelectItem>
                          <SelectItem value="screening">
                            Khám sàng lọc
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Ngày bắt đầu</Label>
                      <Input id="startDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Ngày kết thúc</Label>
                      <Input id="endDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Địa điểm</Label>
                      <Input
                        id="location"
                        placeholder="Nhập địa điểm khám"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetGroups">Đối tượng</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn đối tượng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả học sinh</SelectItem>
                          <SelectItem value="grade10">Khối 10</SelectItem>
                          <SelectItem value="grade11">Khối 11</SelectItem>
                          <SelectItem value="grade12">Khối 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      placeholder="Nhập mô tả chi tiết về chiến dịch"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="examinations">Danh mục khám</Label>
                    <Textarea
                      id="examinations"
                      placeholder="Nhập danh mục các hạng mục cần khám"
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Yêu cầu chuẩn bị</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Nhập các yêu cầu chuẩn bị trước khi khám"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Nút điều hướng */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Hủy
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <Icons.check className="mr-2 h-4 w-4" />
                      <span>Tạo chiến dịch</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </>
  );
}
