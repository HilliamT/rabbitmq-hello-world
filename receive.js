const amqp = require('amqplib/callback_api');
const { queueName, amqpURI } = require('./utils');

amqp.connect(amqpURI, function (error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queueName, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
        channel.consume(queueName, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});