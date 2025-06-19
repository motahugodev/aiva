import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <section className='mx-auto my-28 max-w-7xl flex justify-center items-center h-full'>
      <Outlet />
    </section>
  );
}
