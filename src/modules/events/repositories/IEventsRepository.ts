import IPagination from '@shared/dtos/IPagination';
import { DeleteResult } from 'typeorm';
import Event from '@modules/events/infra/typeorm/entities/Event';
import IEventDTO from '../dtos/IEventDTO';
import IFindEventsDTO from '../dtos/IFindEventsDTO';

export default interface IEventRepository {
  findById(id: string): Promise<Event | undefined>;
  findAll(data: IFindEventsDTO): Promise<[Event[], number]>;
  create(event: IEventDTO): Promise<Event>;
  save(event: Event): Promise<Event>;
  delete(id: string): Promise<void | DeleteResult>;
}
