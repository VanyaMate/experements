import { DomainTodoCreateData, DomainTodo, DomainTodoUpdateData, DomainTodoStatus } from 'shared';
import { ITodoService } from '../todo-service.interface';
import { Client } from 'pg';
import { IDbService } from '../../db-service.interface';
import { TODOS_TABLE_NAME } from '../config';
import { getSafeSqlArgument } from '../../../lib/sql/getSafeSqlArgument';
import { schemaTodoToDomain } from './converter';
import { catchError } from '../../../../utils/error/catchError';

export type PgTodoSchema = {
    id: number;
    title: string;
    description: string;
    created_at: number;
    expires_at: number;
    color: string;
    status: DomainTodoStatus;
};

export class PgTodoService implements ITodoService, IDbService {
    constructor(private readonly _pgClient: Client) {}

    async initialize(): Promise<void> {
        await this._pgClient.query(
            // @formatter:off
            `
                CREATE TABLE IF NOT EXISTS ${TODOS_TABLE_NAME}
                (
                    id INTEGER PRIMARY KEY,
                    title TEXT NOT NULL,
                    description TEXT,
                    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000)::BIGINT,
                    expires_at BIGINT DEFAULT 0,
                    color TEXT DEFAULT '',
                    status TEXT DEFAULT '${DomainTodoStatus.PENDING}'
                )
            `,
            // @formatter:on
            [],
        );
    }

    async sync(): Promise<void> {}

    async create(data: DomainTodoCreateData): Promise<DomainTodo> {
        try {
            const fields: Array<string> = [];
            const values: Array<string | number> = [];
            const placeholders: Array<string> = [];

            fields.push('title');
            values.push(getSafeSqlArgument(data.title));
            placeholders.push(`$${values.length}`);

            if (data.description) {
                fields.push('description');
                values.push(getSafeSqlArgument(data.description));
                placeholders.push(`$${values.length}`);
            }

            if (data.expiresAt) {
                fields.push('expires_at');
                values.push(data.expiresAt);
                placeholders.push(`$${values.length}`);
            }

            if (data.color) {
                fields.push('color');
                values.push(data.color);
                placeholders.push(`$${values.length}`);
            }

            const result = await this._pgClient.query<PgTodoSchema>(
                // @formatter:off
                `
                    INSERT INTO ${TODOS_TABLE_NAME} (${fields.join(',')})
                    VALUES (${placeholders.join(',')})
                    RETURNING *
                `,
                // @formatter:on
                values,
            );

            return schemaTodoToDomain(result.rows[0]);
        } catch (e) {
            throw catchError(e);
        }
    }

    update(id: string, data: DomainTodoUpdateData): Promise<DomainTodo> {
        throw new Error('Method not implemented.');
    }

    remove(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    getById(id: string): Promise<DomainTodo> {
        throw new Error('Method not implemented.');
    }

    async getAll(): Promise<Array<DomainTodo>> {
        try {
            const result = await this._pgClient.query(
                // @formatter:off
                `
                    SELECT * FROM ${TODOS_TABLE_NAME}
                `,
                // @formatter:on
            );
            return result.rows.map(schemaTodoToDomain);
        } catch (e) {
            throw catchError(e);
        }
    }
}
