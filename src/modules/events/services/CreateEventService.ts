import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';
import IEventDTO from '../dtos/IEventDTO';

@injectable()
export default class CreateEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({
    date, group_id, location, title, user_id,
  }: IEventDTO): Promise<Event> {
    const group = await this.groupsRepository.findById(group_id);
    const userInGroup = await this.groupsRepository.findInGroup({
      group_id,
      user_id,
    });

    if (!group) {
      throw new AppError('Not found any group with this id');
    }

    if (!userInGroup) {
      throw new AppError('Only users on group can create an event', 401);
    }

    const event = await this.eventsRepository.create({
      title,
      date,
      location,
      user_id,
      group_id,
    });

    return event;
  }
}
