import CreateEventService from '@modules/events/services/CreateEventService';
import DeleteEventService from '@modules/events/services/DeleteEventService';
import FindEventsService from '@modules/events/services/FindEventsService';
import UpdateEventService from '@modules/events/services/UpdateEventService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class EventController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params;

    const findEvents = container.resolve(FindEventsService);

    const [events, totalCount] = await findEvents.execute({
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
      group_id,
    });

    const eventsResponse = {
      page: request.pagination.page,
      perPage: request.pagination.realTake,
      previousUrl: request.pagination.page === 1 ? null : request.pagination.previousUrl,
      nextUrl: events.length < request.pagination.realTake ? null : request.pagination.nextUrl,
      count: totalCount,
      results: events,
    };

    return response.json(classToClass(eventsResponse));
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { date, location, title } = request.body;
    const { group_id } = request.params;

    const createEvent = container.resolve(CreateEventService);

    const event = await createEvent.execute({
      date,
      group_id,
      location,
      title,
      user_id: request.user.id,
    });

    return response.status(201).json(classToClass(event));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { date, location, title } = request.body;
    const { group_id, event_id } = request.params;

    const updateEvent = container.resolve(UpdateEventService);

    const event = await updateEvent.execute({
      date,
      group_id,
      id: event_id,
      location,
      title,
      user_id: request.user.id,
    });

    return response.json(event);
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { event_id } = request.params;

    const deleteEvent = container.resolve(DeleteEventService);

    await deleteEvent.execute({
      id: event_id,
      creator_id: request.user.id,
    });

    return response.status(204).json();
  }
}

export default EventController;
