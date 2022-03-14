import { Publisher, OrderCancelledEvent, Subjects } from '@jimmy2952-ticket/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}