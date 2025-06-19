import { httpPost, httpGet } from '@/plugins/http';
import { type Auth } from '@/types';
import { addToken, removerRefreshToken, removerToken } from '@/utils/cookies';

export const PostLoginApi = async (email: string, password: string): Promise<Auth> => {
  try {
    const data = await httpPost({ url: '/auth/login', body: { email, password } });
    return data as Auth;
  } catch {
    throw new Error('Err');
  }
};

export const postRefreshTokenApi = async (
  reflesh_token: string,
): Promise<{ access_token: string }> => {
  try {
    const data: { access_token: string } = await httpPost({
      url: '/auth/refresh-token',
      body: reflesh_token,
    });
    addToken(data);

    return data as { access_token: string };
  } catch {
    removerRefreshToken();
    removerToken();
    throw new Error('Err');
  }
};

export const getProfile = async (): Promise<Auth> => {
  try {
    const data = await httpGet({ url: '/auth/profile' });
    return data as Auth;
  } catch {
    throw new Error('Err');
  }
};
