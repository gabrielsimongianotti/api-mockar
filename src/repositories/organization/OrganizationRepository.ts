import IOrganizationRepository from './IOrganizationRepository';
import fs from "fs";
import getStream from "get-stream";
import path from "path";

import { IOrganization } from '@entities/Organization';

class OrganizationRepository implements IOrganizationRepository {
  public async find(func: (element: IOrganization) => boolean): Promise<IOrganization[]> {
    let findOrganization: IOrganization[] = [];

    const stream = await fs.createReadStream(
      path.join(__dirname, '../../entities/data/organization.json'),
    );

    const readFile: IOrganization[] = JSON.parse(await getStream(stream));

    readFile.map((organization) => {
      if (func(organization)) findOrganization.push(organization);
    });

    return findOrganization;
  }
}

export default OrganizationRepository;
