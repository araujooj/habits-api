import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { DeleteResult } from 'typeorm';
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import IEventRepository from '../repositories/IEventsRepository';

interface IRequest {
  id: string;
  creator_id: string;
}

@injectable()
export default class DeleteEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ id, creator_id }: IRequest): Promise<void | DeleteResult> {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new AppError('Not found any event with this id');
    }

    const group = await this.groupsRepository.findById(event.group_id);

    if (creator_id !== group?.creator.id) {
      throw new AppError('Only the group creator can delete the event', 401);
    }

    return this.eventsRepository.delete(id);
  }
}
