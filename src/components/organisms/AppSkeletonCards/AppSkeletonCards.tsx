import { AppSkeletonCard } from '@/components/molecules';

import { type JSX } from 'react';
interface Props {
  qtd: number;
}

export default function EcommerceCards({ qtd = 0 }: Props) {
  const element: JSX.Element[] = [];
  for (let index = 0; index < qtd; index++) {
    element.push(<AppSkeletonCard key={`skeleton-item-${index}`}></AppSkeletonCard>);
  }
  return <>{element}</>;
}
