import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import SelectField from '@/components/shared/select-field';
import { AvatarOverlay } from '@/components/ui/avatar-insert';
import TextField from '@/components/shared/text-field';
import __helpers from '@/helpers';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import DatePicker from '@/components/shared/date-picker';
import { useUploadCustomizePhoto } from '@/queries/file.query';
import { UserInfo } from '@/types';
import { genderInit } from '@/constants/data';

interface UpdateProfileProps {
  isOpen: boolean;
  onOpenChange: () => void;
  userInfo: UserInfo;
  onUpdate: (formUpdate: FormUpdate) => void;
}

interface FormUpdate {
  firstName: string;
  lastName: string;
  avatar: string;
  gender: number;
  dateOfBirth: string;
  identityCard: string;
}

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  lastName: z.string().min(2, { message: 'Họ phải có ít nhất 2 ký tự' }),
  avatar: z.string(),
  gender: z.number(),
  dateOfBirth: z.string(),
  identityCard: z
    .string()
    .length(12, { message: 'CMND/CCCD phải có 12 chữ số' })
    .regex(/^\d{12}$/, { message: 'CMND/CCCD phải là chuỗi số có 12 chữ số' })
});

const UpdateProfile: React.FC<UpdateProfileProps> = ({
  isOpen,
  onOpenChange,
  userInfo,
  onUpdate
}) => {
  const { mutate: uploadPhoto } = useUploadCustomizePhoto();

  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [formUpdate, setFormUpdate] = useState<FormUpdate>({
    firstName: userInfo.firstName || '',
    lastName: userInfo.lastName || '',
    avatar: userInfo.avatar || '',
    gender:
      genderInit.find((gender) => gender.value === userInfo.gender)?.id || 0,
    dateOfBirth: userInfo.dateOfBirth || '',
    identityCard: userInfo.identityCard || ''
  });

  useEffect(() => {
    if (!isOpen) {
      setFormUpdate({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        avatar: userInfo.avatar || '',
        gender:
          genderInit.find((gender) => gender.value === userInfo.gender)?.id ||
          0,
        dateOfBirth: userInfo.dateOfBirth || '',
        identityCard: userInfo.identityCard || ''
      });
      setErrors({});
    }
  }, [userInfo, isOpen]);

  const validateForm = (formData: FormUpdate) => {
    const validationResult = formSchema.safeParse(formData);
    if (!validationResult.success) {
      return validationResult.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
    }
    return {};
  };

  const handleFormChange = (
    key: keyof FormUpdate,
    value: string | number | Date | null | undefined
  ) => {
    setFormUpdate((prevState) => ({ ...prevState, [key]: value ?? '' }));
    setErrors(validateForm({ ...formUpdate, [key]: value ?? '' }));
  };

  const revokeObjectURL = () => {
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      uploadPhoto(
        { customFileName: 'Avatar' + userInfo.id, file },
        {
          onSuccess: (data) => {
            revokeObjectURL();
            const img = new Image();
            img.onload = () => setPreview(data.thumbnailUrl);
            img.onerror = () => {
              const previewUrl = URL.createObjectURL(file);
              setPreview(previewUrl);
            };
            img.src = data.thumbnailUrl;

            setFormUpdate((prev) => ({ ...prev, avatar: data.imageUrl }));
            toast({
              variant: 'success',
              title: 'Upload ảnh thành công',
              duration: 3000
            });
          },
          onError: () => {
            toast({
              variant: 'destructive',
              title: 'Lỗi khi upload ảnh',
              duration: 3000
            });
          }
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        variant: 'destructive',
        title: 'Lỗi khi upload ảnh',
        duration: 3000
      });
    }
  };

  const handleSubmit = () => {
    revokeObjectURL();
    const updatedErrors = validateForm(formUpdate);
    if (Object.keys(updatedErrors).length > 0) {
      setErrors(updatedErrors);
      return;
    }

    try {
      onUpdate({
        ...formUpdate,
        dateOfBirth:
          __helpers.convertToDate(
            __helpers.parseDate(formUpdate.dateOfBirth) || '',
            'YYYY-MM-DD'
          ) || ''
      });
      toast({
        variant: 'success',
        title: 'Cập nhật hồ sơ thành công',
        duration: 3000
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Cập nhật hồ sơ thất bại',
        duration: 3000
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="mr-4 bg-primary px-6 text-base text-white"
          size={'lg'}
        >
          Chỉnh sửa
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby="dialog-description"
        className=" max-h-[101vh] w-3/5  max-w-screen-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Chỉnh sửa hồ sơ
          </DialogTitle>
        </DialogHeader>

        <DialogDescription />

        <div className="grid grid-cols-2 gap-10">
          {/* Họ */}
          <div className="space-y-1">
            <TextField
              id="lastName"
              label="Họ"
              onChange={(e) => handleFormChange('lastName', e.target.value)}
              value={formUpdate.lastName || ''}
              maxLength={40}
              error={errors.lastName}
            />
          </div>

          {/* Tên */}
          <div className="space-y-1">
            <TextField
              id="firstName"
              label="Tên"
              onChange={(e) => handleFormChange('firstName', e.target.value)}
              value={formUpdate.firstName || ''}
              maxLength={40}
              error={errors.firstName}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          {/* Ảnh */}
          <div className="space-y-1">
            <Label>Hình đại diện</Label>
            <div className="flex justify-center">
              <Avatar className="h-52 w-52 border ">
                <AvatarImage
                  src={preview || userInfo?.avatar}
                  alt={userInfo?.fullName}
                />
                <AvatarFallback className="flex w-full items-center justify-center bg-gray-800 text-8xl font-light text-white">
                  {userInfo?.fullName?.charAt(0).toUpperCase()}
                </AvatarFallback>
                <AvatarOverlay onFileChange={handleFileChange} />
              </Avatar>
            </div>
          </div>

          <div className="grid grid-rows-3 gap-3 ">
            {/* Giới tính */}
            <div className="space-y-1">
              <SelectField
                id="gender"
                label="Giới tính"
                options={genderInit.map((gender) => ({
                  label: gender.valueDisplayed,
                  value: gender.id.toString()
                }))}
                onChange={(gender) =>
                  handleFormChange('gender', parseInt(gender))
                }
                value={formUpdate.gender.toString()}
              />
            </div>

            {/* Ngày sinh */}
            <div className="space-y-1">
              <DatePicker
                id="dateOfBirth"
                label="Ngày sinh"
                value={formUpdate.dateOfBirth || ''}
                onChange={(date) => handleFormChange('dateOfBirth', date)}
                placeholder="Ngày sinh..."
                yearLimit={100}
                limitType="below"
              />
            </div>

            {/* CCCD */}
            <div className="space-y-1">
              <TextField
                id="identityCard"
                label="CCCD"
                onChange={(e) =>
                  handleFormChange('identityCard', e.target.value)
                }
                value={formUpdate.identityCard || ''}
                error={errors.identityCard}
                maxLength={12}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full bg-primary text-base text-white"
            onClick={handleSubmit}
            disabled={Object.keys(errors).length > 0}
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
