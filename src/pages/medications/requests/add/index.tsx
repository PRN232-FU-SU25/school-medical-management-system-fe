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
import { useToast } from '@/components/ui/use-toast';
import {
  MedicationItemRequest,
  ParentMedicationRequestRequest,
  useCreateMedicationRequest
} from '@/queries/medication-requests.query';
import { useGetStudents } from '@/queries/student.query';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddMedicationRequestPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createRequest = useCreateMedicationRequest();
  const { data: studentsData, isLoading: isLoadingStudents } = useGetStudents(
    1,
    100
  );
  const auth = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<
    Partial<ParentMedicationRequestRequest>
  >({
    parentId: auth.userInfo?.accountId, // In a real app, this would come from the logged-in user
    studentId: 0,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 7 days from now
    medicationItems: [
      { medicineName: '', dosage: '', instructions: '', timeOfDay: '' }
    ]
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'studentId' ? parseInt(value) : value
    }));
  };

  const handleDateChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: new Date(value)
    }));
  };

  const handleMedicationItemChange = (
    index: number,
    field: keyof MedicationItemRequest,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedItems = [...(prev.medicationItems || [])];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return { ...prev, medicationItems: updatedItems };
    });
  };

  const addMedicationItem = () => {
    setFormData((prev) => ({
      ...prev,
      medicationItems: [
        ...(prev.medicationItems || []),
        { medicineName: '', dosage: '', instructions: '', timeOfDay: '' }
      ]
    }));
  };

  const removeMedicationItem = (index: number) => {
    setFormData((prev) => {
      const updatedItems = [...(prev.medicationItems || [])];
      updatedItems.splice(index, 1);
      return { ...prev, medicationItems: updatedItems };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      if (
        !formData.studentId ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.medicationItems ||
        formData.medicationItems.length === 0 ||
        formData.medicationItems.some(
          (item) => !item.medicineName || !item.dosage
        )
      ) {
        toast({
          title: 'Lỗi',
          description: 'Vui lòng điền đầy đủ thông tin bắt buộc',
          variant: 'destructive'
        });
        return;
      }

      // Convert dates to proper format
      const payload: ParentMedicationRequestRequest = {
        parentId: formData.parentId!,
        studentId: formData.studentId!,
        startDate: formData.startDate!,
        endDate: formData.endDate!,
        medicationItems: formData.medicationItems!
      };

      await createRequest.mutateAsync(payload);

      toast({
        title: 'Thành công',
        description: 'Đã gửi yêu cầu thuốc mới'
      });

      navigate('/dashboard/medications/requests');
    } catch (error) {
      console.error('Error creating medication request:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể gửi yêu cầu thuốc. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    }
  };

  const isLoading = isLoadingStudents || createRequest.isPending;

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <CardTitle className="text-teal-900">Tạo yêu cầu thuốc mới</CardTitle>
        <Button asChild variant="outline">
          <Link to="/dashboard/medications/requests">
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
                value={formData.studentId?.toString()}
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
                      if (auth.role === 'Parent') {
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
              {/* This would be auto-filled from the logged-in user in a real app */}
              <label
                htmlFor="parentId"
                className="text-sm font-medium text-gray-700"
              >
                ID Phụ huynh
              </label>
              <Input
                id="parentId"
                name="parentId"
                type="number"
                value={formData.parentId || 1}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700"
              >
                Ngày bắt đầu <span className="text-red-500">*</span>
              </label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={
                  formData.startDate
                    ? new Date(formData.startDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700"
              >
                Ngày kết thúc <span className="text-red-500">*</span>
              </label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={
                  formData.endDate
                    ? new Date(formData.endDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Danh sách thuốc</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMedicationItem}
              >
                <Icons.plus className="mr-2 h-4 w-4" />
                Thêm thuốc
              </Button>
            </div>

            {formData.medicationItems?.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Tên thuốc <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Nhập tên thuốc"
                        value={item.medicineName}
                        onChange={(e) =>
                          handleMedicationItemChange(
                            index,
                            'medicineName',
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Liều lượng <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Ví dụ: 1 viên, 5ml..."
                        value={item.dosage}
                        onChange={(e) =>
                          handleMedicationItemChange(
                            index,
                            'dosage',
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Thời gian uống
                      </label>
                      <Input
                        placeholder="Ví dụ: Sau bữa ăn, Trước khi ngủ..."
                        value={item.timeOfDay || ''}
                        onChange={(e) =>
                          handleMedicationItemChange(
                            index,
                            'timeOfDay',
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Hướng dẫn bổ sung
                      </label>
                      <Input
                        placeholder="Hướng dẫn thêm (nếu có)"
                        value={item.instructions || ''}
                        onChange={(e) =>
                          handleMedicationItemChange(
                            index,
                            'instructions',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  {formData.medicationItems!.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-4 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => removeMedicationItem(index)}
                    >
                      <Icons.trash className="mr-2 h-4 w-4" />
                      Xóa thuốc này
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/medications/requests')}
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
                'Gửi yêu cầu'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
