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

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        category,
        creator_id,
        description,
        name,
    }: ICreateGroupDTO): Promise<Group> {
        const findUser = await this.usersRepository.findById(creator_id);

        if (!findUser) {
            throw new AppError('Not found a educator with this id', 404);
        }

        const group = await this.groupsRepository.create({
            category,
            creator_id,
            description,
            name,
        });

        return group;
    }
}
