import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '@services/AuthenticateUserService'

export default class UsersController {
  public async session(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const user = await authenticateUser.execute({ email, password });

    return response.json(classToClass(user));
  }
}