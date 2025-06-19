import { AppLogin } from '@/components/template';
import { PostLoginApi } from '@/services/auth';
import { addToken, addRefreshToken } from '@/utils/cookies';
import { type Auth } from '@/types';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();

  const postLogin = async ({ email, password }) => {
    try {
      const { access_token, refresh_token }: Auth = await PostLoginApi(email, password);

      addToken(access_token);
      addRefreshToken(refresh_token);
      toast.success('Logado com sucesso!');
      navigate('/product/list');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <AppLogin EmitRegister={postLogin}></AppLogin>
    </>
  );
}
