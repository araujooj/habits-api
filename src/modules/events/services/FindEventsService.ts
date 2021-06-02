import { inject, injectable } from 'tsyringe';
import IPagination from '@shared/dtos/IPagination';
import AppError from '@shared/errors/AppError';
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';
import IFindEventsDTO from '../dtos/IFindEventsDTO';

@injectable()
export default class FindEventsService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ skip, take, group_id }: IFindEventsDTO): Promise<[Event[], number]> {
    const group = await this.groupsRepository.findById(group_id);

    if (!group) {
      throw new AppError('Not found any group with this id');
    }

    const groups = await this.eventsRepository.findAll({ skip, take, group_id });

    return groups;
  }
}
