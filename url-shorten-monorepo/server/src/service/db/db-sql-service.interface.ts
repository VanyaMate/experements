export interface IDbSqlService {
    connect(): Promise<void>;

    disconnect(): Promise<void>;

    query<Result>(sql: string, args: Array<string>): Promise<Array<Result>>;
}
