import Fastify from 'fastify';
import pg from 'pg';
import dotenv from 'dotenv';
import { PgTodoService } from './service/todo-service/implementations/pg-todo.service';
import { isDomainTodoCreateData } from 'shared';

dotenv.config();

const { Client } = pg;

const server = Fastify({ logger: true });
const pgConfig = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
const pgClient = new Client(pgConfig);
const todoService = new PgTodoService(pgClient);

(async () => {
    await pgClient.connect();
    await todoService.initialize();
    await todoService.sync();

    server
        .post('/todo', async (req, reply) => {
            const body = req.body;
            if (isDomainTodoCreateData(body)) {
                try {
                    const todo = await todoService.create(body);
                    reply.code(201).send(todo);
                } catch (error) {
                    reply.code(400).send({ error });
                }
            }
        })
        .get('/todos', async (req, reply) => {
            try {
                const result = await todoService.getAll();
                reply.code(200).send(result);
            } catch (error) {
                reply.code(400).send({ error });
            }
        })
        .listen({ host: '0.0.0.0', port: 3000 }, (err, address) => {
            if (err) {
                server.log.error(err);
                server.close();
            }

            server.log.info('Server started on port', address);
        });
})();
