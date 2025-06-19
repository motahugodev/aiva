import { AppDetail, AppGallery } from '@/components/molecules';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

const AppProductDetail: React.FC<Props> = ({ product }) => {
  return (
    <section>
      <AppDetail product={product}>
        <AppGallery images={product.images}></AppGallery>
      </AppDetail>
    </section>
  );
};

export default AppProductDetail;
