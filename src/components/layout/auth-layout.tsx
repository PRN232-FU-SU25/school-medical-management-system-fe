import helper from '@/helpers/index';
import { login } from '@/redux/auth.slice';
import { useLayoutEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useDispatch } from 'react-redux';
import { Icons } from '@/components/ui/icons';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const token = helper.cookie_get('AT');
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (token) {
      dispatch(login());
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left side - Branding and Image */}
        <div className="relative flex flex-1 flex-col justify-between bg-gradient-to-br from-teal-600 to-cyan-700 p-8 text-white lg:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Icons.medical className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Y tế Học đường</span>
          </div>

          <div className="my-auto space-y-6 py-12">
            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
              Chăm sóc sức khỏe <br />
              học sinh
            </h1>
            <p className="text-xl text-teal-100">
              Hệ thống quản lý y tế trường học hiện đại, đảm bảo sức khỏe cho
              thế hệ tương lai
            </p>

            {/* Medical illustration or pattern */}
            <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 opacity-10">
              <Icons.stethoscope className="h-full w-full" />
            </div>
          </div>

          <div className="hidden space-y-4 lg:block">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-teal-500/20 p-1">
                <Icons.shieldCheck className="h-5 w-5 text-teal-200" />
              </div>
              <span className="text-sm text-teal-100">An toàn và Bảo mật</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-teal-500/20 p-1">
                <Icons.activity className="h-5 w-5 text-teal-200" />
              </div>
              <span className="text-sm text-teal-100">
                Theo dõi sức khỏe thời gian thực
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-teal-500/20 p-1">
                <Icons.users className="h-5 w-5 text-teal-200" />
              </div>
              <span className="text-sm text-teal-100">
                Kết nối giữa nhà trường và phụ huynh
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex flex-1 flex-col items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md space-y-8">{children}</div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Y tế Học đường. Bảo lưu mọi quyền.
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
