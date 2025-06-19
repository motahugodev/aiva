import { httpPost, httpGet } from '@/plugins/http';
import { type Auth } from '@/types';

 export const PostLoginApi = async (email: string, password: string): Promise<Auth> => {
  try {
    const data = await httpPost({ url: '/auth/login', body: { email, password } });
    return data as Auth;
  } catch {
    throw new Error('Err');
  }
};

export const PostRefreshTokenApi = async (): Promise<Auth> => {
  try {
    const data = await httpPost({ url: '/auth/refresh-token' });
    return data as Auth;
  } catch {
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
