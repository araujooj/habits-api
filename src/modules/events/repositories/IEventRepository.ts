import IPagination from '@shared/dtos/IPagination';
import { DeleteResult } from 'typeorm';
import IEventDTO from '../dtos/IEventDTO';
import IFindEventsDTO from '../dtos/IFindEventsDTO';

export default interface IEventRepository {
  findById(id: string): Promise<Event | undefined>;
  findAll(data: IFindEventsDTO): Promise<[Event[], number]>;
  create(group: IEventDTO): Promise<Event>;
  save(group: Event): Promise<Event>;
  delete(id: string): Promise<void | DeleteResult>;
}
