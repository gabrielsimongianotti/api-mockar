import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ProductsService from '@services/SearchProductsService'

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { organizationName } = request.params;
    const { user_id } = request.user
    const searchProducts = container.resolve(ProductsService);
    const tags: string[] = JSON.parse(JSON.stringify(request.query.tags))

    const products = await searchProducts.execute({ organizationName, tags, user_id });

    return response.json(classToClass({ total: products.length, products }));
  }
}