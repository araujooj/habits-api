import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import IGroupsRepository from '../repositories/IGroupsRepository';

interface IRequest {
  id: string;
  creator_id: string;
}

@injectable()
export default class DeleteGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ id, creator_id }: IRequest): Promise<void | DeleteResult> {
    const group = await this.groupsRepository.findById(id);

    if (!group) {
      throw new AppError('Not found a group with this id');
    }

    if (group.creator.id !== creator_id) {
      throw new AppError('Only the group creator can delete the group', 401);
    }

    return this.groupsRepository.delete(id);
  }
}
