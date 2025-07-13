import BasePages from '@/components/shared/base-pages.js';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useSearchParams } from 'react-router-dom';
// import { useResetPassword } from '@/queries/auth.query';
import { useRouter } from '@/routes/hooks';
import { useToast } from '@/components/ui/use-toast';

type FormNewPassword = {
  newPassword: string;
  confirmPassword: string;
};

type FormError = Partial<FormNewPassword>;

export default function NewPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  // const { mutateAsync: reset } = useResetPassword();
  const [formNewPassword, setFormNewPassword] = useState<FormNewPassword>({
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<FormError>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const validateInputs = (): FormError => {
    const errors: FormError = {};
    if (!formNewPassword.newPassword.trim()) {
      errors.newPassword = 'Mật khẩu mới không được để trống.';
    }
    if (formNewPassword.newPassword !== formNewPassword.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }
    return errors;
  };

  const handleNewPasswordSubmit = async () => {
    const errors = validateInputs();
    setError(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Mật khẩu hợp lệ, tiếp tục gửi yêu cầu.');
    }

    // const data = await reset({
    //   ...formNewPassword,
    //   userId: userId,
    //   token: token
    // });
    // if (data) {
    //   router.push('/login');
    //   toast({
    //     variant: 'success',
    //     title: 'Thành công',
    //     description: 'Đặt lại mật khẩu thành công.',
    //     duration: 3000
    //   });
    // }
  };

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    const userIdFromUrl = searchParams.get('userId');

    if (tokenFromUrl) setToken(tokenFromUrl);
    if (userIdFromUrl) setUserId(userIdFromUrl);
  }, []);

  return (
    <BasePages
      className="relative flex h-full w-full flex-1 items-center justify-center p-4"
      pageHead="Tạo mật khẩu mới | S-Contract"
    >
      <div className="flex w-full items-center justify-center">
        <div className="mx-auto w-[500px] rounded-xl bg-background p-4">
          <h1 className="flex justify-center text-center text-3xl">
            Tạo mật khẩu mới
          </h1>
          <p className="mt-2 text-center text-[13px] text-muted-foreground">
            Đảm bảo khác với những mật khẩu cũ
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">Mật khẩu mới</p>
              <div
                className="flex cursor-pointer items-center gap-1"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <Icons.eye /> : <Icons.eyeOff />}
                <p className="ml-1 mr-1 text-gray-700">
                  {isPasswordVisible ? 'Ẩn' : 'Hiện'}
                </p>
              </div>
            </div>

            <Input
              className="block w-full rounded-md border border-slate-300 bg-white py-1 pl-5 pr-5 shadow-sm placeholder:font-light placeholder:text-slate-300 focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Nhập mật khẩu mới"
              type={isPasswordVisible ? 'text' : 'password'}
              value={formNewPassword.newPassword}
              onChange={(e) =>
                setFormNewPassword({
                  ...formNewPassword,
                  newPassword: e.target.value
                })
              }
            />
            {error.newPassword && (
              <p className="mt-1 text-xs text-red-500">{error.newPassword}</p>
            )}

            <div className="flex items-center justify-between">
              <p className="font-medium">Xác nhận mật khẩu</p>
              <div
                className="flex cursor-pointer items-center gap-1"
                onClick={toggleConfirmPasswordVisibility}
              >
                {isConfirmPasswordVisible ? <Icons.eye /> : <Icons.eyeOff />}
                <p className="ml-1 mr-1 text-gray-700">
                  {isConfirmPasswordVisible ? 'Ẩn' : 'Hiện'}
                </p>
              </div>
            </div>

            <Input
              className="block w-full rounded-md border border-slate-300 bg-white py-1 pl-5 pr-5 shadow-sm placeholder:font-light placeholder:text-slate-300 focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Nhập lại mật khẩu mới"
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              value={formNewPassword.confirmPassword}
              onChange={(e) =>
                setFormNewPassword({
                  ...formNewPassword,
                  confirmPassword: e.target.value
                })
              }
            />
            {error.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {error.confirmPassword}
              </p>
            )}

            <div className="mt-5 flex flex-col items-center gap-4">
              <Button
                className="bg-yellow w-full bg-primary text-white"
                onClick={handleNewPasswordSubmit}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BasePages>
  );
}
