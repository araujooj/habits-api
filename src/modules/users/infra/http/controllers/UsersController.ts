import CreateUserService from '@modules/users/services/CreateUserService';
import FindUsersService from '@modules/users/services/FindUsersService';
import FindSpecificUserService from '@modules/users/services/FindSpecificUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';

export default class UsersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = container.resolve(FindUsersService);

    const findUsers = await users.execute({
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
    });

    return response.status(200).json(classToClass(findUsers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = container.resolve(FindSpecificUserService);

    const findUser = await user.execute({
      user_id: id,
    });

    return response.status(200).json(classToClass(findUser));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      name: yup.string().required('name is required'),
      email: yup.string().email('invalid email').required('email is required'),
      password: yup
        .string()
        .required('password is required')
        .min(6, 'password: minimum is 6 characters'),
    });

    await schema.validate(request.body, { abortEarly: false }).catch(({ errors }) => {
      throw new AppError(errors);
    });

    const {
      name, email, password, is_staff,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user = container.resolve(DeleteUserService);

    await user.execute({
      id,
    });

    return response.status(204).json();
  }
}
