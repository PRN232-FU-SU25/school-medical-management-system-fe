import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Book, Download, FileVideo, Newspaper, PlayCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function LibraryPage() {
  const resources = [
    {
      title: 'Cẩm nang sức khỏe học đường',
      description: 'Tài liệu tổng hợp về chăm sóc sức khỏe trong trường học',
      type: 'book',
      author: 'Phòng Y tế - THPT Chu Văn An',
      publishDate: '2024',
      format: 'PDF',
      size: '2.5 MB',
      chapters: [
        'Dinh dưỡng học đường',
        'Vệ sinh cá nhân',
        'Phòng chống dịch bệnh',
        'Sức khỏe tâm lý'
      ],
      downloadUrl: '/documents/library/school-health-guide.pdf'
    },
    {
      title: 'Tài liệu giáo dục giới tính',
      description: 'Hướng dẫn giáo dục giới tính phù hợp lứa tuổi học sinh',
      type: 'book',
      author: 'TS. Nguyễn Văn A - Chuyên gia tâm lý',
      publishDate: '2023',
      format: 'PDF',
      size: '1.8 MB',
      chapters: [
        'Phát triển cơ thể tuổi dậy thì',
        'Tâm sinh lý tuổi học sinh',
        'Kỹ năng tự bảo vệ',
        'Mối quan hệ lành mạnh'
      ],
      downloadUrl: '/documents/library/sex-education.pdf'
    },
    {
      title: 'Hướng dẫn sơ cấp cứu cơ bản',
      description: 'Video hướng dẫn các kỹ thuật sơ cấp cứu cơ bản',
      type: 'video',
      author: 'BS. Trần Thị B - Bệnh viện Đại học Y Hà Nội',
      duration: '45 phút',
      format: 'MP4',
      size: '350 MB',
      chapters: [
        'Đánh giá tình trạng nạn nhân',
        'Hồi sức tim phổi',
        'Xử lý vết thương',
        'Sơ cứu gãy xương'
      ],
      videoUrl: '/videos/first-aid-guide.mp4'
    },
    {
      title: 'Bản tin sức khỏe học đường',
      description: 'Tập san điện tử về các vấn đề sức khỏe học đường',
      type: 'magazine',
      author: 'Ban biên tập Y tế trường THPT Chu Văn An',
      publishDate: 'Số tháng 2/2024',
      format: 'PDF',
      size: '5 MB',
      articles: [
        'Phòng chống cận thị học đường',
        'Chế độ ăn mùa thi',
        'Hoạt động thể chất phù hợp',
        'Tư vấn tâm lý học đường'
      ],
      downloadUrl: '/documents/library/health-newsletter-022024.pdf'
    },
    {
      title: 'Kỹ năng quản lý stress học tập',
      description: 'Video hướng dẫn các kỹ thuật giảm stress cho học sinh',
      type: 'video',
      author: 'ThS. Lê Thị C - Chuyên gia tâm lý',
      duration: '30 phút',
      format: 'MP4',
      size: '250 MB',
      chapters: [
        'Nhận diện dấu hiệu stress',
        'Kỹ thuật thư giãn',
        'Phương pháp học tập hiệu quả',
        'Cân bằng học tập và nghỉ ngơi'
      ],
      videoUrl: '/videos/stress-management.mp4'
    },
    {
      title: 'Tài liệu phòng chống tai nạn thương tích',
      description: 'Hướng dẫn phòng tránh và xử lý tai nạn trong trường học',
      type: 'book',
      author: 'Ban An toàn trường học',
      publishDate: '2024',
      format: 'PDF',
      size: '3 MB',
      chapters: [
        'An toàn trong phòng thí nghiệm',
        'An toàn khi hoạt động thể thao',
        'Phòng tránh tai nạn giao thông',
        'Xử lý tình huống khẩn cấp'
      ],
      downloadUrl: '/documents/library/accident-prevention.pdf'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book className="h-5 w-5" />;
      case 'video':
        return <FileVideo className="h-5 w-5" />;
      case 'magazine':
        return <Newspaper className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Thư viện tài liệu | THPT Chu Văn An</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">
            Thư viện tài liệu y tế
          </h1>
          <p className="mt-2 text-gray-600">
            Kho tài liệu tham khảo về sức khỏe học đường dành cho học sinh, phụ
            huynh và giáo viên
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {resource.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {resource.format}
                  </span>
                </div>
                <CardTitle className="mt-3 flex items-center gap-2">
                  {getIcon(resource.type)}
                  {resource.title}
                </CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-500">
                    <p>Tác giả: {resource.author}</p>
                    {resource.publishDate && (
                      <p>Xuất bản: {resource.publishDate}</p>
                    )}
                    {resource.duration && (
                      <p>Thời lượng: {resource.duration}</p>
                    )}
                    <p>Dung lượng: {resource.size}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">
                      {resource.type === 'magazine'
                        ? 'Các bài viết:'
                        : 'Nội dung chính:'}
                    </h3>
                    <ul className="list-inside list-disc space-y-1">
                      {(resource.chapters || resource.articles)?.map(
                        (item, idx) => (
                          <li key={idx} className="text-gray-600">
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {resource.type === 'video' ? (
                  <Button asChild>
                    <a href={resource.videoUrl}>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Xem video
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="outline">
                    <a href={resource.downloadUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Tải xuống
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
