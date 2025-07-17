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
import { useGetBlogs } from '@/queries/blog.query';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const { data: blogs, isLoading } = useGetBlogs();
  return (
    <>
      <Helmet>
        <title>Trường THPT Chu Văn An | Hệ thống quản lý y tế học đường</title>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-bold text-blue-900 md:text-5xl">
                Trường THPT Chu Văn An
              </h1>
              <p className="mb-6 text-lg text-gray-600">
                Hệ thống quản lý y tế học đường - Chăm sóc sức khỏe toàn diện
                cho hơn 2000 học sinh của ngôi trường truyền thống 115 năm tuổi.
                Nâng cao chất lượng giáo dục thông qua việc đảm bảo sức khỏe thể
                chất và tinh thần cho thế hệ tương lai.
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
                  <a href="#resources" className="scroll-smooth">
                    Tài nguyên y tế
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <img
                src="/images/Logo_THPT_Chu_Van_An.jpg"
                alt="School Medical Management"
                className="h-auto w-[250px] rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* School Information Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-900">
            Giới thiệu về trường THPT Chu Văn An
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-blue-800">
                Tầm nhìn & Sứ mệnh
              </h3>
              <p className="mb-6 text-gray-600">
                Trường THPT Chu Văn An, thành lập năm 1908, là một trong những
                trường THPT lâu đời và có truyền thống nhất tại Hà Nội. Với
                phương châm "Tiến đức - Luyện tài", nhà trường không chỉ chú
                trọng đào tạo kiến thức mà còn đặc biệt quan tâm đến sức khỏe
                thể chất và tinh thần của học sinh.
              </p>
              <div className="mb-6 rounded-lg bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-blue-800">
                  Thống kê y tế trường học
                </h4>
                <ul className="list-inside list-disc text-gray-600">
                  <li>Phục vụ 2000+ học sinh và 200+ cán bộ, giáo viên</li>
                  <li>
                    Đội ngũ y tế chuyên trách 24/7 (3 y bác sĩ thường trực)
                  </li>
                  <li>Phòng y tế 150m² với trang thiết bị hiện đại</li>
                  <li>100% học sinh được khám sức khỏe định kỳ 2 lần/năm</li>
                  <li>Tỷ lệ tiêm chủng đạt 99.8% năm học 2023-2024</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <img
                src="/images/school-facility.jpg"
                alt="Cơ sở vật chất trường THPT Chu Văn An"
                className="h-64 w-full rounded-lg object-cover shadow-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/medical-room.jpg"
                  alt="Phòng y tế trường THPT Chu Văn An"
                  className="h-40 w-full rounded-lg object-cover shadow-lg"
                />
                <img
                  src="/images/student-checkup.jpg"
                  alt="Khám sức khỏe định kỳ cho học sinh"
                  className="h-40 w-full rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-900">
            Dịch vụ y tế học đường
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Hồ sơ sức khỏe học sinh</CardTitle>
                <CardDescription>
                  Quản lý thông tin sức khỏe chi tiết cho từng em
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Theo dõi toàn diện về dị ứng, tiền sử bệnh, chỉ số phát triển,
                  thị lực, thính lực và lịch sử tiêm chủng của 2000+ học sinh
                  qua hệ thống điện tử.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chăm sóc y tế thường ngày</CardTitle>
                <CardDescription>
                  Đội ngũ y tế chuyên trách 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Xử lý kịp thời các sự cố y tế, từ những tình huống nhẹ như
                  sốt, đau đầu đến các trường hợp khẩn cấp. Phối hợp chặt chẽ
                  với Bệnh viện Đại học Y Hà Nội trong các ca cần thiết.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chương trình y tế định kỳ</CardTitle>
                <CardDescription>Chăm sóc sức khỏe có kế hoạch</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Tổ chức khám sức khỏe định kỳ 2 lần/năm, tiêm chủng theo
                  chương trình quốc gia, và các hoạt động giáo dục sức khỏe
                  thường xuyên cho học sinh.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Health Resources Section */}
      <section id="resources" className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-900">
            Tài liệu y tế trường học
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Hướng dẫn y tế</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Quy trình xử lý tai nạn học đường</li>
                  <li>Phòng chống dịch COVID-19</li>
                  <li>Chế độ dinh dưỡng cho học sinh</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost">
                  <Link to="/resources/guidelines">Xem thêm</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biểu mẫu y tế</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Sổ khám sức khỏe định kỳ</li>
                  <li>Đơn xin nghỉ ốm có xác nhận</li>
                  <li>Phiếu theo dõi tiêm chủng</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost">
                  <Link to="/resources/forms">Xem thêm</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quy định & Chính sách</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Nội quy phòng y tế trường</li>
                  <li>Quy định bảo hiểm y tế học sinh</li>
                  <li>Chính sách hỗ trợ y tế đặc biệt</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost">
                  <Link to="/resources/policies">Xem thêm</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tài liệu tham khảo</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Cẩm nang sức khỏe học đường</li>
                  <li>Tài liệu giáo dục giới tính</li>
                  <li>Hướng dẫn sơ cấp cứu cơ bản</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost">
                  <Link to="/resources/library">Xem thêm</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-900">
            Tin tức & Hoạt động y tế
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              blogs?.items.slice(0, 3).map((blog) => (
                <Card key={blog.blogId}>
                  <CardHeader>
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={blog.thumbnailUrl}
                        alt={blog.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-4 flex justify-between gap-2">
                      <CardTitle>{blog.title}</CardTitle>
                      <CardDescription>
                        {blog.publishAt
                          ? new Date(blog.publishAt).toLocaleDateString(
                              'vi-VN',
                              {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              }
                            )
                          : 'Không có ngày'}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {blog.tags.split(',').map((tag) => (
                        <Badge variant="secondary" key={tag}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">
                      {blog.description ?? 'Không có mô tả'}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost">
                      <Link to={`/blog/${blog.blogId}`}>Đọc tiếp</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/blog">Xem tất cả tin tức</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Cùng chăm sóc sức khỏe cho con em chúng ta
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Hệ thống quản lý y tế trường THPT Chu Văn An giúp phụ huynh và nhà
            trường theo dõi sát sao sức khỏe của các em, đảm bảo một môi trường
            học tập khỏe mạnh và an toàn.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-900 hover:bg-gray-100"
          >
            <Link to="/dashboard">Truy cập hệ thống</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
