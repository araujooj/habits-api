import IPagination from '@shared/dtos/IPagination';
import { DeleteResult } from 'typeorm';
import Notification from '../infra/typeorm/entities/Notification';

export default interface INotificationsRepository {
  findById(id: string): Promise<Notification | undefined>;
  findAll(data: IPagination): Promise<[Notification[], number]>;
  create(notification: Notification): Promise<Notification>;
  save(notification: Notification): Promise<Notification>;
  delete(id: string): Promise<void | DeleteResult>;
}
