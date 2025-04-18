import Fastify from 'fastify';
import { PgDbSqlService } from './service/db/implementations/pg-db-sql.service';
import {
    PgUrlShortenService,
} from './service/url-shorten/implementations/pg-url-shorten.service';
import cors from '@fastify/cors';

import { configDotenv } from 'dotenv';
import { c } from 'vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P';


configDotenv();

const pgConnectionConfig = `postgresql://${ process.env.POSTGRES_USER }:${ process.env.POSTGRES_PASSWORD }@${ process.env.POSTGRES_HOST }:${ process.env.POSTGRES_PORT }/${ process.env.POSTGRES_DATABASE }`;

const server     = Fastify({ logger: true });
const pg         = new PgDbSqlService(pgConnectionConfig);
const urlShorten = new PgUrlShortenService(pg);

server.register(cors, {
    origin: (origin, cb) => {
        if (origin) {
            const hostname = new URL(origin).hostname;
            if (hostname === 'localhost') {
                cb(null, true);
                return;
            }
        }
        cb(null, true);
        return;
        // cb(new Error('Not allowed'), false);
    },
});

(async () => {
    await pg.connect();
    await urlShorten.initialize();
    await urlShorten.sync();

    server
        .get('/info/:id', async (request, reply) => {
            const id = (request.params as Record<string, string>).id;
            if (id) {
                try {
                    const url = await urlShorten.getInfoById(id);
                    if (url) {
                        reply.code(200).send(url);
                    } else {
                        reply.code(404).send({ error: 'Не найдено' });
                    }
                } catch (e) {
                    reply.code(400).send({ error: (e as Error).message });
                }
            }
        })
        .get('/all', async (request, reply) => {
            try {
                const list = await urlShorten.getAll();
                reply.code(200).send(list);
            } catch (e) {
                reply.code(400).send({ error: e });
            }
        })
        .get('/:id', async (request, reply) => {
            const id = (request.params as Record<string, string>).id;
            if (id) {
                try {
                    const url = await urlShorten.getInfoById(id);
                    if (url) {
                        if (url.expiresAt > Date.now()) {
                            urlShorten.increment(id);
                            reply.redirect(url.originalUrl);
                        } else {
                            reply.code(400).send({
                                error: `Срок действия ссылки истек`,
                            });
                        }
                    } else {
                        reply.code(404).send({ error: 'Не найдено' });
                    }
                } catch (e) {
                    reply.code(400).send({ error: (e as Error).message });
                }
            } else {
                reply.code(400).send({ error: 'Ничего не указано' });
            }
        })
        .post('/', async (request, reply) => {
            try {
                const data = await urlShorten.create(request.body);
                reply.code(201).send(data);
            } catch (e) {
                reply.code(400).send({ error: (e as Error).message });
            }
        })
        .listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
            server.log.info(`server started on ${ address } port`);
            if (err) {
                server.log.error(err, address);
            }
        });
})();
