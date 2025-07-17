import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useCreateMedicalEvent } from '@/queries/medical-events.query';
import { useGetSchoolNurses } from '@/queries/school-nurse.query';
import { useGetStudents } from '@/queries/student.query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import __helpers from '@/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// Define event types based on the backend enum
const eventTypes = [
  { value: '0', label: 'Tai nạn (Accident)' },
  { value: '1', label: 'Té ngã (Fall)' },
  { value: '2', label: 'Sốt (Fever)' },
  { value: '3', label: 'Bệnh khác (Illness)' },
  { value: '4', label: 'Dịch bệnh (InfectiousDisease)' },
  { value: '5', label: 'Chấn thương (Injury)' },
  { value: '6', label: 'Đã cho dùng thuốc (MedicationGiven)' },
  { value: '7', label: 'Khác (Other)' }
];

export default function AddMedicalEventPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createMedicalEvent = useCreateMedicalEvent();
  const role = __helpers.cookie_get('R');
  const auth = useSelector((state: RootState) => state.auth);

  // Fetch students and nurses for dropdowns
  const { data: studentsData, isLoading: isLoadingStudents } = useGetStudents(
    1,
    100
  );
  const { data: nursesData, isLoading: isLoadingNurses } = useGetSchoolNurses(
    1,
    100
  );

  const [formData, setFormData] = useState({
    studentId: '',
    eventType: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    handledBy: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      if (!formData.studentId || !formData.eventType || !formData.date) {
        toast({
          title: 'Lỗi',
          description: 'Vui lòng điền đầy đủ thông tin bắt buộc',
          variant: 'destructive'
        });
        return;
      }

      // Convert form data to the expected format
      const payload = {
        studentId: parseInt(formData.studentId),
        eventType: parseInt(formData.eventType),
        description: formData.description,
        date: new Date(formData.date),
        handledBy: formData.handledBy ? parseInt(formData.handledBy) : undefined
      };

      await createMedicalEvent.mutateAsync(payload);

      toast({
        title: 'Thành công',
        description: 'Đã tạo sự kiện y tế mới'
      });

      navigate('/dashboard/medical-events');
    } catch (error) {
      console.error('Error creating medical event:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể tạo sự kiện y tế. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    }
  };

  const isLoading =
    isLoadingStudents || isLoadingNurses || createMedicalEvent.isPending;

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <CardTitle className="text-teal-900">Thêm sự kiện y tế mới</CardTitle>
        <Button asChild variant="outline">
          <Link to="/dashboard/medical-events">
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="studentId"
                className="text-sm font-medium text-gray-700"
              >
                Học sinh <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.studentId}
                onValueChange={(value) =>
                  handleSelectChange('studentId', value)
                }
                disabled={isLoadingStudents}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn học sinh" />
                </SelectTrigger>
                <SelectContent>
                  {studentsData?.items
                    ?.filter((student) => {
                      if (role === 'Parent') {
                        return student.parentId === auth.userInfo.accountId;
                      }
                      return true;
                    })
                    .map((student) => (
                      <SelectItem
                        key={student.studentId}
                        value={student.studentId?.toString()}
                      >
                        {student.fullName} - {student.className}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="eventType"
                className="text-sm font-medium text-gray-700"
              >
                Loại sự kiện <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.eventType}
                onValueChange={(value) =>
                  handleSelectChange('eventType', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại sự kiện" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type, index) => (
                    <SelectItem key={index} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Ngày xảy ra <span className="text-red-500">*</span>
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="handledBy"
                className="text-sm font-medium text-gray-700"
              >
                Người xử lý
              </label>
              <Select
                value={formData.handledBy}
                onValueChange={(value) =>
                  handleSelectChange('handledBy', value)
                }
                disabled={isLoadingNurses}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn y tá xử lý" />
                </SelectTrigger>
                <SelectContent>
                  {nursesData?.items?.map((nurse, index) => (
                    <SelectItem key={index} value={nurse.nurseId?.toString()}>
                      {nurse.account.accountInfo.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Mô tả
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Nhập mô tả chi tiết về sự kiện y tế"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/medical-events')}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                'Lưu sự kiện'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
