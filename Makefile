queue:
	docker run --name rabbitmq -p 5672:5672 -d rabbitmq:3

receiver:
	node receive.js

sender:
	node send.js