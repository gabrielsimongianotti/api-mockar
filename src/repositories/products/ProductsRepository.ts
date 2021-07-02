import IProductsRepository from './IProductsRepository';
import fs from "fs";
import getStream from "get-stream";
import path from "path";

import { IProduct } from '@entities/Product';

class ProductsRepository implements IProductsRepository {

  public async find(func: (element: IProduct) => boolean): Promise<IProduct[]> {
    let findProduct: IProduct[] = [];

    const stream = await fs.createReadStream(
      path.join(__dirname, '../../entities/data/products.txt'),
      'utf8'
    );

    let readFile = '['
    readFile += await getStream(stream);
    readFile = readFile.split('}').join('},').slice(0, -1);
    readFile += ']';

    const product: IProduct[] = JSON.parse(readFile);

    for (let key = 0; key < product.length; key++) {
      if (await func(product[key])) {
        findProduct.push(product[key]);
      }
    }
    return findProduct;
  }
}

export default ProductsRepository;
