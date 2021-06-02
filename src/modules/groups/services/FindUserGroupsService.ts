import { inject, injectable } from 'tsyringe';
import IGroupsRepository from '../repositories/IGroupsRepository';
import Group from '../infra/typeorm/entities/Group';
import IFindUserGroupDTO from '../dtos/IFindUserGroupDTO';

@injectable()
export default class FindUserGroupsService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ user_id, skip, take }: IFindUserGroupDTO) {
    const userGroups = await this.groupsRepository.findGroupsByUser({
      user_id,
      skip,
      take,
    });

    return userGroups;
  }
}
