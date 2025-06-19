import { createBrowserRouter } from 'react-router';
import { AuthLayout, BaseLayout } from '@/layout';
import { Products, ProductDetail, Login, Register, Category, ProductList } from '@/pages';

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
        path: 'product',
        children: [
          { path: 'register', Component: Register },
          { path: 'list', Component: ProductList },
        ],
      },
      //   {
      //     path: "concerts",
      //     children: [
      //       { index: true, Component: ConcertsHome },
      //       { path: ":city", Component: ConcertsCity },
      //       { path: "trending", Component: ConcertsTrending },
      //     ],
      //   },
    ],
  },
]);
