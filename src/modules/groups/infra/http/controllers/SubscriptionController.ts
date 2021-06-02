import FindUserGroupsService from '@modules/groups/services/FindUserGroupsService';
import SubscribeToGroupService from '@modules/groups/services/SubscribeToGroupService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SubscriptionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getSubscriptions = container.resolve(FindUserGroupsService);

    const [subscriptions, totalCount] = await getSubscriptions.execute({
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
      user_id: request.user.id,
    });

    const groupsResponse = {
      page: request.pagination.page,
      perPage: request.pagination.realTake,
      previousUrl: request.pagination.page === 1 ? null : request.pagination.previousUrl,
      nextUrl:
        subscriptions.length < request.pagination.realTake ? null : request.pagination.nextUrl,
      count: totalCount,
      results: subscriptions,
    };

    return response.status(200).json(classToClass(groupsResponse));
  }

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
