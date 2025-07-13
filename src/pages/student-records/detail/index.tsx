import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function StudentDetailPage() {
  const { id } = useParams();

  // Mock data for demonstration
  const student = {
    id: 1,
    name: 'Nguyễn Văn A',
    studentId: 'SV001',
    dateOfBirth: '15/06/2005',
    gender: 'Nam',
    class: '10A1',
    bloodType: 'A+',
    allergies: ['Hải sản', 'Đậu phộng'],
    chronicConditions: ['Hen suyễn'],
    emergencyContact: {
      name: 'Nguyễn Văn B',
      relation: 'Cha',
      phone: '0987654321'
    },
    medicalHistory: [
      {
        date: '10/01/2024',
        type: 'Khám định kỳ',
        description: 'Khám sức khỏe định kỳ học kỳ 1',
        doctor: 'BS. Trần Thị C'
      },
      {
        date: '15/12/2023',
        type: 'Tiêm chủng',
        description: 'Tiêm vaccine cúm mùa',
        doctor: 'BS. Lê Văn D'
      }
    ],
    medications: [
      {
        name: 'Ventolin',
        dosage: '2 nhát xịt',
        frequency: 'Khi cần thiết',
        startDate: '01/01/2024',
        endDate: 'Không xác định'
      }
    ]
  };

  return (
    <>
      <div className="space-y-6">
        {/* Thông tin cơ bản */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/images/avatars/student.jpg" />
                <AvatarFallback>
                  {student.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-sm text-gray-500">
                  Mã học sinh: {student.studentId}
                </p>
                <p className="text-sm text-gray-500">Lớp: {student.class}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Icons.pencil className="h-4 w-4" />
                <span>Chỉnh sửa</span>
              </Button>
              <Button variant="outline" className="gap-2">
                <Icons.post className="h-4 w-4" />
                <span>In hồ sơ</span>
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs thông tin chi tiết */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Thông tin chung</TabsTrigger>
            <TabsTrigger value="medical">Tiền sử bệnh</TabsTrigger>
            <TabsTrigger value="medications">Đơn thuốc</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-medium">Ngày sinh</p>
                  <p className="text-gray-500">{student.dateOfBirth}</p>
                </div>
                <div>
                  <p className="font-medium">Giới tính</p>
                  <p className="text-gray-500">{student.gender}</p>
                </div>
                <div>
                  <p className="font-medium">Nhóm máu</p>
                  <p className="text-gray-500">{student.bloodType}</p>
                </div>
                <div>
                  <p className="font-medium">Dị ứng</p>
                  <div className="flex flex-wrap gap-2">
                    {student.allergies.map((allergy, index) => (
                      <Badge key={index} variant="secondary">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium">Bệnh mãn tính</p>
                  <div className="flex flex-wrap gap-2">
                    {student.chronicConditions.map((condition, index) => (
                      <Badge key={index} variant="secondary">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ khẩn cấp</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-medium">Người liên hệ</p>
                  <p className="text-gray-500">
                    {student.emergencyContact.name}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Mối quan hệ</p>
                  <p className="text-gray-500">
                    {student.emergencyContact.relation}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Số điện thoại</p>
                  <p className="text-gray-500">
                    {student.emergencyContact.phone}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử khám bệnh</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Mô tả</TableHead>
                      <TableHead>Bác sĩ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.medicalHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{record.description}</TableCell>
                        <TableCell>{record.doctor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Đơn thuốc hiện tại</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên thuốc</TableHead>
                      <TableHead>Liều lượng</TableHead>
                      <TableHead>Tần suất</TableHead>
                      <TableHead>Ngày bắt đầu</TableHead>
                      <TableHead>Ngày kết thúc</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.medications.map((medication, index) => (
                      <TableRow key={index}>
                        <TableCell>{medication.name}</TableCell>
                        <TableCell>{medication.dosage}</TableCell>
                        <TableCell>{medication.frequency}</TableCell>
                        <TableCell>{medication.startDate}</TableCell>
                        <TableCell>{medication.endDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
