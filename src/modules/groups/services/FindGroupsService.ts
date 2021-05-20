import { inject, injectable } from 'tsyringe';
import IPagination from '@shared/dtos/IPagination';
import IGroupsRepository from '../repositories/IGroupsRepository';
import Group from '../infra/typeorm/entities/Group';

@injectable()
export default class FindGroupsService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ skip, take }: IPagination): Promise<Group[]> {
    const groups = await this.groupsRepository.findAll({ skip, take });

    return groups;
  }
}
