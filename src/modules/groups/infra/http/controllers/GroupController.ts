import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGroupService from '@modules/groups/services/CreateGroupService';
import FindGroupsService from '@modules/groups/services/FindGroupsService';
import { classToClass } from 'class-transformer';
import UpdateGroupService from '@modules/groups/services/UpdateGroupService';
import DeleteGroupService from '@modules/groups/services/DeleteGroupService';
import Group from '../../typeorm/entities/Group';

export default class GroupController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { category } = request.query;

    const groups = container.resolve(FindGroupsService);

    const [findGroups, count] = await groups.execute({
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
    });

    let groupsResponse = {
      page: request.pagination.page,
      nextUrl: request.pagination.nextUrl,
      count,
      results: findGroups,
    };

    if (count < 15) {
      groupsResponse = {
        page: request.pagination.page,
        nextUrl: null,
        count,
        results: findGroups,
      };
    }

    return response.status(200).json(classToClass(groupsResponse));
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, description, category } = request.body;

    const createGroup = container.resolve(CreateGroupService);

    const group = await createGroup.execute({
      category,
      creator_id: request.user.id,
      description,
      name,
    });

    return response.status(201).json(classToClass(group));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, category } = request.body;

    const updateGroup = container.resolve(UpdateGroupService);

    const group = await updateGroup.execute({
      category,
      description,
      id,
      name,
      creator_id: request.user.id,
    });

    return response.json(classToClass(group));
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteGroup = container.resolve(DeleteGroupService);

    await deleteGroup.execute({
      id,
      creator_id: request.user.id,
    });

    return response.status(204).json();
  }
}
