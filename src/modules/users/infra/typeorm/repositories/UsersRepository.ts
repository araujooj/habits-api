import {
  DeleteResult,
  getRepository, Repository,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IPagination from '@shared/dtos/IPagination';

class UsersRepository
implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findAll({ skip, take }: IPagination): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        disabled: false,
      },
      skip,
      take,
    });

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    try {
      const findUser = await this.ormRepository.findOne({
        where: {
          id,
          disabled: false,
        },
      });

      return findUser;
    } catch (err) {
      return undefined
    }
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        email,
        disabled: false,
      },
    });

    return findUser;
  }

  public async save(user: User): Promise<User> {
    const saveUser = await this.ormRepository.save(user)
    return saveUser;
  }

  public async create({
    name, email, password, is_staff,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name, email, password, is_staff,
    })

    await this.ormRepository.save(user);

    return user;
  }

  public async delete(id: string): Promise<void | DeleteResult> {
    return this.ormRepository.delete(id);
  }
}

export default UsersRepository;
