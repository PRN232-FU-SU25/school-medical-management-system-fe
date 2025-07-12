/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarOverlay } from '@/components/ui/avatar-insert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
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
import { useEffect, useState } from 'react';
import {
  useGetDataEmployee,
  useGetDataManager,
  useGetEmployeeById,
  useUpdateEmployee,
  useUploadAvatarEmployee
} from '@/queries/employee.query';
import { baseSchema } from '@/pages/workspace-page/employee/schema/employee.schema';
import { z } from 'zod';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/ui/icons';
import __helpers from '@/helpers';
import {
  convertDateToBackendFormat,
  convertToDateFromAPI,
  convertToMMDDYYYY,
  getErrorMessages,
  parseDateFromAPI
} from '@/pages/workspace-page/employee/helper/util';
import { genderInit } from '@/pages/workspace-page/employee/helper/data';
import { useSearchParams } from 'react-router-dom';
import { EmployeeCalendar } from '@/pages/workspace-page/employee/components/calendar-employee';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSchema = (baseSchema as z.ZodEffects<any>)._def.schema
  .omit({
    email: true,
    departmentId: true,
    password: true,
    confirmPassword: true,
    userName: true,
    userType: true,
    gender: true
  })
  .extend({
    id: z.number().min(0, 'ID không hợp lệ'),
    gender: z.string({ message: 'Giới tính không hợp lệ' })
  });
type TypeUpdate = z.infer<typeof updateSchema>;
type FormError = Partial<TypeUpdate>;

export default function UpdateEmployeeDialog({
  id,
  onClose,
  setEmployeePagingData,
  tab
}: {
  id: number;
  onClose: () => void;
  setEmployeePagingData: React.Dispatch<React.SetStateAction<undefined>>;
  tab: string;
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(true);
  const { data: getEmployeeByIdData, isPending: isPendingGetData } =
    useGetEmployeeById(id);
  const { mutateAsync: getAllEmployeeData, isPending } = useGetDataEmployee();
  const { mutateAsync: getAllManagerData, isPending: isPendingGetDataManager } =
    useGetDataManager();
  // handle Image
  const [imageTemp, setImageTemp] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const { mutateAsync: uploadImage } = useUploadAvatarEmployee(imageFile?.name);
  const { mutateAsync: updateEmployee, isPending: isUpdatePending } =
    useUpdateEmployee();

  const [selectedGender, setSelectedGender] = useState<
    { id: number; value: string; display: string } | undefined
  >(genderInit[0]);

  const [formUpdate, setFormUpdate] = useState<TypeUpdate>({
    id: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    identityCard: '',
    avatar: ''
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (getEmployeeByIdData) {
      setFormUpdate({
        id: getEmployeeByIdData.id,
        phoneNumber: getEmployeeByIdData.phoneNumber,
        firstName: getEmployeeByIdData.firstName,
        lastName: getEmployeeByIdData.lastName,
        gender: getEmployeeByIdData.gender,
        dateOfBirth: getEmployeeByIdData.dateOfBirth,
        identityCard: getEmployeeByIdData.identityCard,
        avatar: getEmployeeByIdData.avatar
      });
      const matchedGender = genderInit.find(
        (gender) => gender.value === getEmployeeByIdData.gender
      );
      setSelectedGender(matchedGender);
    }
  }, [getEmployeeByIdData]);
  const [updateErrors, setUpdateErrors] = useState<
    Partial<Record<keyof TypeUpdate, string>>
  >({});
  const handleDateChange = (date) => {
    if (date !== undefined) {
      const formattedDate = __helpers.convertToDate(date);
      setFormUpdate((prevState) => ({
        ...prevState,
        dateOfBirth: formattedDate
      }));
    }
  };
  const validateInputs = (): FormError => {
    const errors: FormError = {};

    // Validate từng trường trong formCreate
    if (!formUpdate.firstName || formUpdate.firstName.trim().length < 2) {
      errors.firstName = 'Tên phải có tối thiểu 2 kí tự';
    } else if (formUpdate.firstName.length > 50) {
      errors.firstName = 'Tên không được dài hơn 50 kí tự';
    }

    if (!formUpdate.lastName || formUpdate.lastName.trim().length < 2) {
      errors.lastName = 'Họ phải có tối thiểu 2 kí tự';
    } else if (formUpdate.lastName.length > 50) {
      errors.lastName = 'Họ không được dài hơn 50 kí tự';
    }

    // if (!formUpdate.departmentId || formUpdate.departmentId < 1) {
    //   errors.departmentId = 'Phòng ban không hợp lệ';
    // }

    if (!formUpdate.dateOfBirth) {
      errors.dateOfBirth = 'Vui lòng chọn ngày sinh';
    }

    // if (formUpdate.gender !== 1 && formUpdate.gender !== 2) {
    //   errors.gender = 'Giới tính không hợp lệ';
    // }

    if (!formUpdate.identityCard || formUpdate.identityCard.length != 12) {
      errors.identityCard = 'CCCD phải có 12 kí tự';
    }

    if (!formUpdate.phoneNumber || formUpdate.phoneNumber.length < 10) {
      errors.phoneNumber = 'Số điện thoại phải có tối thiểu 10 kí tự';
    } else if (formUpdate.phoneNumber.length > 11) {
      errors.phoneNumber = 'Số điện thoại không được dài hơn 11 kí tự';
    }
    // if (!imageFile) {
    //   errors.avatar = 'Vui lòng chọn hình đại hiện';
    // }
    // if (!formUpdate.userType || formUpdate.userType < 1) {
    //   errors.userType = 'Vai trò không hợp lệ';
    // }

    // if (!formUpdate.userName || formUpdate.userName.trim().length < 3) {
    //   errors.userName = 'Tên đăng nhập phải có tối thiểu 3 kí tự';
    // } else if (formUpdate.userName.length > 20) {
    //   errors.userName = 'Tên đăng nhập không được dài hơn 20 kí tự';
    // }

    // if (!formUpdate.userType || formUpdate.userType < 1) {
    //   errors.userType = 'Loại người dùng không hợp lệ';
    // }

    return errors;
  };

  const resetForm = () => {
    setFormUpdate({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 1,
      identityCard: '',
      phoneNumber: '',
      userName: '',
      avatar: ''
    });
    setUpdateErrors({});
    setSelectedGender(genderInit[0]);
    setImageFile(undefined);
    setImageTemp(undefined);
  };
  const handleUpdate = async () => {
    const errorsUpdated = validateInputs();

    setUpdateErrors(errorsUpdated);

    if (Object.keys(errorsUpdated).length > 0) {
      return;
    }
    const model = updateSchema.safeParse({
      ...formUpdate,
      gender: selectedGender?.value,
      dateOfBirth: convertDateToBackendFormat(formUpdate.dateOfBirth)
    });
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
      let validData = model.data;

      if (imageFile) {
        const formData = new FormData();
        formData.append('File', imageFile);
        const res = await uploadImage(formData);
        validData = {
          ...validData,
          avatar: res.imageUrl
        };
      }

      const data = await updateEmployee(validData);
      if (data.isSuccess) {
        setIsUpdateDialogOpen(false);
        toast({
          variant: 'success',
          title: 'Cập nhật nhân viên thành công'
        });

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

        resetForm();
        setIsUpdateDialogOpen(false);
        onClose();
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
        const errorMessages = err?.errors
          ?.map((error) => error.value)
          .join('\n');

        toast({
          variant: 'destructive',
          title: err?.message,
          description: errorMessages
            ? errorMessages.replace(/\n/g, '<br />')
            : ''
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra, vui lòng thử lại sau ít phút!'
        });
      }
    }
  };
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
  return (
    <Dialog
      open={isUpdateDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsUpdateDialogOpen(false);
          onClose();
        }
      }}
    >
      <DialogContent
        aria-describedby="dialog-description"
        className=" max-h-[101vh] w-3/5  max-w-screen-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
      >
        <DialogHeader>
          <DialogTitle id="dialog-description" className="text-center text-3xl">
            Cập nhật nhân viên
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <Label>
              Họ{' '}
              {formUpdate.firstName.trim().length === 0 ? (
                <>
                  <span className="text-red-500">*</span>
                </>
              ) : (
                ''
              )}
            </Label>

            {isPendingGetData ? (
              <Skeleton className=" h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={formUpdate.firstName}
                onChange={(e) =>
                  setFormUpdate({
                    ...formUpdate,
                    firstName: e.target.value
                  })
                }
              />
            )}

            {updateErrors.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {updateErrors.firstName}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>
              Tên{' '}
              {formUpdate.lastName.trim().length === 0 ? (
                <>
                  <span className="text-red-500">*</span>
                </>
              ) : (
                ''
              )}
            </Label>
            {isPendingGetData ? (
              <Skeleton className=" h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={formUpdate.lastName}
                onChange={(e) =>
                  setFormUpdate({
                    ...formUpdate,
                    lastName: e.target.value
                  })
                }
              />
            )}

            {updateErrors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {updateErrors.lastName}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <Label>
              Số điện thoại{' '}
              {formUpdate.phoneNumber.trim().length === 0 ? (
                <>
                  <span className="text-red-500">*</span>
                </>
              ) : (
                ''
              )}
            </Label>
            {isPendingGetData ? (
              <Skeleton className=" h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={formUpdate.phoneNumber}
                onChange={(e) =>
                  setFormUpdate({
                    ...formUpdate,
                    phoneNumber: e.target.value
                  })
                }
              />
            )}

            {updateErrors.phoneNumber && (
              <p className="mt-1 text-xs text-red-500">
                {updateErrors.phoneNumber}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>
              Số CCCD{' '}
              {formUpdate.identityCard.trim().length === 0 ? (
                <>
                  <span className="text-red-500">*</span>
                </>
              ) : (
                ''
              )}
            </Label>
            {isPendingGetData ? (
              <Skeleton className=" h-10 w-full  bg-gray-300" />
            ) : (
              <Input
                type="text"
                className="w-full rounded border p-2"
                value={formUpdate.identityCard}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[0-9]*$/.test(value)) {
                    setFormUpdate({
                      ...formUpdate,
                      identityCard: value
                    });
                  }
                }}
              />
            )}

            {updateErrors.identityCard && (
              <p className="mt-1 text-xs text-red-500">
                {updateErrors.identityCard}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-1">
            <Label>Hình đại diện</Label>
            <div className="flex justify-center">
              {isPendingGetData ? (
                <Skeleton className=" h-52 w-52 border bg-gray-300  after:rounded-full" />
              ) : (
                <Avatar className="h-52 w-52 border ">
                  <AvatarImage
                    src={imageFile ? imageTemp : formUpdate?.avatar}
                  />
                  <AvatarFallback className="flex w-full items-center justify-center bg-gray-800 text-8xl font-light text-white">
                    {formUpdate?.fullName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                  <AvatarOverlay onFileChange={handleFileChange} />
                </Avatar>
              )}
            </div>
          </div>
          <div className="grid grid-rows-3 gap-3 ">
            <div className="space-y-1">
              <Label>Ngày sinh</Label>
              {isPendingGetData ? (
                <Skeleton className=" h-10 w-full  bg-gray-300" />
              ) : (
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
                      formUpdate.dateOfBirth
                        ? convertToDateFromAPI(formUpdate.dateOfBirth)
                        : ''
                    }
                  />
                  {showDatePicker && (
                    <div className="absolute left-1/2 z-10 -translate-x-1/2 transform border-2 bg-white">
                      <EmployeeCalendar
                        mode="single"
                        selected={
                          formUpdate.dateOfBirth
                            ? new Date(parseDateFromAPI(formUpdate.dateOfBirth))
                            : undefined
                        }
                        initialFocusDate={
                          formUpdate.dateOfBirth
                            ? parseDateFromAPI(formUpdate.dateOfBirth)
                            : new Date()
                        }
                        onSelect={(date) => {
                          handleDateChange(date);
                          setShowDatePicker(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {updateErrors.dateOfBirth && (
                <p className="mt-1 text-xs text-red-500">
                  {updateErrors.dateOfBirth}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Giới tính</Label>
              {isPendingGetData ? (
                <Skeleton className=" h-10 w-full  bg-gray-300" />
              ) : (
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
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full bg-primary  text-base text-white"
            onClick={handleUpdate}
            disabled={isUpdatePending}
          >
            {isUpdatePending ? 'Đang xử lý...' : 'Cập nhật'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
