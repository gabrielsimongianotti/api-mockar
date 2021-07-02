import { IUser } from '@entities/Users';

export default interface IUsersRepository {
  find(func: (element: IUser) => boolean): Promise<IUser[]>;
  findOne(func: (element: IUser) => boolean): Promise<IUser>;
}