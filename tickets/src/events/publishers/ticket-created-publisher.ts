import { Publisher, Subjects, TicketCreatedEvent } from "@jimmy2952-ticket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
