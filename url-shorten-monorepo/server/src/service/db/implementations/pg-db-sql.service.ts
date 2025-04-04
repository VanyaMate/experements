import { IDbSqlService } from '../db-sql-service.interface';
import { Client } from 'pg';

export class PgDbSqlService implements IDbSqlService {
    private _pg: Client;

    constructor(config: string) {
        this._pg = new Client(config);
    }

    connect(): Promise<void> {
        return this._pg.connect();
    }

    disconnect(): Promise<void> {
        return this._pg.end();
    }

    query<Result>(sql: string, args: Array<string>): Promise<Array<Result>> {
        return this._pg.query(sql, args).then((response) => response.rows);
    }
}
