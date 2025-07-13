import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MedicalEventDetailPage() {
  const { id } = useParams();

  // Mock data for demonstration
  const event = {
    id: 1,
    title: 'Tai nạn trong giờ thể dục',
    type: 'accident',
    date: '15/01/2024 09:30',
    location: 'Sân thể dục trường',
    description:
      'Học sinh bị trượt chân và ngã trong quá trình chạy bộ, dẫn đến bong gân cổ chân phải.',
    status: 'resolved',
    student: {
      id: 'SV001',
      name: 'Nguyễn Văn A',
      class: '10A1',
      image: '/images/avatars/student.jpg'
    },
    handledBy: {
      name: 'BS. Trần Thị B',
      role: 'Y tá trường',
      image: '/images/avatars/doctor.jpg'
    },
    actions: [
      {
        time: '09:35',
        description: 'Sơ cứu ban đầu tại chỗ',
        by: 'BS. Trần Thị B'
      },
      {
        time: '09:40',
        description: 'Chuyển học sinh đến phòng y tế',
        by: 'BS. Trần Thị B'
      },
      {
        time: '09:45',
        description: 'Băng bó và xử lý vết thương',
        by: 'BS. Trần Thị B'
      },
      {
        time: '10:00',
        description: 'Liên hệ phụ huynh',
        by: 'Cô Nguyễn Thị C'
      }
    ],
    notes:
      'Học sinh đã được xử lý kịp thời và theo dõi trong 2 giờ tại phòng y tế. Phụ huynh đã đến đón và đưa học sinh đi khám chuyên khoa.'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'monitoring':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'accident':
        return 'bg-orange-100 text-orange-800';
      case 'illness':
        return 'bg-purple-100 text-purple-800';
      case 'injury':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Thông tin cơ bản */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <div className="flex items-center gap-2">
                <Badge className={getTypeColor(event.type)}>
                  {event.type === 'accident' && 'Tai nạn'}
                  {event.type === 'emergency' && 'Cấp cứu'}
                  {event.type === 'illness' && 'Bệnh tật'}
                  {event.type === 'injury' && 'Chấn thương'}
                  {event.type === 'other' && 'Khác'}
                </Badge>
                <Badge className={getStatusColor(event.status)}>
                  {event.status === 'pending' && 'Đang xử lý'}
                  {event.status === 'resolved' && 'Đã xử lý'}
                  {event.status === 'monitoring' && 'Đang theo dõi'}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Icons.pencil className="h-4 w-4" />
                <span>Chỉnh sửa</span>
              </Button>
              <Button variant="outline" className="gap-2">
                <Icons.post className="h-4 w-4" />
                <span>In báo cáo</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="font-medium">Thời gian xảy ra</p>
                <p className="text-gray-500">{event.date}</p>
              </div>
              <div>
                <p className="font-medium">Địa điểm</p>
                <p className="text-gray-500">{event.location}</p>
              </div>
            </div>
            <div>
              <p className="font-medium">Mô tả chi tiết</p>
              <p className="text-gray-500">{event.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Thông tin học sinh */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin học sinh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={event.student.image} />
                <AvatarFallback>
                  {event.student.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{event.student.name}</h3>
                <p className="text-gray-500">
                  Mã học sinh: {event.student.id} | Lớp: {event.student.class}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thông tin xử lý */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin xử lý</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={event.handledBy.image} />
                <AvatarFallback>
                  {event.handledBy.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{event.handledBy.name}</p>
                <p className="text-sm text-gray-500">{event.handledBy.role}</p>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-medium">Các hành động đã thực hiện</h4>
              <div className="relative space-y-4 border-l pl-4">
                {event.actions.map((action, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[21px] h-3 w-3 rounded-full bg-blue-500" />
                    <p className="text-sm text-gray-500">{action.time}</p>
                    <p className="font-medium">{action.description}</p>
                    <p className="text-sm text-gray-500">
                      Thực hiện: {action.by}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Ghi chú</h4>
              <p className="text-gray-500">{event.notes}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
