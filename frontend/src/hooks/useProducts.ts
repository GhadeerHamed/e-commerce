import { useQuery } from 'react-query';
import { getProducts } from '../api';
import { Product, PaginatedResponse } from '../entities';

const useProducts = (page: number = 1) => {
  return useQuery<PaginatedResponse<Product>, Error>(
    ['products', page],
    () => getProducts(page)
  );
};

export default useProducts; 