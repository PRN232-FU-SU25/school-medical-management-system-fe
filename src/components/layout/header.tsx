import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  variant?: 'public' | 'dashboard';
}

export default function Header({ variant = 'public' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <img
            src="/images/Logo_THPT_Chu_Van_An.jpg"
            alt="Logo trường THPT Chu Văn An"
            className="h-16 w-16 rounded-lg"
          />
          <div>
            <h1 className="text-xl font-bold text-blue-900">
              Trường THPT Chu Văn An
            </h1>
            <p className="text-sm text-gray-600">
              Hệ thống quản lý y tế học đường
            </p>
          </div>
        </div>
        {variant === 'public' ? (
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link to="/">Trang chủ</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/blog">Tin tức</Link>
            </Button>
            <Button asChild variant="ghost">
              <a href="/#resources">Tài nguyên</a>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Đăng nhập hệ thống</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Dashboard specific buttons/actions can be added here */}
          </div>
        )}
      </div>
    </header>
  );
}
