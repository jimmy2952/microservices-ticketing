import { Publisher, OrderCreatedEvent, Subjects } from '@jimmy2952-ticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}