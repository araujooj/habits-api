import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';
import IPagination from '@shared/dtos/IPagination';
import { DeleteResult } from 'typeorm';
import { ICreateGroupDTO } from '../dtos/ICreateGroupDTO';
import IFindGroupsDTO from '../dtos/IFindGroupsDTO';
import { ISubscribeToGroupDTO } from '../dtos/ISubscribeToGroupDTO';
import Group from '../infra/typeorm/entities/Group';

export default interface IGroupsRepository {
  findById(id: string): Promise<Group | undefined>;
  findAll(data: IFindGroupsDTO): Promise<[Group[], number]>;
  findInGroup(data: ISubscribeToGroupDTO): Promise<UserGroup | undefined>;
  create(group: ICreateGroupDTO): Promise<Group>;
  save(group: Group): Promise<Group>;
  delete(id: string): Promise<void | DeleteResult>;
  subscribe(data: ISubscribeToGroupDTO): Promise<Group | undefined>;
}
