import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IGroupsRepository from '../repositories/IGroupsRepository';
import Group from '../infra/typeorm/entities/Group';

interface IRequest {
  group_id: string;
  user_id: string;
}

@injectable()
export default class SubscribeToGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ group_id, user_id }: IRequest): Promise<Group> {
    if (!group_id) {
      throw new AppError('Group not found', 404);
    }

    const userInGroup = await this.groupsRepository.findInGroup({ group_id, user_id });

    if (userInGroup) {
      throw new AppError('User is already in this group', 401);
    }

    const subscription = await this.groupsRepository.subscribe({ group_id, user_id });

    if (!subscription) {
      throw new AppError('Error during the creation of subscription', 500);
    }

    return subscription;
  }
}
