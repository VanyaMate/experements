import { PgTodoSchema } from './pg-todo.service';
import { DomainTodo } from 'shared';

export const schemaTodoToDomain = function (schema: PgTodoSchema): DomainTodo {
    return {
        id: schema.id.toString(),
        title: schema.title,
        description: schema.description,
        status: schema.status,
        color: schema.color,
        expiresAt: schema.expires_at,
        createdAt: schema.created_at,
    };
};
