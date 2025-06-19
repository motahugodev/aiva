import AppLogin from '@/components/template/AppLogin/AppLogin';
import { PostLoginApi } from '@/services/auth';
import { addToken, addRefreshToken } from '@/utils/cookies';
import { type Auth } from '@/types';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();

  const postLogin = async ({ email, password }) => {
    try {
      const { access_token, refresh_token }: Auth = await PostLoginApi(email, password);
      
      addToken(access_token);
      addRefreshToken(refresh_token);

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
