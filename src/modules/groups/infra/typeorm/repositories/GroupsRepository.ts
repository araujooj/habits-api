import { ICreateGroupDTO } from '@modules/groups/dtos/ICreateGroupDTO';
import { ISubscribeToGroupDTO } from '@modules/groups/dtos/ISubscribeToGroupDTO';
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';
import IPagination from '@shared/dtos/IPagination';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import Group from '../entities/Group';

export default class GroupsRepository implements IGroupsRepository {
  private groupsRepository: Repository<Group>;

  private userGroupsRepository: Repository<UserGroup>;

  constructor() {
    this.groupsRepository = getRepository(Group);
    this.userGroupsRepository = getRepository(UserGroup);
  }

  public async findInGroup({
    group_id,
    user_id,
  }: ISubscribeToGroupDTO): Promise<UserGroup | undefined> {
    const userGroup = await this.userGroupsRepository.findOne({
      where: {
        user: {
          id: user_id,
        },
        group: {
          id: group_id,
        },
      },
    });

    return userGroup;
  }

  public async subscribe({ group_id, user_id }: ISubscribeToGroupDTO): Promise<Group | undefined> {
    const userGroup = this.userGroupsRepository.create({
      user: {
        id: user_id,
      },
      group: {
        id: group_id,
      },
    });

    await this.userGroupsRepository.save(userGroup);

    const group = await this.groupsRepository.findOne(group_id);

    return group;
  }

  public async findById(id: string): Promise<Group | undefined> {
    return this.groupsRepository
      .findOne(id)
      .then((group) => group)
      .catch((_) => undefined);
  }

  public async findAll({ skip, take }: IPagination): Promise<[Group[], number]> {
    const groups = await this.groupsRepository.findAndCount({ skip, take });

    return groups;
  }

  public async create({
    category,
    description,
    name,
    creator_id,
  }: ICreateGroupDTO): Promise<Group> {
    const group = this.groupsRepository.create({
      category,
      description,
      name,
      creator: {
        id: creator_id,
      },
    });

    await this.groupsRepository.save(group);

    const userGroup = this.userGroupsRepository.create({
      user: {
        id: creator_id,
      },
      group: {
        id: group.id,
      },
    });
    await this.userGroupsRepository.save(userGroup);

    return group;
  }

  public async save(group: Group): Promise<Group> {
    const newGroup = await this.groupsRepository.save(group);

    return newGroup;
  }

  public async delete(id: string): Promise<void | DeleteResult> {
    return this.groupsRepository.delete(id);
  }
}
