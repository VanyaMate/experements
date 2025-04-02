import Fastify from 'fastify';
import { TestService } from './service/TestService.js';
import { DomainUser } from 'types';

const fastify = Fastify({
    logger: true,
});

const service = new TestService();

fastify.get('/', (request, reply) => {
    const query = request.query as unknown as Record<string, string>;
    const login = query?.login;

    if (login) {
        const user: DomainUser = {
            id: crypto.randomUUID(),
            login,
            avatar: 'no-avatar',
            age: 27,
        };
        if (isDomainUser(user)) {
            service.moveTo(10);
            reply.send(user).status(201);
        }

        reply.send({ error: 'No valid user' }).status(401);
    }

    reply.send({ error: 'No valid login' }).status(401);
});

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err, address);
    }
});
