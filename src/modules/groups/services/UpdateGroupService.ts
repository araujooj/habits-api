import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IGroupsRepository from '../repositories/IGroupsRepository';
import { IUpdateGroupDTO } from '../dtos/IUpdateGroupDTO';
import Group from '../infra/typeorm/entities/Group';

@injectable()
export default class UpdateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({
    id,
    category,
    description,
    name,
    creator_id,
  }: IUpdateGroupDTO): Promise<Group> {
    const group = await this.groupsRepository.findById(id);

    if (!group) {
      throw new AppError('Not found any group with this id');
    }

    if (creator_id !== group.creator.id) {
      throw new AppError('Only the group creator can edit the group', 401);
    }

    category ? (group.category = category) : group.category;
    description ? (group.description = description) : group.description;
    name ? (group.name = name) : group.name;

    return this.groupsRepository.save(group);
  }
}
