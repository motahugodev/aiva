import { AppProductRegister } from '@/components/template';
import { getCategoriesApi } from '@/services/categories';
import { postProductApi, getProductsEdit, putProductApi } from '@/services/product';
import type { Form, Product } from '@/types';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

export default function ProductsRegister() {
  type RouterParams = {
    id?: string;
  };
  const [product, setProduct] = useState<Product>();
  const { id } = useParams<RouterParams>();

  const navigate = useNavigate();

  const handlerSubmit = (form: Form) => {
    if (id) {
      editProduct(form);
    } else {
      postProduct(form);
    }
  };

  const postProduct = async (form: Form) => {
    try {
      await postProductApi(form);
      navigate('/product/list');
      toast.success('Salvo com sucesso');
    } catch {
      throw new Error();
    }
    return;
  };

  const editProduct = async (form: Form) => {
    try {
      await putProductApi(id, form);
      toast.success('Alterado com sucesso');
    } catch {
      throw new Error();
    }
    return;
  };

  const { data: categories = [] } = useSWR('getCategoriesApi', getCategoriesApi);

  useEffect(() => {
    if (!id) return;
    getProductsEdit(id).then((data: Product) => setProduct(data));
  }, [id]);

  return (
    <div className='flex justify-center py-16'>
      <AppProductRegister
        EmitRegister={(event) => handlerSubmit(event)}
        categories={categories}
        product={product}
        isEdit={!!id}
      ></AppProductRegister>
    </div>
  );
}
