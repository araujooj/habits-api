import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 as uuid } from 'uuid';
import IPagination from '@shared/dtos/IPagination';
import { DeleteResult } from 'typeorm';

class UsersRepository
implements IUsersRepository {
  private users: User[] = []

  public async delete(id: string): Promise<void | DeleteResult> {
    throw new Error('Method not implemented.');
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id)

    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email)

    return findUser
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex((findUser) => findUser.id === user.id)

    this.users[findIndex] = user;

    return user;
  }

  public async create({
    name, email, password, is_staff,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(), name, email, password, is_staff,
    })

    this.users.push(user)

    return user
  }
}

export default UsersRepository;
