import SubscribeToGroupService from '@modules/groups/services/SubscribeToGroupService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SubscriptionController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const subscriptionService = container.resolve(SubscribeToGroupService);

    const group = await subscriptionService.execute({
      group_id: id,
      user_id: request.user.id,
    });

    return response.status(201).json(group);
  }
}
