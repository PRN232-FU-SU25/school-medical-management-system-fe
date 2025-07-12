import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useRouter } from '@/routes/hooks';

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push('/login');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border-[2px] border-primary bg-white p-8 text-center shadow-2xl">
        <CheckCircle className="mx-auto text-green-500" size={50} />
        <h1 className="mb-4 text-3xl font-semibold text-[#0369A1]">
          Xác thực thành công!
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Bạn sẽ được chuyển về trang đăng nhập trong {seconds} giây.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="transform rounded-lg bg-[#023C6B] px-6 py-2 text-lg text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-[#01508A]"
        >
          Quay Về Trang Đăng Nhập
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
