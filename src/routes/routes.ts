import { createBrowserRouter } from 'react-router';
import { AuthLayout, BaseLayout } from '@/layout';
import { Products, ProductDetail, Login, Register, Category, ProductList } from '@/pages';
import PrivateRoute from './protected';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: BaseLayout,
    children: [
      { index: true, Component: Products },
      { path: 'product/detail/:slug', Component: ProductDetail },
      { path: 'categories/:slug', Component: Category },
      {
        path: 'auth',
        Component: AuthLayout,
        children: [{ path: 'login', Component: Login }],
      },
      {
        Component: PrivateRoute,
        path: 'product',
        children: [
          { path: 'register', Component: Register },
          { path: 'edit/:id', Component: Register },
          { path: 'list', Component: ProductList },
        ],
      },
    ],
  },
]);
