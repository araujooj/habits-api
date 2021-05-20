import IPagination from '@shared/dtos/IPagination';
import { DeleteResult } from 'typeorm';
import { ICreateGroupDTO } from '../dtos/ICreateGroupDTO';
import Group from '../infra/typeorm/entities/Group';

export default interface IGroupsRepository {
    findById(id: string): Promise<Group | undefined>;
    findAll(pagination: IPagination): Promise<Group[]>;
    create(group: ICreateGroupDTO): Promise<Group>;
    save(group: Group): Promise<Group>;
    delete(id: string): Promise<void | DeleteResult>;
}
