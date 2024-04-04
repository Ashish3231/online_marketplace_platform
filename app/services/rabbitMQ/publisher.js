const amqp = require('amqplib');

exports.sendNotification = async (userId, msg) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const exchange = 'notifications';

  await channel.assertExchange(exchange, 'fanout', { durable: false });

  // Send a message
  const message = JSON.stringify({
    userId: userId,
    message: msg,
  });

  channel.publish(exchange, '', Buffer.from(message));
  console.log(' [x] Sent notification');

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};
