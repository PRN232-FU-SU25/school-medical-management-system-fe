import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function GuidelinesPage() {
  const guidelines = [
    {
      title: 'Quy trình xử lý tai nạn học đường',
      description:
        'Hướng dẫn chi tiết các bước xử lý khi có tai nạn xảy ra trong trường học',
      sections: [
        'Đánh giá mức độ khẩn cấp',
        'Sơ cứu ban đầu',
        'Liên hệ phụ huynh và y tế',
        'Theo dõi và báo cáo'
      ],
      downloadUrl: '/documents/guidelines/accident-handling.pdf'
    },
    {
      title: 'Phòng chống dịch COVID-19',
      description:
        'Các biện pháp phòng ngừa và xử lý ca nhiễm COVID-19 trong trường học',
      sections: [
        'Kiểm tra thân nhiệt hàng ngày',
        'Quy định đeo khẩu trang',
        'Vệ sinh và khử khuẩn',
        'Quy trình cách ly F0, F1'
      ],
      downloadUrl: '/documents/guidelines/covid-prevention.pdf'
    },
    {
      title: 'Chế độ dinh dưỡng cho học sinh',
      description: 'Hướng dẫn về chế độ ăn uống lành mạnh cho học sinh THPT',
      sections: [
        'Thực đơn cân bằng dinh dưỡng',
        'Định lượng khẩu phần ăn',
        'Thực phẩm nên tránh',
        'Bữa ăn phụ và đồ uống'
      ],
      downloadUrl: '/documents/guidelines/nutrition-guide.pdf'
    },
    {
      title: 'Quy trình sơ cấp cứu cơ bản',
      description: 'Hướng dẫn các kỹ thuật sơ cấp cứu cơ bản trong trường học',
      sections: [
        'Xử lý chảy máu và vết thương',
        'Sơ cứu gãy xương',
        'Hồi sức tim phổi cơ bản',
        'Xử lý bỏng và điện giật'
      ],
      downloadUrl: '/documents/guidelines/first-aid.pdf'
    },
    {
      title: 'Quy trình khám sức khỏe định kỳ',
      description: 'Hướng dẫn về quy trình khám sức khỏe định kỳ cho học sinh',
      sections: [
        'Chuẩn bị hồ sơ khám',
        'Các hạng mục khám',
        'Đánh giá kết quả',
        'Lưu trữ hồ sơ'
      ],
      downloadUrl: '/documents/guidelines/health-checkup.pdf'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Hướng dẫn y tế | THPT Chu Văn An</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Hướng dẫn y tế</h1>
          <p className="mt-2 text-gray-600">
            Tài liệu hướng dẫn chi tiết về các quy trình y tế tại trường THPT
            Chu Văn An
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {guidelines.map((guide, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  {guide.sections.map((section, idx) => (
                    <li key={idx} className="text-gray-600">
                      {section}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <a href={guide.downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống PDF
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
