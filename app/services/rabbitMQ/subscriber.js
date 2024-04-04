const amqp = require('amqplib');

exports.receiveNotification = async () => {
  const connection = await amqp.connect('amqp://localhost');
  console.log(' start listing rabbitMQ===================================');

  const channel = await connection.createChannel();

  const exchange = 'notifications';

  await channel.assertExchange(exchange, 'fanout', { durable: false });

  const { queue } = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(queue, exchange, '');

  console.log(' start listing rabbitMQ===================================');

  channel.consume(
    queue,
    (msg) => {
      if (msg.content) {
        const notification = JSON.parse(msg.content.toString());
        console.log(' [x] Received notification:', notification);
      }
    },
    { noAck: true },
  );
};
