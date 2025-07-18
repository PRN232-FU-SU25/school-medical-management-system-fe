import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import {
  useLogin,
  useGetGoogleAuthUrl,
  LoginRequest
} from '@/queries/auth.query';
import { useToast } from '@/components/ui/use-toast';
import helpers from '@/helpers';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
  const {
    data: googleAuthUrl,
    isLoading: isLoadingGoogleUrl,
    refetch: fetchGoogleAuthUrl
  } = useGetGoogleAuthUrl();

  const handleGoogleLogin = useCallback(async () => {
    if (!googleAuthUrl) {
      const { data } = await fetchGoogleAuthUrl();
      if (data) {
        window.location.href = data;
      }
    } else {
      window.location.href = googleAuthUrl;
    }
  }, [googleAuthUrl, fetchGoogleAuthUrl]);

  const form = useForm<LoginRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: LoginRequest) => {
    try {
      const response = await login(values);
      if (response) {
        helpers.cookie_set('AT', response.accessToken);
        helpers.cookie_set('RT', response.refreshToken);
        helpers.cookie_set('R', response.role);

        if (response.role === 'Admin' || response.role === 'SchoolNurse') {
          navigate('/dashboard');
        } else {
          navigate('/dashboard/student-records');
        }
        toast({
          title: 'Đăng nhập thành công',
          description: 'Chào mừng bạn quay trở lại!',
          duration: 3000
        });
      } else {
        toast({
          title: 'Đăng nhập thất bại',
          description: 'Vui lòng kiểm tra lại thông tin đăng nhập',
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight text-teal-900">
            Đăng nhập
          </CardTitle>
          <CardDescription>
            Đăng nhập để truy cập hệ thống quản lý y tế học đường
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@school.edu.vn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Icons.eyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Icons.eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-teal-600 hover:text-teal-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Đăng nhập
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={isLoadingGoogleUrl}
                >
                  {isLoadingGoogleUrl ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg
                      viewBox="-3 0 262 262"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                      fill="#000000"
                      className="mr-2 h-4 w-4"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                          fill="#4285F4"
                        ></path>
                        <path
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                          fill="#FBBC05"
                        ></path>
                        <path
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                          fill="#EB4335"
                        ></path>
                      </g>
                    </svg>
                  )}
                  Đăng nhập với Google
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <Link
                  to="/register"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Đăng ký ngay
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
