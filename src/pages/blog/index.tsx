import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Kế hoạch khám sức khỏe định kỳ học kỳ II năm 2024',
      description:
        'Nhà trường tổ chức khám sức khỏe định kỳ cho học sinh từ ngày 01/03 đến 15/03/2024. Xem lịch khám chi tiết theo từng lớp...',
      date: '20/02/2024',
      category: 'Thông báo chính thức',
      image: '/images/student-checkup.jpg'
    },
    {
      id: 2,
      title: 'Hướng dẫn phòng chống cúm mùa trong trường học',
      description:
        'Trước tình hình dịch cúm mùa đang gia tăng, phòng y tế trường hướng dẫn các biện pháp phòng ngừa hiệu quả...',
      date: '15/02/2024',
      category: 'Y tế dự phòng',
      image: '/images/student-checkup.jpg'
    },
    {
      id: 3,
      title: 'Kết quả khảo sát dinh dưỡng học đường 2023',
      description:
        'Tổng hợp kết quả khảo sát thói quen ăn uống và tình trạng dinh dưỡng của học sinh năm học 2023-2024...',
      date: '10/02/2024',
      category: 'Báo cáo y tế',
      image: '/images/student-checkup.jpg'
    },
    {
      id: 4,
      title: 'Chương trình tư vấn tâm lý học đường',
      description:
        'Phòng Y tế phối hợp với các chuyên gia tâm lý tổ chức các buổi tư vấn cho học sinh về các vấn đề tâm lý lứa tuổi...',
      date: '05/02/2024',
      category: 'Sức khỏe tâm lý',
      image: '/images/student-checkup.jpg'
    },
    {
      id: 5,
      title: 'Kết quả tiêm vắc xin phòng COVID-19 mũi nhắc lại',
      description:
        'Báo cáo kết quả chiến dịch tiêm vắc xin phòng COVID-19 mũi nhắc lại cho học sinh và cán bộ giáo viên...',
      date: '01/02/2024',
      category: 'Tiêm chủng',
      image: '/images/student-checkup.jpg'
    },
    {
      id: 6,
      title: 'Hướng dẫn chế độ dinh dưỡng mùa thi',
      description:
        'Bác sĩ dinh dưỡng chia sẻ những lưu ý về chế độ ăn uống khoa học giúp học sinh duy trì sức khỏe trong mùa thi...',
      date: '25/01/2024',
      category: 'Dinh dưỡng',
      image: '/images/student-checkup.jpg'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tin tức & Hoạt động y tế | THPT Chu Văn An</title>
      </Helmet>

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-900">
              Tin tức & Hoạt động y tế
            </h2>
            <p className="mt-2 text-gray-600">
              Cập nhật thông tin mới nhất về các hoạt động y tế của trường THPT
              Chu Văn An
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-blue-600">
                      <Tag className="h-4 w-4" />
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-blue-600">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="ghost" className="ml-auto">
                    <Link to={`/blog/${post.id}`}>
                      Đọc tiếp
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
