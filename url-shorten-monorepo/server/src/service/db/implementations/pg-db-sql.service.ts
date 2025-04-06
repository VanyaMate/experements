import { IDbSqlService } from '../db-sql-service.interface';
import pg from 'pg';

const { Client } = pg;

export class PgDbSqlService implements IDbSqlService {
    private _pg: pg.Client;

    constructor(config: string) {
        this._pg = new Client(config);
    }

    connect(): Promise<void> {
        return this._pg.connect();
    }

    disconnect(): Promise<void> {
        return this._pg.end();
    }

    async query<Result>(sql: string, args: Array<string>): Promise<Array<Result>> {
        return this._pg.query(sql, args).then((response) => response.rows);
    }
}
