import helper from '@/helpers/index';
import { login } from '@/redux/auth.slice';
import { useLayoutEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useDispatch } from 'react-redux';
import authBackground from '../../assets/images/auth/auth-background.svg';
export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  var token = helper.cookie_get('AT');
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (token) {
      dispatch(login());
    }
  }, []);

  return (
    <div className="flex h-screen flex-col justify-between overflow-hidden bg-secondary">
      <div className="flex items-center justify-center">
        <div className="relative h-screen w-1/2">
          <img
            src={authBackground}
            alt="auth-background"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute left-0 top-0 flex items-center gap-5 p-12">
            <img src="/vite.svg" alt="Logo" className="h-16 w-16" />
            <div className="text-3xl font-normal text-white">
              S-Contract Logo
            </div>
          </div>
        </div>
        <div className="flex h-screen w-1/2 flex-col items-center justify-between">
          <main className="w-full flex-1">{children}</main>
          <div className="py-2.5 text-xl font-normal">© 2024 S-Contract</div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
