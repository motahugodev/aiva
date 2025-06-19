import AppProductRegister from '@/components/template/AppProductRegister/AppProductRegister';
import { getCategoriesApi } from '@/services/categories';
import { postProductApi } from '@/services/product';
import type { Form } from '@/types';

import useSWR from 'swr';

export default function ProductsRegister() {
  const postRegister = async (form: Form) => {
    try {
      await postProductApi(form);
    } catch (error) {
      console.log('🚀 ~ postRegister ~ error:', error);
    }
    return;
  };

  const { data: categories = [] } = useSWR('getCategoriesApi', getCategoriesApi);

  return (
    <div className='flex justify-center py-16'>
      <AppProductRegister
        EmitRegister={(event) => postRegister(event)}
        categories={categories}
      ></AppProductRegister>
    </div>
  );
}
