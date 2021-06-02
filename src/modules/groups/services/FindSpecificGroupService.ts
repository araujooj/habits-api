import { inject, injectable } from 'tsyringe';
import IGroupsRepository from '../repositories/IGroupsRepository';
import Group from '../infra/typeorm/entities/Group';

interface IRequest {
  id: string;
}

@injectable()
export default class FindSpecificGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Group | undefined> {
    const group = await this.groupsRepository.findById(id);

    return group;
  }
}
