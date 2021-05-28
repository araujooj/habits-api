import IEventDTO from '@modules/events/dtos/IEventDTO';
import IFindEventsDTO from '@modules/events/dtos/IFindEventsDTO';
import IEventRepository from '@modules/events/repositories/IEventRepository';
import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';
import IPagination from '@shared/dtos/IPagination';
import { DeleteResult, getRepository, Repository } from 'typeorm';

export default class EventsRepository implements IEventRepository {
  private eventsRepository: Repository<Event>;

  private userGroupsRepository: Repository<UserGroup>;

  constructor() {
    this.eventsRepository = getRepository(Event);
    this.userGroupsRepository = getRepository(UserGroup);
  }

  public async findById(id: string): Promise<Event | undefined> {
    return this.eventsRepository
      .findOne(id)
      .then((group) => group)
      .catch((_) => undefined);
  }

  public async findAll({ skip, take, group_id }: IFindEventsDTO): Promise<[Event[], number]> {
    const events = await this.eventsRepository.find({
      skip,
      take,
      where: {
        group: {
          id: group_id,
        },
      },
    });

    const count = events.length;

    return [events, count];
  }

  public async create(group: IEventDTO): Promise<Event> {
    throw new Error('Method not implemented.');
  }

  public async save(group: Event): Promise<Event> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<void | DeleteResult> {
    throw new Error('Method not implemented.');
  }
}
