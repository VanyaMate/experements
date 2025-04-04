console.log('Before all');

import Fastify from 'fastify';
import { IPostService } from '../services/post/post-service.interface';
import {
    FsPostService,
} from '../services/post/implementations/fs-post-service';
import { isDomainPostCreate, isDomainPostUpdate } from 'shared';
import cors from '@fastify/cors';


console.log('Starting Fastify server...');

const server = Fastify({ logger: true });

server.register(cors, {
    origin: (origin, cb) => {
        const hostname = new URL(origin).hostname;
        if (hostname === 'localhost') {
            //  Request from localhost will pass
            cb(null, true);
            return;
        }
        // Generate an error on other origins, disabling access
        cb(new Error('Not allowed'), false);
    },
});

server.addContentTypeParser('application/json', { parseAs: 'string' }, function(req, body, done) {
    try {
        const json = JSON.parse(body as string);
        done(null, json);
    } catch (err) {
        err.statusCode = 400;
        done(err, undefined);
    }
});

const postService: IPostService = new FsPostService('posts.json');

server
    .get('/posts', async (require, reply) => {
        try {
            const post = await postService.getAll();
            reply.code(200).send(post);
        } catch (e) {
            reply.code(400).send(e);
        }
    })
    .get('/post/:id', async (require, reply) => {
        const id = (require.params as Record<string, string>)?.id;
        if (id) {
            try {
                const post = await postService.get(id);
                reply.code(200).send(post);
            } catch (e) {
                reply.code(400).send(e);
            }
        } else {
            reply.code(400).send({ error: 'Не указан ID поста' });
        }
    })
    .post('/post', async (require, reply) => {
        const body = require.body;
        if (isDomainPostCreate(body)) {
            try {
                const post = await postService.create(body.title, body.body);
                reply.code(200).send(post);
            } catch (e) {
                reply.code(400).send(e);
            }
        } else {
            reply.code(400).send({
                error: 'Указаны неверные данные',
                meta : { data: body },
            });
        }
    })
    .patch('/post/:id', async (require, reply) => {
        const id = (require.params as Record<string, string>)?.id;
        const body = require.body;
        if (isDomainPostUpdate(body)) {
            try {
                const post = await postService.update(id, body);
                reply.code(200).send(post);
            } catch (e) {
                reply.code(400).send(e);
            }
        } else {
            reply.code(400).send({
                error: 'Указаны неверные данные',
                meta : { data: body },
            });
        }
    })
    .delete('/post/:id', async (require, reply) => {
        const id = (require.params as Record<string, string>)?.id;
        try {
            const removed = await postService.remove(id);
            reply.code(201).send({ removed });
        } catch (e) {
            reply.code(400).send(e);
        }
    })
    .listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
        server.log.info(`server listening on ${ address }`);
        if (err) {
            server.log.error(err, address);
        }
    });
