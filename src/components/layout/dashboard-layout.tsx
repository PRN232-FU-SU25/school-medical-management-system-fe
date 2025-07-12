import { setUserInfo } from '@/redux/auth.slice';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useDispatch } from 'react-redux';
import Footer from '../shared/footer';
import HeaderNav from '../shared/header-nav';
import Sidebar from '../shared/sidebar';
import { useGetProfile } from '@/queries/auth.query';
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { data: infoUser } = useGetProfile();

  useEffect(() => {
    if (infoUser) {
      dispatch(setUserInfo(infoUser));
    }
  }, [infoUser]);

  return (
    <div className="flex h-screen flex-col justify-between overflow-hidden bg-secondary">
      <HeaderNav />
      <div className="flex h-[calc(100vh-72px)]">
        <Sidebar />
        <div className="flex flex-1 flex-col justify-between overflow-y-auto">
          <main className="mx-auto w-full max-w-[1920px] px-6 py-6">
            {children}
          </main>
          <Footer />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
