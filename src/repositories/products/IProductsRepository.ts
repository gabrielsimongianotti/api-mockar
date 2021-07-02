import { IProduct } from '@entities/Product';

export default interface IProductsRepository {
  find(func: (element: IProduct) => boolean): Promise<IProduct[]>;
}