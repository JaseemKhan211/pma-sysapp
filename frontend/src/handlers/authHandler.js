import { useRouter } from 'next/navigation';
import { login } from '@/services/auth';
import { showsAlert } from '@/utils/alert';

export const useLoginHandler = () => {
  const router = useRouter();

  const handleLogin = async ({ usrid, pw }) => {
    try {
      const data = await login({ usrid, pw });

      if (data?.status === 'success') {
        showsAlert(
          'success',
          'Login successful! Redirecting...'
        );
        setTimeout(() => {
          router.push('/home'); 
        }, 1500);
      } else {
        showsAlert(
          'error',
          'Login failed. Please check your credentials.'
        );
      }
    } catch (err) {
      showsAlert(
        'error',
        err.message || 'Something went wrong!'
      );
    }
  };

  return handleLogin;
};