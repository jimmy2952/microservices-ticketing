import { Message } from 'node-nats-streaming';
import { ExpirationCompleteEvent, OrderStatus } from '@jimmy2952-ticket/common';
import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Order } from '../../../models/order';
import { Ticket } from '../../../models/ticket';
import mongoose from 'mongoose';

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();
  const order = Order.build({
    userId: 'rimf',
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket
  });
  await order.save();

  const data : ExpirationCompleteEvent['data'] = {
    orderId: order.id
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, order, data, ticket,  msg };
};

it('updates the order status to cancelled', async () => {
  const { listener, order, data, ticket,  msg } = await setup();

  await listener.onMessage(data, msg);

  const updateOrder = await Order.findById(order.id);

  expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emit an OrderCancelled event', async () => {
  const { listener, order, data, ticket,  msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
  expect(eventData.id).toEqual(data.orderId);
});

it('ack the message', async () => {
  const { listener, order, data, ticket,  msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});