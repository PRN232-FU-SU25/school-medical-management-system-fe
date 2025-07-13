import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function FormsPage() {
  const forms = [
    {
      title: 'Sổ khám sức khỏe định kỳ',
      description: 'Mẫu sổ theo dõi sức khỏe định kỳ cho học sinh',
      details: [
        'Thông tin cá nhân học sinh',
        'Lịch sử bệnh tật',
        'Kết quả khám định kỳ',
        'Đánh giá của bác sĩ'
      ],
      fileType: 'PDF',
      downloadUrl: '/documents/forms/health-record-book.pdf'
    },
    {
      title: 'Đơn xin nghỉ ốm có xác nhận',
      description: 'Mẫu đơn xin nghỉ học có xác nhận của phụ huynh và y tế',
      details: [
        'Thông tin học sinh',
        'Lý do nghỉ ốm',
        'Thời gian nghỉ',
        'Chữ ký xác nhận'
      ],
      fileType: 'DOCX',
      downloadUrl: '/documents/forms/sick-leave.docx'
    },
    {
      title: 'Phiếu theo dõi tiêm chủng',
      description: 'Mẫu phiếu theo dõi lịch sử và kế hoạch tiêm chủng',
      details: [
        'Thông tin cá nhân',
        'Lịch sử tiêm chủng',
        'Phản ứng sau tiêm',
        'Lịch tiêm tiếp theo'
      ],
      fileType: 'PDF',
      downloadUrl: '/documents/forms/vaccination-record.pdf'
    },
    {
      title: 'Giấy chuyển viện',
      description: 'Mẫu giấy chuyển viện trong trường hợp khẩn cấp',
      details: [
        'Thông tin bệnh nhân',
        'Tình trạng hiện tại',
        'Lý do chuyển viện',
        'Bệnh viện tiếp nhận'
      ],
      fileType: 'PDF',
      downloadUrl: '/documents/forms/hospital-transfer.pdf'
    },
    {
      title: 'Phiếu khám sức khỏe nhập học',
      description: 'Mẫu phiếu khám sức khỏe bắt buộc khi nhập học',
      details: [
        'Thông tin học sinh',
        'Kết quả khám tổng quát',
        'Xét nghiệm cơ bản',
        'Kết luận sức khỏe'
      ],
      fileType: 'PDF',
      downloadUrl: '/documents/forms/entrance-health-check.pdf'
    },
    {
      title: 'Báo cáo tai nạn học đường',
      description: 'Mẫu báo cáo chi tiết khi xảy ra tai nạn trong trường',
      details: [
        'Thông tin sự việc',
        'Người liên quan',
        'Biện pháp xử lý',
        'Kiến nghị phòng ngừa'
      ],
      fileType: 'DOCX',
      downloadUrl: '/documents/forms/accident-report.docx'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Biểu mẫu y tế | THPT Chu Văn An</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Biểu mẫu y tế</h1>
          <p className="mt-2 text-gray-600">
            Tất cả các biểu mẫu y tế cần thiết cho học sinh và phụ huynh trường
            THPT Chu Văn An
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {form.title}
                </CardTitle>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  {form.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-600">
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    {form.fileType}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <a href={form.downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
