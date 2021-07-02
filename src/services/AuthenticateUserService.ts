
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@repositories/users/IUsersRepository';
import ITokenRepository from '@repositories/token/ITokenRepository';

import AppError from '@erros/AppError';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {

  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenRepository')
    private tokenRepository: ITokenRepository,
  ) { }
  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const user = await this.usersRepository.findOne((user) => user.email === email);
    if (!user) {
      throw new AppError('Email/Password does not match.', 401);
    }

    const validationPassword = await this.usersRepository.find((user) => user.password === password);

    if (!validationPassword) {
      throw new AppError('Email/Password does not match.', 401);
    }

    const { token } = await this.tokenRepository.generate(user.userId);

    return { token }
  }
}