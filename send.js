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

        var msg = 'Hello world';

        channel.assertQueue(queueName, {
            durable: false
        });

        channel.sendToQueue(queueName, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);

        setTimeout(function () {
            connection.close();
            process.exit(0)
        }, 500);
    });
});