import { container } from 'tsyringe';

import IUsersRepository from '@repositories/users/IUsersRepository';
import UsersRepository from '@repositories/users/UsersRepository';

import ITokenRepository from '@repositories/token/ITokenRepository';
import TokenRepository from '@repositories/token/TokenRepository';

import IProductsRepository from '@repositories/products/IProductsRepository';
import ProductsRepository from '@repositories/products/ProductsRepository';

import IOrganizationRepository from '@repositories/organization/IOrganizationRepository';
import OrganizationRepository from '@repositories/organization/OrganizationRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITokenRepository>(
  'TokenRepository',
  TokenRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrganizationRepository>(
  'OrganizationRepository',
  OrganizationRepository,
);