import { Publisher, Subjects, ExpirationCompleteEvent } from "@jimmy2952-ticket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
