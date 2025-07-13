import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGoogleToken } from '@/queries/auth.query';
import { useToast } from '@/components/ui/use-toast';
import helpers from '@/helpers';
import { Icons } from '@/components/ui/icons';

export default function OAuth2Page() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: authenticateGoogle } = useGoogleToken();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      toast({
        title: 'Lỗi xác thực',
        description: 'Không tìm thấy token xác thực',
        variant: 'destructive',
        duration: 3000
      });
      navigate('/login');
      return;
    }

    const handleAuthentication = async () => {
      try {
        const response = await authenticateGoogle({ idToken: token });
        if (response) {
          helpers.cookie_set('AT', response.accessToken);
          helpers.cookie_set('RT', response.refreshToken);
          toast({
            title: 'Đăng nhập thành công',
            description: 'Chào mừng bạn quay trở lại!',
            duration: 3000
          });
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Google authentication error:', error);
        toast({
          title: 'Lỗi xác thực',
          description: 'Không thể xác thực với Google. Vui lòng thử lại.',
          variant: 'destructive',
          duration: 3000
        });
        navigate('/login');
      }
    };

    handleAuthentication();
  }, [searchParams, authenticateGoogle, navigate, toast]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-teal-50 to-cyan-50">
      <div className="text-center">
        <Icons.spinner className="mx-auto h-8 w-8 animate-spin text-teal-600" />
        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          Đang xác thực...
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Vui lòng đợi trong giây lát
        </p>
      </div>
    </div>
  );
}
