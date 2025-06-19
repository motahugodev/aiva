import { httpGet, httpPost, httpDelete, httpPut } from '@/plugins/http';
import type { Product, Form } from '@/types';

export const getProductsApi = async (): Promise<Product[]> => {
  try {
    const data = await httpGet({ url: '/products?limit=100&offset=0' });
    return data as Product[];
  } catch {
    throw new Error('Err');
  }
};

export const getProductsSlugApi = async (slug?: string): Promise<Product> => {
  try {
    const data = await httpGet({ url: '/products/slug/' + slug });
    return data as Promise<Product>;
  } catch {
    throw new Error('Err');
  }
};

export const getProductsEdit = async (id?: string): Promise<Product> => {
  try {
    const data = await httpGet({ url: '/products/' + id });
    return data as Promise<Product>;
  } catch {
    throw new Error('Err');
  }
};

export const postProductApi = async (body: Form): Promise<Form> => {
  try {
    const data = await httpPost({ url: '/products/', body });
    return data as Promise<Form>;
  } catch {
    throw new Error('Err');
  }
};

export const deleteProductApi = async (id: number): Promise<Form> => {
  try {
    const data = await httpDelete({ url: '/products/' + id });
    return data as Promise<Form>;
  } catch {
    throw new Error('Err');
  }
};
export const putProductApi = async (id: string, body: Form): Promise<Form> => {
  try {
    const data = await httpPut({ url: '/products/' + id, body });
    return data as Promise<Form>;
  } catch {
    throw new Error('Err');
  }
};

export const postUpload = async (image): Promise<Form> => {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const data = await httpPost({ url: '/files/upload', body: formData });
    return data as Promise<Form>;
  } catch {
    throw new Error('Err');
  }
};
