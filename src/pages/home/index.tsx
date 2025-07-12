import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Trang chủ | Hệ thống quản lý y tế học đường</title>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-bold text-blue-900 md:text-5xl">
                Hệ thống quản lý y tế học đường
              </h1>
              <p className="mb-6 text-lg text-gray-600">
                Giải pháp toàn diện cho việc quản lý sức khỏe học sinh, tiêm
                chủng, kiểm tra y tế và xử lý các sự kiện y tế trong môi trường
                học đường.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Link to="/dashboard">Đăng nhập hệ thống</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/resources">Tài nguyên y tế</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="/images/hero-image.svg"
                alt="School Medical Management"
                className="h-auto w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-900">
            Tính năng chính
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Hồ sơ sức khỏe học sinh</CardTitle>
                <CardDescription>
                  Quản lý thông tin sức khỏe toàn diện
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Lưu trữ và quản lý thông tin về dị ứng, bệnh mãn tính, tiền sử
                  điều trị, thị lực, thính lực và lịch sử tiêm chủng của học
                  sinh.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quản lý sự kiện y tế</CardTitle>
                <CardDescription>
                  Xử lý các tình huống y tế tại trường
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Ghi nhận và xử lý các sự kiện y tế như tai nạn, sốt, té ngã,
                  dịch bệnh và các tình huống khẩn cấp khác.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tiêm chủng và kiểm tra y tế</CardTitle>
                <CardDescription>
                  Quản lý các chiến dịch y tế tại trường
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Tổ chức và quản lý các chiến dịch tiêm chủng và kiểm tra y tế
                  định kỳ, từ lập kế hoạch đến theo dõi kết quả.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-900">
            Bài viết mới nhất
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Blog posts would be mapped here */}
            <Card>
              <CardHeader>
                <CardTitle>Phòng ngừa bệnh mùa hè trong trường học</CardTitle>
                <CardDescription>15/06/2023 • Y tế học đường</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">
                  Các biện pháp phòng ngừa bệnh truyền nhiễm trong mùa hè và
                  cách bảo vệ sức khỏe học sinh trong thời tiết nắng nóng...
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost">
                  <Link to="/blog/1">Đọc tiếp</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dinh dưỡng học đường và sức khỏe</CardTitle>
                <CardDescription>10/06/2023 • Dinh dưỡng</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">
                  Tầm quan trọng của chế độ dinh dưỡng cân bằng đối với sự phát
                  triển thể chất và tinh thần của học sinh...
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost">
                  <Link to="/blog/2">Đọc tiếp</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sơ cứu cơ bản trong trường học</CardTitle>
                <CardDescription>05/06/2023 • Sơ cứu</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">
                  Hướng dẫn các kỹ thuật sơ cứu cơ bản dành cho giáo viên và
                  nhân viên y tế học đường khi xảy ra tình huống khẩn cấp...
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost">
                  <Link to="/blog/3">Đọc tiếp</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/blog">Xem tất cả bài viết</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Sẵn sàng nâng cao chất lượng y tế học đường?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Hệ thống quản lý y tế học đường giúp nhà trường và phụ huynh theo
            dõi sức khỏe học sinh một cách hiệu quả và toàn diện.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-900 hover:bg-gray-100"
          >
            <Link to="/dashboard">Bắt đầu ngay</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
