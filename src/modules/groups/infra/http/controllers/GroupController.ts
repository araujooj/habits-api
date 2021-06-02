import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateGroupService from '@modules/groups/services/CreateGroupService';
import FindGroupsService from '@modules/groups/services/FindGroupsService';
import UpdateGroupService from '@modules/groups/services/UpdateGroupService';
import DeleteGroupService from '@modules/groups/services/DeleteGroupService';
import FindSpecificGroupService from '@modules/groups/services/FindSpecificGroupService';

interface IRequest {
  category: string;
}

export default class GroupController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { category } = request.query as unknown as IRequest;

    const findGroups = container.resolve(FindGroupsService);

    const [groups, totalCount] = await findGroups.execute({
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
      category,
    });

    const groupsResponse = {
      page: request.pagination.page,
      perPage: request.pagination.realTake,
      previousUrl: request.pagination.page === 1 ? null : request.pagination.previousUrl,
      nextUrl: groups.length < request.pagination.realTake ? null : request.pagination.nextUrl,
      count: totalCount,
      results: groups,
    };

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findGroup = container.resolve(FindSpecificGroupService);

    const group = await findGroup.execute({
      id,
    });

    return response.json(classToClass(group));
  }
}
