import SelectField from '@/components/shared/select-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  useAssignToDepartment,
  useAssignToEmployee
} from '@/queries/contract.query';
import { useGetDropdownDepartment } from '@/queries/department.query';
import { useGetDropdownEmployee } from '@/queries/employee.query';
import { RootState } from '@/redux/store';
import { useId } from '@/routes/hooks/use-id';
import { useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {};

export default function AssignContract({}: Props) {
  const id = useId();
  const { toast } = useToast();
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;
  const { data: employees } = useGetDropdownEmployee();
  const { data: departments } = useGetDropdownDepartment();
  const { mutateAsync: assignDepartment } = useAssignToDepartment();
  const { mutateAsync: assignEmployee } = useAssignToEmployee();
  const [employee, setEmployee] = useState('');
  const [employeeError, setEmployeeError] = useState('');
  const [department, setDepartment] = useState('');
  const [departmentError, setDepartmentError] = useState('');

  const handleAssignDepartment = async () => {
    if (department) {
      const model = {
        contractId: id,
        departmentId: department,
        endDate: null
      };
      const res = await assignDepartment(model);
      if (res) {
        toast({
          variant: 'success',
          title: 'Thành công',
          description: 'Phân công thành công.',
          duration: 3000
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra',
          description: 'Phân công thất bại.',
          duration: 3000
        });
      }
    } else {
      setDepartmentError('Bắt buộc chọn 1 phòng ban');
    }
  };

  const handleAssignEmployee = async () => {
    if (employee) {
      const model = {
        contractId: id,
        employeeId: employee,
        description: null
      };
      const res = await assignEmployee(model);
      if (res) {
        toast({
          variant: 'success',
          title: 'Thành công',
          description: 'Phân công thành công.',
          duration: 3000
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra',
          description: 'Phân công thất bại.',
          duration: 3000
        });
      }
    } else {
      setEmployeeError('Bắt buộc chọn 1 nhân viên');
    }
  };

  return (
    <div className="flex w-1/2 flex-col gap-6">
      {role === 'Admin' ? (
        <>
          <div className="flex w-full items-center gap-6">
            <div className="w-full">
              <SelectField
                id="assign-department"
                label="Phân công cho phòng ban"
                options={departments}
                value={department || ''}
                onChange={(value) => setDepartment(value)}
                placeholder="Chọn phòng ban"
                required
                error={departmentError}
              />
            </div>
          </div>
          <div className="w-1/3">
            <Button onClick={handleAssignDepartment} size={'lg'}>
              Phân công
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 flex w-full items-center gap-6">
            <div className="w-full">
              <SelectField
                id="assign-employee"
                label="Phân công cho nhân viên"
                options={employees}
                value={employee || ''}
                onChange={(value) => setEmployee(value)}
                placeholder="Chọn nhân viên"
                required
                error={employeeError}
              />
            </div>
          </div>
          <div className="w-1/3">
            <Button onClick={handleAssignEmployee} size={'lg'}>
              Phân công
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
