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
import { Link } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';

// Dữ liệu mẫu cho danh sách bài viết
const blogPosts = [
  {
    id: 1,
    title: 'Phòng ngừa bệnh mùa hè trong trường học',
    category: 'Y tế học đường',
    date: '15/06/2023',
    author: 'BS. Nguyễn Văn A',
    excerpt:
      'Các biện pháp phòng ngừa bệnh truyền nhiễm trong mùa hè và cách bảo vệ sức khỏe học sinh trong thời tiết nắng nóng...',
    image: '/images/blog/summer-health.jpg'
  },
  {
    id: 2,
    title: 'Dinh dưỡng học đường và sức khỏe',
    category: 'Dinh dưỡng',
    date: '10/06/2023',
    author: 'BS. Trần Thị B',
    excerpt:
      'Tầm quan trọng của chế độ dinh dưỡng cân bằng đối với sự phát triển thể chất và tinh thần của học sinh...',
    image: '/images/blog/nutrition.jpg'
  },
  {
    id: 3,
    title: 'Sơ cứu cơ bản trong trường học',
    category: 'Sơ cứu',
    date: '05/06/2023',
    author: 'BS. Lê Văn C',
    excerpt:
      'Hướng dẫn các kỹ thuật sơ cứu cơ bản dành cho giáo viên và nhân viên y tế học đường khi xảy ra tình huống khẩn cấp...',
    image: '/images/blog/first-aid.jpg'
  },
  {
    id: 4,
    title: 'Chăm sóc sức khỏe tâm lý cho học sinh',
    category: 'Tâm lý',
    date: '01/06/2023',
    author: 'ThS. Phạm Thị D',
    excerpt:
      'Các phương pháp nhận biết và hỗ trợ học sinh gặp vấn đề về sức khỏe tâm lý trong môi trường học đường...',
    image: '/images/blog/mental-health.jpg'
  }
];

export default function BlogPage() {
  return (
    <BasePages
      pageHead="Blog | Hệ thống quản lý y tế học đường"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Blog', link: '/blog' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">Blog sức khỏe học đường</h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Tìm kiếm bài viết..."
              className="w-full md:w-64"
            />
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Chủ đề" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chủ đề</SelectItem>
                <SelectItem value="school-health">Y tế học đường</SelectItem>
                <SelectItem value="nutrition">Dinh dưỡng</SelectItem>
                <SelectItem value="first-aid">Sơ cứu</SelectItem>
                <SelectItem value="mental-health">Sức khỏe tâm lý</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="text-sm">
                  Tác giả: {post.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-gray-600">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="gap-2">
                  <Link to={`/blog/${post.id}`}>
                    <span>Đọc tiếp</span>
                    <Icons.arrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" className="gap-2">
            <span>Xem thêm bài viết</span>
            <Icons.chevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </BasePages>
  );
}
