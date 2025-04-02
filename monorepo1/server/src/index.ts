import Fastify from 'fastify';
import { DomainUser, isDomainUser } from 'types';

const server = Fastify({ logger: true });

server
    .get('/', async (request, reply) => {
        const user: DomainUser = {
            id: crypto.randomUUID(),
            login: (request.query as Record<string, string>)?.login,
            age: 27,
        };

        if (isDomainUser(user)) {
            reply.send(user).status(200);
        } else {
            reply.send({ error: 'No valid user' }).status(401);
        }
    })
    .listen({ port: 3000 }, (err, address) => {
        if (err) {
            server.log.error(err, address);
        }
    });
