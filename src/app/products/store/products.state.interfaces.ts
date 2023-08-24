import { IProduct, IErrors } from '../interfaces/products.interfaces';

export interface IProductsState {
  isLoading: boolean;
  products: IProduct[];
  product: IProduct | null;
  error: IErrors | null;
  photo: string,
  productsInBag: IProduct[]
}
