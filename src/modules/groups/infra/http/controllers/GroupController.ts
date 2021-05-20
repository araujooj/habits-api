import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGroupService from '@modules/groups/services/CreateGroupService';

export default class GroupController {
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
