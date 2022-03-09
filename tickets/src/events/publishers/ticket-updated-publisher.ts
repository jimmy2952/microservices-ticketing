import { Publisher, Subjects, TicketUpdatedEvent } from "@jimmy2952-ticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
