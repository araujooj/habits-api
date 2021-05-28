import { inject, injectable } from 'tsyringe';
import IPagination from '@shared/dtos/IPagination';
import IGroupsRepository from '../repositories/IGroupsRepository';
import Group from '../infra/typeorm/entities/Group';
import IFindGroupsDTO from '../dtos/IFindGroupsDTO';

@injectable()
export default class FindGroupsService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ skip, take, category }: IFindGroupsDTO): Promise<[Group[], number]> {
    const groups = await this.groupsRepository.findAll({ skip, take, category });

    return groups;
  }
}
