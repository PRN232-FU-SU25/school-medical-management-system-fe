import BasePages from '@/components/shared/base-pages.js';
import { Input } from '@/components/ui/input';
import helper from '@/helpers/index';
import { login } from '@/redux/auth.slice';
import { useRouter } from '@/routes/hooks';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { Icons } from '@/components/ui/icons';
import { useLogin } from '@/queries/auth.query';
type FormLogin = {
  username: string;
  password: string;
};

type FormError = Partial<FormLogin>;

export default function LoginPage() {
  // const { mutateAsync, isPending } = useLogin();

  const { mutateAsync: loginAccount, isPending } = useLogin();

  const [formLogin, setFormLogin] = useState<FormLogin>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<FormError>({});
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    var token = helper.cookie_get('AT');
    if (token) {
      dispatch(login());
      window.location.href = '/';
    }
  }, []);

  const validateInputs = (): FormError => {
    const errors: FormError = {};
    if (!formLogin.username.trim()) {
      errors.username = 'Tên đăng nhập không được để trống.';
    }
    if (!formLogin.password.trim()) {
      errors.password = 'Mật khẩu không được để trống.';
    }
    return errors;
  };

  const handleLogin = async () => {
    const errors = validateInputs();
    setError(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const model = {
        ...formLogin,
        userNameOrEmail: formLogin.username,
        isRemember: true
      };

      var data = await loginAccount(model);
      helper.cookie_set('AT', data.accessToken);
      helper.cookie_set('RT', data.refreshToken);
      dispatch(login());
      router.push('/');
    } catch (err) {
      setError({ password: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }
  };

  return (
    <>
      <BasePages
        className="relative flex h-full w-full flex-1 items-center justify-center p-4"
        pageHead="Đăng nhập | S-Contract"
      >
        <div className="flex w-full items-center justify-center ">
          <div className="mx-auto w-[500px] rounded-xl bg-background p-4 ">
            <h1 className="flex justify-center text-center text-3xl">
              Đăng nhập
            </h1>
            <div className="mt-5 space-y-2">
              <p className="">Email</p>
              <Input
                className="block w-full rounded-md border border-slate-300 bg-white py-1 pl-5 pr-5 shadow-sm placeholder:font-light placeholder:text-slate-300 focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Nhập email của bạn"
                value={formLogin.username}
                onChange={(e) =>
                  setFormLogin({ ...formLogin, username: e.target.value })
                }
              />
              {error.username && (
                <p className="mt-1 text-xs text-red-500">{error.username}</p>
              )}
              <div className="flex items-center justify-between">
                <p className="font-medium">Mật khẩu</p>
                <div
                  className="flex cursor-pointer items-center gap-1"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? <Icons.eye /> : <Icons.eyeOff />}
                  <p className="ml-1 mr-1">
                    {isPasswordVisible ? 'Ẩn' : 'Hiện'}
                  </p>
                </div>
              </div>

              <Input
                className="block w-full rounded-md border border-slate-300 bg-white py-1 pl-5 pr-5 shadow-sm placeholder:font-light placeholder:text-slate-300 focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Nhập mật khẩu của bạn"
                type={isPasswordVisible ? 'text' : 'password'}
                value={formLogin.password}
                onChange={(e) =>
                  setFormLogin({ ...formLogin, password: e.target.value })
                }
              />

              {error.password && (
                <p className="mt-1 text-xs text-red-500">{error.password}</p>
              )}

              <p className=" underline">
                <a
                  onClick={() => router.push('/forgot-password')}
                  className="cursor-pointer text-[13px] underline"
                >
                  Quên mật khẩu?
                </a>
              </p>
              <div className="flex flex-col items-center gap-4 ">
                <Button
                  className="bg-yellow w-full bg-primary text-white"
                  onClick={handleLogin}
                  disabled={isPending}
                >
                  {isPending ? 'Đang xử lý...' : 'Đăng nhập'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BasePages>
    </>
  );
}
