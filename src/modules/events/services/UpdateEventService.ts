import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IGroupsRepository from '../../groups/repositories/IGroupsRepository';
import Event from '../infra/typeorm/entities/Event';
import IEventRepository from '../repositories/IEventsRepository';
import IEventDTO from '../dtos/IEventDTO';

interface IRequest extends IEventDTO {
  id: string;
}

@injectable()
export default class UpdateEventService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventRepository,
  ) {}

  public async execute({
    id, date, group_id, location, title, user_id,
  }: IRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new AppError('Not found any event with this id');
    }

    const userInGroup = await this.groupsRepository.findInGroup({ group_id, user_id });

    if (!userInGroup) {
      throw new AppError('Only users in group can edit the event', 401);
    }

    title ? (event.title = title) : event.title;
    date ? (event.date = date) : event.date;
    location ? (event.location = location) : event.location;

    return this.eventsRepository.save(event);
  }
}
