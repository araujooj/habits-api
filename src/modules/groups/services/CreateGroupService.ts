import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IGroupsRepository from '../repositories/IGroupsRepository';
import { ICreateGroupDTO } from '../dtos/ICreateGroupDTO';
import Group from '../infra/typeorm/entities/Group';

@injectable()
export default class CreateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({
    category,
    creator_id,
    description,
    name,
  }: ICreateGroupDTO): Promise<Group> {
    const group = await this.groupsRepository.create({
      category,
      creator_id,
      description,
      name,
    });

    return group;
  }
}
