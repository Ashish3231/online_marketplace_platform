// Import required modules
const amqp = require('amqplib');

// RabbitMQ connection URL
const rabbitmqUrl = 'amqp://127.0.0.1:5672';

// Establish connection to RabbitMQ server
exports.connect = async () => {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    // Declare queues for orders and messages
    const orderQueue = 'orders';
    const messageQueue = 'messages';
    await channel.assertQueue(orderQueue);
    await channel.assertQueue(messageQueue);

    // Consume messages from orders and messages queues
    channel.consume(
      orderQueue,
      (msg) => {
        console.log('New order:', msg.content.toString());
      },
      { noAck: true },
    );

    channel.consume(
      messageQueue,
      (msg) => {
        console.log('New message:', msg.content.toString());
      },
      { noAck: true },
    );

    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to send new order
exports.sendOrder = async (order, queue) => {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    const orderQueue = queue;

    await channel.assertQueue(orderQueue);
    channel.sendToQueue(orderQueue, Buffer.from(JSON.stringify(order)));
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to send new message
exports.sendMessage = async (message, queue) => {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    const messageQueue = queue;

    await channel.assertQueue(messageQueue);
    channel.sendToQueue(messageQueue, Buffer.from(message));
    console.log('Message sent:', message);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};
