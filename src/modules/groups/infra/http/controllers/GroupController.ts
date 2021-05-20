import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGroupService from '@modules/groups/services/CreateGroupService';
import FindGroupsService from '@modules/groups/services/FindGroupsService';
import { classToClass } from 'class-transformer';

export default class GroupController {
  public async index(request: Request, response: Response): Promise<Response> {
    const groups = container.resolve(FindGroupsService);

    const findGroups = await groups.execute({
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
    });

    return response.status(200).json(classToClass(findGroups));
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

    return response.status(201).json(group);
  }
}
