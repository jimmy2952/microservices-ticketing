import { Publisher, Subjects, PaymentCreatedEvent } from "@jimmy2952-ticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
