/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarOverlay } from '@/components/ui/avatar-insert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { z } from 'zod';
import {
  useCreateEmployee,
  useGetDataEmployee,
  useGetDataManager,
  useGetDropdownDepartment,
  useUploadAvatarEmployee
} from '@/queries/employee.query';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { baseSchema } from '@/pages/workspace-page/employee/schema/employee.schema';
import { Icons } from '@/components/ui/icons';
import {
  convertDateToBackendFormat,
  convertToDateFromAPI,
  convertToMMDDYYYY,
  getErrorMessages,
  parseDateFromAPI
} from '@/pages/workspace-page/employee/helper/util';
import __helpers from '@/helpers';
import {
  genderInit,
  roleInit
} from '@/pages/workspace-page/employee/helper/data';
import { EmployeeCalendar } from '@/pages/workspace-page/employee/components/calendar-employee';
import { da } from 'date-fns/locale';
import { useSearchParams } from 'react-router-dom';

const createSchema = baseSchema;

type TypeCreate = z.infer<typeof createSchema>;
type FormError = Partial<TypeCreate>;

export default function CreateEmployeeDialog({
  setEmployeePagingData,
  tab
}: {
  setEmployeePagingData: React.Dispatch<React.SetStateAction<undefined>>;
  tab: string;
}) {
  const { mutateAsync: getAllEmployeeData, isPending: loadData } =
    useGetDataEmployee();
  const { mutateAsync: getAllManagerData, isPending: isPendingGetDataManager } =
    useGetDataManager();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { mutateAsync: createEmployee, isPending: isCreatePending } =
    useCreateEmployee();

  const { data: dropdownDepartmentData } = useGetDropdownDepartment();

  const [selectedGender, setSelectedGender] = useState(genderInit[0]);
  const [selectedRole, setSelectedRole] = useState(roleInit[0]);

  const [selectedDepartment, setSelectedDepartment] = useState();
  useEffect(() => {
    if (dropdownDepartmentData && dropdownDepartmentData.length > 0) {
      setSelectedDepartment(dropdownDepartmentData[0]);
    }
  }, [dropdownDepartmentData]);

  const [formCreate, setFormCreate] = useState<TypeCreate>({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: 1,
    dateOfBirth: '',
    gender: 1,
    identityCard: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    userName: '',
    avatar: '',
    userType: 1
  });

  const resetForm = () => {
    setFormCreate({
      firstName: '',
      lastName: '',
      email: '',
      departmentId: 1,
      dateOfBirth: '',
      gender: 1,
      identityCard: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      userName: '',
      avatar: '',
      userType: 1
    });
    setCreateErrors({});
    setSelectedGender(genderInit[0]);
    setSelectedDepartment(dropdownDepartmentData[0]);
    setSelectedRole(roleInit[0]);
    setImageFile(undefined);
    setImageTemp(undefined);
  };
  const handleDateChange = (date) => {
    if (date !== undefined) {
      const formattedDate = __helpers.convertToDate(date);
      if (formattedDate !== 'Invalid date') {
        setFormCreate((prevState) => ({
          ...prevState,
          dateOfBirth: formattedDate
        }));
      }
    }
  };

  const validateInputs = (): FormError => {
    const errors: FormError = {};

    // Validate từng trường trong formCreate
    if (!formCreate.firstName || formCreate.firstName.trim().length < 2) {
      errors.firstName = 'Tên phải có tối thiểu 2 kí tự';
    } else if (formCreate.firstName.length > 50) {
      errors.firstName = 'Tên không được dài hơn 50 kí tự';
    }

    if (!formCreate.lastName || formCreate.lastName.trim().length < 2) {
      errors.lastName = 'Họ phải có tối thiểu 2 kí tự';
    } else if (formCreate.lastName.length > 50) {
      errors.lastName = 'Họ không được dài hơn 50 kí tự';
    }

    if (
      !formCreate.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formCreate.email)
    ) {
      errors.email = 'Email không hợp lệ';
    }

    // if (!formCreate.departmentId || formCreate.departmentId < 1) {
    //   errors.departmentId = 'Phòng ban không hợp lệ';
    // }

    if (!formCreate.dateOfBirth) {
      errors.dateOfBirth = 'Vui lòng chọn ngày sinh';
    }

    // if (formCreate.gender !== 1 && formCreate.gender !== 2) {
    //   errors.gender = 'Giới tính không hợp lệ';
    // }

    if (!formCreate.identityCard || formCreate.identityCard.length != 12) {
      errors.identityCard = 'CCCD phải có 12 kí tự';
    }

    if (!formCreate.password || formCreate.password.length < 6) {
      errors.password = 'Mật khẩu phải có tối thiểu 6 kí tự';
    } else if (formCreate.password.length >= 255) {
      errors.password = 'Mật khẩu không được dài hơn 255 kí tự';
    }

    if (!formCreate.confirmPassword) {
      errors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
    } else if (formCreate.confirmPassword !== formCreate.password) {
      errors.confirmPassword = 'Mật khẩu và xác nhận mật khẩu không khớp';
    }

    if (!formCreate.phoneNumber || formCreate.phoneNumber.length < 10) {
      errors.phoneNumber = 'Số điện thoại phải có tối thiểu 10 kí tự';
    } else if (formCreate.phoneNumber.length > 11) {
      errors.phoneNumber = 'Số điện thoại không được dài hơn 11 kí tự';
    }
    if (!imageFile) {
      errors.avatar = 'Vui lòng chọn hình đại hiện';
    }
    // if (!formCreate.userType || formCreate.userType < 1) {
    //   errors.userType = 'Vai trò không hợp lệ';
    // }

    if (!formCreate.userName || formCreate.userName.trim().length < 3) {
      errors.userName = 'Tên đăng nhập phải có tối thiểu 3 kí tự';
    } else if (formCreate.userName.length > 20) {
      errors.userName = 'Tên đăng nhập không được dài hơn 20 kí tự';
    }

    // if (!formCreate.userType || formCreate.userType < 1) {
    //   errors.userType = 'Loại người dùng không hợp lệ';
    // }

    return errors;
  };

  const [imageTemp, setImageTemp] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const { mutateAsync: uploadImage, isPending } = useUploadAvatarEmployee(
    imageFile?.name
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (imageTemp) {
        URL.revokeObjectURL(imageTemp);
      }
      if (file.name.length > 20) {
        const extension = file.name.substring(file.name.lastIndexOf('.'));
        const baseName = file.name.substring(0, 20 - extension.length);
        const truncatedName = baseName + extension;

        const truncatedFile = new File([file], truncatedName, {
          type: file.type
        });

        setImageFile(truncatedFile);

        const newImageUrl = URL.createObjectURL(truncatedFile);
        setImageTemp(newImageUrl);
      } else {
        const newImageUrl = URL.createObjectURL(file);
        setImageTemp(newImageUrl);
        setImageFile(file);
      }
    }
  };

  const [createErrors, setCreateErrors] = useState<
    Partial<Record<keyof TypeCreate, string>>
  >({});
  const handleCreate = async () => {
    const errorsCreated = validateInputs();
    setCreateErrors(errorsCreated);

    if (Object.keys(errorsCreated).length > 0) {
      return;
    }
    const model = createSchema.safeParse({
      ...formCreate,
      gender: selectedGender.id,
      departmentId: selectedDepartment?.id,
      userType: selectedRole.id,
      dateOfBirth: convertDateToBackendFormat(formCreate.dateOfBirth)
    });

    // Nếu dữ liệu form không hợp lệ, hiển thị thông báo lỗi và dừng
    if (!model.success) {
      const errorMessage = getErrorMessages(model.error);

      toast({
        variant: 'destructive',
        title: 'Lỗi thông tin',
        description: errorMessage
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('File', imageFile);
      const res = await uploadImage(formData);

      const validData = {
        ...model.data,
        avatar: res.imageUrl
      };
      const data = await createEmployee(validData);

      if (data.id) {
        setIsCreateDialogOpen(false);
        toast({
          variant: 'success',
          title: 'Tạo mới nhân viên thành công',
          description:
            'Nhân viên vui lòng xác nhận email để có thể đăng nhập vào hệ thống'
        });

        // after update will refresh data
        const page = searchParams?.get('page') ?? '1';
        const pageAsNumber = Number(page);
        const searchInput = searchParams?.get('search') ?? '';
        const per_page = searchParams?.get('limit') ?? '10';
        const searchObject = {
          pageIndex: pageAsNumber,
          pageSize: Number.parseInt(per_page),
          keyword: searchInput.trim()
        };
        let response;

        if (tab === 'manager') {
          response = await getAllManagerData(searchObject); // Call API for managers
        } else if (tab === 'employee') {
          response = await getAllEmployeeData(searchObject); // Call API for employees
        }

        setEmployeePagingData(response ?? []);

        setTimeout(() => {
          setIsCreateDialogOpen(false);
        }, 1000);
        resetForm();
      } else {
        toast({
          variant: 'destructive',
          title:
            'Có lỗi xảy ra trong quá trình thực hiện, vui lòng thử lại sau ít phút!',
          description: data.message
        });
      }
    } catch (err: any) {
      if (!err?.success && err?.statusCode === 400) {
        if (err?.errors === null) {
          toast({
            variant: 'destructive', // Đổi variant sang error nếu là lỗi
            title: 'Tạo thất bại',
            description: err?.data.message
          });
          return;
        }
        const errorMessages = err?.errors
          ?.map((error) => error.value)
          .join('\n');
        if (err.data !== null) {
          toast({
            variant: 'destructive', // Đổi variant sang error nếu là lỗi
            title: err?.message,
            description: err.data
          });
        } else {
          toast({
            variant: 'destructive', // Đổi variant sang error nếu là lỗi
            title: err?.message,
            description: errorMessages.replace(/\n/g, '<br />') // Hiển thị xuống dòng
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra, vui lòng thử lại sau ít phút!'
        });
      }
    }
  };
  return (
    <Dialog
      open={isCreateDialogOpen}
      onOpenChange={(open) => {
        setIsCreateDialogOpen(!isCreateDialogOpen);
        if (!open) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="border-2 border-solid border-primary bg-white text-primary"
          size={'lg'}
        >
          Thêm nhân viên
        </Button>
      </DialogTrigger>

      <DialogContent className=" max-h-[101vh] w-3/5  max-w-screen-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Tạo mới nhân viên
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-10">
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-1">
              <Label>
                Họ{' '}
                {formCreate.lastName.trim().length === 0 ? (
                  <>
                    <span className="text-red-500">*</span>
                  </>
                ) : (
                  ''
                )}
              </Label>
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={formCreate.lastName}
                onChange={(e) =>
                  setFormCreate({
                    ...formCreate,
                    lastName: e.target.value
                  })
                }
              />
              {createErrors.lastName && (
                <p className="mt-1 text-xs text-red-500">
                  {createErrors.lastName}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label>
                Tên{' '}
                {formCreate.firstName.trim().length === 0 ? (
                  <>
                    <span className="text-red-500">*</span>
                  </>
                ) : (
                  ''
                )}
              </Label>
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={formCreate.firstName}
                onChange={(e) =>
                  setFormCreate({
                    ...formCreate,
                    firstName: e.target.value
                  })
                }
              />
              {createErrors.firstName && (
                <p className="mt-1 text-xs text-red-500">
                  {createErrors.firstName}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label>
              Số điện thoại{' '}
              {formCreate.phoneNumber.trim().length === 0 ? (
                <>
                  <span className="text-red-500">*</span>
                </>
              ) : (
                ''
              )}
            </Label>
            <Input
              type="text"
              className="w-full rounded border p-2"
              value={formCreate.phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9]*$/.test(value)) {
                  setFormCreate({
                    ...formCreate,
                    phoneNumber: value
                  });
                }
              }}
            />
            {createErrors.phoneNumber && (
              <p className="mt-1 text-xs text-red-500">
                {createErrors.phoneNumber}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <Label>
              Email{' '}
              {formCreate.email.trim().length === 0 ? (
                <>
                  <span className="text-red-500">*</span>
                </>
              ) : (
                ''
              )}
            </Label>
            <Input
              type="text"
              className="w-full rounded border p-2"
              value={formCreate.email}
              onChange={(e) =>
                setFormCreate({
                  ...formCreate,
                  email: e.target.value
                })
              }
            />
            {createErrors.email && (
              <p className="mt-1 text-xs text-red-500">{createErrors.email}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label>
              Số CCCD{' '}
              {formCreate.identityCard.trim().length === 0 ? (
                <>
                  <span className="text-red-500">*</span>
                </>
              ) : (
                ''
              )}
            </Label>
            <Input
              type="text"
              className="w-full rounded border p-2"
              value={formCreate.identityCard}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9]*$/.test(value)) {
                  setFormCreate({
                    ...formCreate,
                    identityCard: value
                  });
                }
              }}
            />
            {createErrors.identityCard && (
              <p className="mt-1 text-xs text-red-500">
                {createErrors.identityCard}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <Label>
              Hình đại diện{' '}
              {imageFile === undefined ? (
                <>
                  <span className="text-red-500">*</span>
                </>
              ) : (
                ''
              )}
            </Label>
            <div className="flex justify-center">
              <Avatar className="h-56 w-56 border text-center ">
                <AvatarImage
                  src={
                    imageFile
                      ? imageTemp
                      : formCreate.firstName.charAt(0).toUpperCase()
                  }
                />
                <AvatarFallback className="flex w-full items-center justify-center bg-gray-800 text-8xl font-light text-white">
                  {formCreate.firstName.charAt(0).toUpperCase()}
                </AvatarFallback>
                <AvatarOverlay onFileChange={handleFileChange} />
              </Avatar>
            </div>
            {createErrors.avatar && (
              <p className="mt-1 text-center text-xs  text-red-500">
                {createErrors.avatar}
              </p>
            )}
          </div>
          <div className="grid grid-rows-3 gap-3 ">
            <div className="space-y-1">
              <Label>
                Ngày sinh{' '}
                {formCreate.dateOfBirth.trim().length === 0 ? (
                  <>
                    <span className="text-red-500">*</span>
                  </>
                ) : (
                  ''
                )}
              </Label>
              <div className="relative">
                <span className="absolute left-0 flex items-center pl-2 pt-1">
                  <Icons.calendar />
                </span>
                <Input
                  type="text"
                  className="w-full cursor-pointer rounded border p-2 pl-10"
                  placeholder="Ngày sinh"
                  readOnly
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  value={
                    formCreate.dateOfBirth
                      ? convertToDateFromAPI(formCreate.dateOfBirth)
                      : ''
                  }
                />
                {showDatePicker && (
                  <div className="absolute left-1/2 z-10 -translate-x-1/2 transform border-2 bg-white">
                    <EmployeeCalendar
                      mode="single"
                      selected={
                        formCreate.dateOfBirth
                          ? parseDateFromAPI(formCreate.dateOfBirth)
                          : undefined
                      }
                      initialFocusDate={
                        formCreate.dateOfBirth
                          ? (() => {
                              const formattedDate = parseDateFromAPI(
                                formCreate.dateOfBirth
                              );
                              return formattedDate
                                ? new Date(formattedDate)
                                : new Date();
                            })()
                          : new Date()
                      }
                      onSelect={(date) => {
                        handleDateChange(date);
                        setShowDatePicker(false);
                      }}
                    />
                  </div>
                )}
                {createErrors.dateOfBirth && (
                  <p className="mt-1 text-xs text-red-500">
                    {createErrors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <Label>Giới tính</Label>
              <Select
                onValueChange={(value) => {
                  const selected = genderInit.find(
                    (item) => item.value === value
                  );
                  if (selected) setSelectedGender(selected);
                }}
                //value={selectedRole.name}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      selectedGender
                        ? selectedGender.display
                        : 'Vui lòng chọn giới tính'
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {genderInit.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Chức vụ</Label>
              <Select
                onValueChange={(value) => {
                  const selected = roleInit.find(
                    (item) => item.value === value
                  );
                  if (selected) setSelectedRole(selected);
                }}
                //value={selectedRole.name}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      selectedRole
                        ? selectedRole.value
                        : 'Vui lòng chọn chức vụ'
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {roleInit.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Phòng ban</Label>
              <Select
                onValueChange={(value) => {
                  const selected = dropdownDepartmentData.find(
                    (item) => item.name === value
                  );
                  if (selected) setSelectedDepartment(selected);
                }}
                //value={selected.name}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      selectedDepartment
                        ? selectedDepartment.name
                        : 'Vui lòng chọn phòng ban'
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {dropdownDepartmentData?.map((item) => (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <Label>
            Tài khoản{' '}
            {formCreate.userName.trim().length === 0 ? (
              <>
                <span className="text-red-500">*</span>
              </>
            ) : (
              ''
            )}
          </Label>
          <Input
            type="text"
            className="w-full rounded border p-2"
            value={formCreate.userName}
            onChange={(e) =>
              setFormCreate({
                ...formCreate,
                userName: e.target.value
              })
            }
          />
          {createErrors.userName && (
            <p className="mt-1 text-xs text-red-500">{createErrors.userName}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label>
            Mật khẩu{' '}
            {formCreate.password.trim().length === 0 ? (
              <>
                <span className="text-red-500">*</span>
              </>
            ) : (
              ''
            )}
          </Label>
          <Input
            type="password"
            className="w-full rounded border p-2"
            value={formCreate.password}
            onChange={(e) =>
              setFormCreate({
                ...formCreate,
                password: e.target.value
              })
            }
          />
          {createErrors.password && (
            <p className="mt-1 text-xs text-red-500">{createErrors.password}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label>
            Nhập lại mật khẩu{' '}
            {formCreate.confirmPassword.trim().length === 0 ? (
              <>
                <span className="text-red-500">*</span>
              </>
            ) : (
              ''
            )}
          </Label>
          <Input
            type="password"
            className="w-full rounded border p-2"
            value={formCreate.confirmPassword}
            onChange={(e) =>
              setFormCreate({
                ...formCreate,
                confirmPassword: e.target.value
              })
            }
          />
          {createErrors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {createErrors.confirmPassword}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            className="w-full bg-primary text-base text-white"
            onClick={handleCreate}
            disabled={isCreatePending}
          >
            {isCreatePending || isPending || loadData
              ? 'Đang xử lý...'
              : 'Tạo mới'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
