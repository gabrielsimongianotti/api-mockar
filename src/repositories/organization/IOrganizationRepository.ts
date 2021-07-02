import { IOrganization } from '@entities/Organization';

export default interface IOrganizationRepository {
  find(func: (element: IOrganization) => boolean): Promise<IOrganization[]>;
}