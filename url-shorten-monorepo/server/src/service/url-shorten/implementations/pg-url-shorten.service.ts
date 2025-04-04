import { DomainUrl, DomainUrlInfo } from 'shared';
import { IUrlShortenService } from '../url-shorten-service.interface';
import { IDbSqlService } from '../../db/db-sql-service.interface';
import { aliasValidator, isDomainUrlCreateData, originalUrlValidator } from 'shared';
import { IDbModelService } from '../../db/db-model-service.inteface';
import { getSafeSqlArgument } from '../../db/utils/getSafeSqlArgument';

export class PgUrlShortenService implements IUrlShortenService, IDbModelService {
    private _tableName: string = 'url_shorten';

    constructor(private readonly _dbSqlService: IDbSqlService) {}

    async initialize(): Promise<void> {
        await this._dbSqlService.query(
            // @formatter:off
            `
                CREATE TABLE IF NOT EXISTS ${this._tableName}
                (
                    id TEXT PRIMARY KEY,
                    original_url TEXT NOT NULL,
                    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000)::BIGINT
                )
            `,
            // @formatter:on
            [],
        );
    }

    async create(data: unknown): Promise<DomainUrl> {
        if (isDomainUrlCreateData(data)) {
            const safeAlias = data.alias ?? Math.random().toString(32).substring(2, 10);

            const aliasError = aliasValidator(safeAlias);
            if (aliasError) {
                throw new Error(aliasError);
            }

            const originalUrlError = originalUrlValidator(data.originalUrl);
            if (originalUrlError) {
                throw new Error(originalUrlError);
            }

            try {
                const [result] = await this._dbSqlService.query<DomainUrl>(
                    // @formatter:off
                    `
                        INSERT INTO ${this._tableName} (id, original_url)
                        VALUES ($1, $2)
                        RETURNING *
                    `,
                    // @formatter:on
                    [getSafeSqlArgument(safeAlias), getSafeSqlArgument(data.originalUrl)],
                );
                return result;
            } catch (error: unknown) {
                if (typeof error === 'string') {
                    throw new Error(error);
                }

                if (error instanceof Error) {
                    throw new Error(error.message);
                }

                throw new Error('Ошибка создания ссылки');
            }
        }

        throw new Error('Переданы неверные данные');
    }

    remove(id: string): Promise<boolean> {
        console.log(id);
        throw new Error('Method not implemented.');
    }

    getAll(): Promise<Array<DomainUrl>> {
        throw new Error('Method not implemented.');
    }

    getInfoById(id: string): Promise<DomainUrlInfo> {
        console.log(id);
        throw new Error('Method not implemented.');
    }
}
