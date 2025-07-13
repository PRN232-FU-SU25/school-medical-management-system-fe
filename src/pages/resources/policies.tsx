import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AlertCircle, ArrowRight, Download, ScrollText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function PoliciesPage() {
  const policies = [
    {
      title: 'Nội quy phòng y tế trường',
      description: 'Quy định về hoạt động và sử dụng dịch vụ y tế trong trường',
      type: 'Quy định chung',
      highlights: [
        'Giờ làm việc: 7:00 - 17:30 các ngày trong tuần',
        'Quy trình khám và cấp thuốc',
        'Quy định về nghỉ ốm',
        'Xử lý tình huống khẩn cấp'
      ],
      importantNotes: [
        'Luôn có ít nhất 1 y bác sĩ trực',
        'Số điện thoại khẩn: 0123.456.789'
      ],
      downloadUrl: '/documents/policies/medical-room-rules.pdf'
    },
    {
      title: 'Quy định bảo hiểm y tế học sinh',
      description: 'Hướng dẫn về quyền lợi và thủ tục bảo hiểm y tế',
      type: 'Bảo hiểm',
      highlights: [
        'Phạm vi bảo hiểm',
        'Quy trình thanh toán',
        'Danh sách bệnh viện liên kết',
        'Thủ tục hoàn phí'
      ],
      importantNotes: [
        'Bảo hiểm bắt buộc với mọi học sinh',
        'Gia hạn trước 30/09 hàng năm'
      ],
      downloadUrl: '/documents/policies/insurance-policy.pdf'
    },
    {
      title: 'Chính sách hỗ trợ y tế đặc biệt',
      description: 'Quy định về hỗ trợ học sinh có hoàn cảnh đặc biệt',
      type: 'Hỗ trợ',
      highlights: [
        'Đối tượng được hỗ trợ',
        'Mức hỗ trợ tài chính',
        'Thủ tục đăng ký',
        'Thời gian xét duyệt'
      ],
      importantNotes: [
        'Ưu tiên học sinh hoàn cảnh khó khăn',
        'Xét duyệt 2 lần/năm học'
      ],
      downloadUrl: '/documents/policies/special-support.pdf'
    },
    {
      title: 'Quy định về dịch vụ y tế học đường',
      description: 'Chính sách về các dịch vụ y tế trong trường học',
      type: 'Dịch vụ',
      highlights: [
        'Khám sức khỏe định kỳ',
        'Tiêm chủng theo chương trình',
        'Tư vấn sức khỏe',
        'Chăm sóc khẩn cấp'
      ],
      importantNotes: [
        'Miễn phí với các dịch vụ cơ bản',
        'Đăng ký trước với dịch vụ chuyên sâu'
      ],
      downloadUrl: '/documents/policies/medical-services.pdf'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Quy định & Chính sách y tế | THPT Chu Văn An</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">
            Quy định & Chính sách y tế
          </h1>
          <p className="mt-2 text-gray-600">
            Các quy định và chính sách y tế của trường THPT Chu Văn An
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {policies.map((policy, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {policy.type}
                  </span>
                </div>
                <CardTitle className="mt-3 flex items-center gap-2">
                  <ScrollText className="h-5 w-5" />
                  {policy.title}
                </CardTitle>
                <CardDescription>{policy.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Nội dung chính:</h3>
                    <ul className="list-inside list-disc space-y-1">
                      {policy.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-gray-600">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-3">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-yellow-800">
                      <AlertCircle className="h-4 w-4" />
                      Lưu ý quan trọng:
                    </h3>
                    <ul className="list-inside list-disc space-y-1">
                      {policy.importantNotes.map((note, idx) => (
                        <li key={idx} className="text-yellow-800">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <a href={policy.downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={`/policies/${index + 1}`}>
                    Chi tiết
                    <ArrowRight className="ml-2 h-4 w-4" />
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
