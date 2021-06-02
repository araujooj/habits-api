import IEventDTO from '@modules/events/dtos/IEventDTO';
import IFindEventsDTO from '@modules/events/dtos/IFindEventsDTO';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';
import IPagination from '@shared/dtos/IPagination';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import Event from '@modules/events/infra/typeorm/entities/Event';

export default class EventsRepository implements IEventsRepository {
  private eventsRepository: Repository<Event>;

  constructor() {
    this.eventsRepository = getRepository(Event);
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

  public async create({
    date, group_id, location, title,
  }: IEventDTO): Promise<Event> {
    const event = this.eventsRepository.create({
      date,
      group: { id: group_id },
      location,
      title,
    });

    await this.eventsRepository.save(event);

    return event;
  }

  public async save(event: Event): Promise<Event> {
    const newEvent = await this.eventsRepository.save(event);

    return newEvent;
  }

  public async delete(id: string): Promise<void | DeleteResult> {
    return this.eventsRepository.delete(id);
  }
}
