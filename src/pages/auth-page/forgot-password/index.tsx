import BasePages from '@/components/shared/base-pages.js';
import { Input } from '@/components/ui/input';
import { useForgotPassword } from '@/queries/auth.query';
import { useRouter } from '@/routes/hooks';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type FormForgotPassword = {
  email: string;
};

type FormError = Partial<FormForgotPassword>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const { mutateAsync, isPending } = useForgotPassword();
  const [formForgotPassword, setFormForgotPassword] =
    useState<FormForgotPassword>({
      email: ''
    });
  const [error, setError] = useState<FormError>({});
  const router = useRouter();

  const validateInputs = (): FormError => {
    const errors: FormError = {};
    if (!formForgotPassword.email.trim()) {
      errors.email = 'Email không được để trống.';
    } else if (!/\S+@\S+\.\S+/.test(formForgotPassword.email)) {
      errors.email = 'Email không hợp lệ.';
    }
    return errors;
  };

  const handleForgotPassword = async () => {
    const errors = validateInputs();
    setError(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const data = await mutateAsync({
        email: formForgotPassword.email,
        clientUri: 'http://localhost:3000/new-password'
      });
      if (data) {
        console.log('Yêu cầu đặt lại mật khẩu đã được gửi');
        router.push('/login');
        toast({
          variant: 'success',
          title: 'Thành công',
          description:
            'Đã gửi email xác nhận. Vui lòng kiểm tra email của bạn.',
          duration: 3000
        });
      }
    } catch (err) {
      setError({ email: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    }
  };

  return (
    <>
      <BasePages
        className="relative flex h-full w-full flex-1 items-center justify-center p-4"
        pageHead="Quên mật khẩu | S-Contract"
      >
        <div className="flex w-full items-center justify-center">
          <div className="mx-auto w-[500px] rounded-xl bg-background p-4">
            <h1 className="flex justify-center text-center text-3xl">
              Quên mật khẩu
            </h1>
            <p className="mt-3 text-center text-[13px] text-muted-foreground">
              Nhập email của bạn để lấy lại mật khẩu.
            </p>
            <div className="mt-5 space-y-2">
              <p className="font-medium">Email</p>
              <Input
                className="block w-full rounded-md border border-slate-300 bg-white py-1 pl-5 pr-5 shadow-sm placeholder:font-light placeholder:text-slate-300 focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Nhập email của bạn"
                value={formForgotPassword.email}
                onChange={(e) =>
                  setFormForgotPassword({
                    ...formForgotPassword,
                    email: e.target.value
                  })
                }
              />
              {error.email && (
                <p className="mt-1 text-xs text-red-500">{error.email}</p>
              )}

              <div className="flex flex-col items-center gap-4">
                <Button
                  className="bg-yellow w-full bg-primary text-white"
                  onClick={handleForgotPassword}
                  disabled={isPending}
                >
                  {isPending ? 'Đang xử lý...' : 'Gửi xác nhận'}
                </Button>
              </div>

              <p className="mt-5 text-center">
                <a
                  onClick={() => router.push('/login')}
                  className="cursor-pointer text-[13px] underline"
                >
                  Quay lại đăng nhập
                </a>
              </p>
            </div>
          </div>
        </div>
      </BasePages>
    </>
  );
}
