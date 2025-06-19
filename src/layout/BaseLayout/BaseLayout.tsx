import { Outlet } from 'react-router';
import AppHeader from '@/components/organisms/AppHeader/AppHeader';
import { getCategoriesApi } from '@/services/categories';
import { getProfile } from '@/services/auth';
import useSWR from 'swr';

export default function BaseLayout() {

  const { data = [] } = useSWR('getCategoriesApi', getCategoriesApi);
  const { data: profile = [] } = useSWR('getProfile', getProfile);

  return (
    <div>
      <AppHeader categories={data} profile={profile} />
      <main className='mx-auto max-w-7xl  h-full'>
        <Outlet />
      </main>
    </div>
  );
}
