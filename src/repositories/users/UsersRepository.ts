import IUsersRepository from './IUsersRepository';
import fs from "fs";
import getStream from "get-stream";
import path from "path";

import { IUser } from '@entities/Users';

class UsersRepository implements IUsersRepository {

  public async find(func: (element: IUser) => boolean): Promise<IUser[]> {
    let findUser: IUser[] = [];

    const stream = await fs.createReadStream(
      path.join(__dirname, '../../entities/data/users.json'),
    );

    const readFile: IUser[] = JSON.parse(await getStream(stream));

    readFile.map((user) => {
      if (func(user)) findUser.push(user);
    });

    return findUser;
  }

  public async findOne(func: (element: IUser) => boolean): Promise<IUser> {
    let findUser: IUser[];
    const stream = await fs.createReadStream(
      path.join(__dirname, '../../entities/data/users.json'),
    );

    const readFile: IUser[] = JSON.parse(await getStream(stream));

    findUser = readFile.filter((user) => func(user));

    return findUser[0]
  }
}

export default UsersRepository;
