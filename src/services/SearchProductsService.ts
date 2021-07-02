
import { injectable, inject } from 'tsyringe';

import IProductsRepository from '@repositories/products/IProductsRepository';
import IOrganizationRepository from '@repositories/organization/IOrganizationRepository';
import IUsersRepository from '@repositories/users/IUsersRepository';

import { IProduct } from '@entities/Product';
import { IUser } from '@entities/Users';
import { IOrganization } from "@entities/Organization"

import AppError from '@erros/AppError';

interface IRequestDTO {
  organizationName: string;
  user_id: string;
  tags?: string[];
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrganizationRepository')
    private organizationRepository: IOrganizationRepository,
  ) { }

  public async execute({ organizationName, tags, user_id }: IRequestDTO): Promise<IProduct[]> {
    let products: IProduct[] = [];

    const user = await this.usersRepository.findOne((user: IUser) => user.userId === user_id);

    if (user.roles[0] === 'intern' && organizationName !== 'STUFF A') {
      throw new AppError('invalid data', 401);
    }

    const level = this.convertRolesToLevel(user.roles[0])

    const organizations = await this.organizationRepository.find((orgazinization: IOrganization) => orgazinization.name === organizationName && level.indexOf(orgazinization.level) !== -1)

    if (tags.length) {
      products = await this.productsRepository.find((product: IProduct) => {
        for (let key = 0; key < product.tags.length; key++) {
          return tags.indexOf(product.tags[key]) > -1 && organizations.map((organization) => organization.name).indexOf(product.department) > -1;
        }
      });
    }

    return products;
  }

  private convertRolesToLevel(roles: string): number[] {
    if (roles === 'senior') {
      return [0, 1, 2]
    } else if (roles === "middle") {
      return [1, 2]
    } else if (roles === "junior") {
      return [2]
    } else if (roles === "intern") {
      return [0, 1, 2]
    }

  }
}