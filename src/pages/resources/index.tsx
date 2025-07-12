import BasePages from '@/components/shared/base-pages';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

// Dữ liệu mẫu cho danh sách tài liệu
const resources = [
  {
    id: 1,
    title: 'Sổ tay sơ cấp cứu trong trường học',
    category: 'Tài liệu hướng dẫn',
    type: 'PDF',
    size: '2.5 MB',
    date: '15/06/2023',
    description:
      'Hướng dẫn chi tiết các kỹ thuật sơ cấp cứu cơ bản và xử lý các tình huống khẩn cấp trong môi trường học đường.'
  },
  {
    id: 2,
    title: 'Quy trình kiểm tra sức khỏe định kỳ',
    category: 'Quy trình & Biểu mẫu',
    type: 'DOCX',
    size: '1.8 MB',
    date: '10/06/2023',
    description:
      'Tài liệu hướng dẫn quy trình kiểm tra sức khỏe định kỳ cho học sinh, bao gồm các biểu mẫu cần thiết.'
  },
  {
    id: 3,
    title: 'Poster phòng chống dịch bệnh',
    category: 'Tài liệu truyền thông',
    type: 'PNG',
    size: '5.2 MB',
    date: '05/06/2023',
    description:
      'Bộ poster tuyên truyền về các biện pháp phòng chống dịch bệnh trong trường học, phù hợp cho việc treo tại các lớp học.'
  },
  {
    id: 4,
    title: 'Hướng dẫn dinh dưỡng học đường',
    category: 'Tài liệu hướng dẫn',
    type: 'PDF',
    size: '3.1 MB',
    date: '01/06/2023',
    description:
      'Tài liệu hướng dẫn về chế độ dinh dưỡng cân bằng và lành mạnh cho học sinh các cấp.'
  }
];

export default function ResourcesPage() {
  return (
    <BasePages
      pageHead="Tài nguyên y tế | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Tài nguyên y tế', link: '/resources' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">Tài nguyên y tế</h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Tìm kiếm tài liệu..."
              className="w-full md:w-64"
            />
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Phân loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả tài liệu</SelectItem>
                <SelectItem value="guide">Tài liệu hướng dẫn</SelectItem>
                <SelectItem value="form">Quy trình & Biểu mẫu</SelectItem>
                <SelectItem value="media">Tài liệu truyền thông</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icons.fileType className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-500">
                      {resource.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{resource.date}</span>
                    <span>•</span>
                    <span>{resource.size}</span>
                  </div>
                </div>
                <CardTitle className="mt-2">{resource.title}</CardTitle>
                <CardDescription>{resource.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{resource.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  <Icons.eye className="h-4 w-4" />
                  <span>Xem trước</span>
                </Button>
                <Button className="gap-2">
                  <Icons.download className="h-4 w-4" />
                  <span>Tải xuống</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" className="gap-2">
            <span>Xem thêm tài liệu</span>
            <Icons.chevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </BasePages>
  );
}
