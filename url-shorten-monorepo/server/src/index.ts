import Fastify from 'fastify';
import { PgDbSqlService } from './service/db/implementations/pg-db-sql.service';
import { PgUrlShortenService } from './service/url-shorten/implementations/pg-url-shorten.service';

import { configDotenv } from 'dotenv';

configDotenv();

const pgConnectionConfig = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

const server = Fastify({ logger: true });
const pg = new PgDbSqlService(pgConnectionConfig);
const urlShorten = new PgUrlShortenService(pg);

(async () => {
    await pg.connect();
    await urlShorten.initialize();

    server
        .get('/', (request, reply) => {
            reply.send({ hello: 'world' });
        })
        .get('/all', async (request, reply) => {
            const list = await urlShorten.getAll();
            reply.code(200).send(list);
        })
        .post('/', async (request, reply) => {
            const data = await urlShorten.create(request.body);
            reply.code(201).send(data);
        })
        .listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
            server.log.info(`server started on ${address} port`);
            if (err) {
                server.log.error(err, address);
            }
        });
})();
