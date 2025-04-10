import {
    DomainUrl,
    DomainUrlInfo,
    aliasValidator,
    isDomainUrlCreateData,
    originalUrlValidator,
} from 'shared';
import { IUrlShortenService } from '../url-shorten-service.interface';
import { IDbSqlService } from '../../db/db-sql-service.interface';
import { IDbModelService } from '../../db/db-model-service.inteface';
import { getSafeSqlArgument } from '../../db/utils/getSafeSqlArgument';
import { catchError } from '../../../../utils/catchError';
import { UrlSqlSchema } from '../../../../schemas';
import {
    urlSchemaToDomainUrl,
    urlSchemaToDomainUrlInfo,
} from '../../../../converters/schemaToDomain';


export class PgUrlShortenService implements IUrlShortenService,
                                            IDbModelService {
    private _tableName: string = 'url_shorten';

    constructor (private readonly _dbSqlService: IDbSqlService) {
    }

    async initialize (): Promise<void> {
        await this._dbSqlService.query(
            // @formatter:off
            `
                CREATE TABLE IF NOT EXISTS ${this._tableName}
                (
                    id TEXT PRIMARY KEY,
                    original_url TEXT NOT NULL,
                    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000)::BIGINT,
                    redirect_count INT DEFAULT 0,
                    expires_at BIGINT DEFAULT 0
                )
            `,
            // @formatter:on
            [],
        );
    }

    async sync (): Promise<void> {
        await this._dbSqlService.query(
            // @formatter:off
            `
                ALTER TABLE ${this._tableName}
                ADD COLUMN IF NOT EXISTS redirect_count INT DEFAULT 0
            `
            // @formatter:on
            , [],
        );
        await this._dbSqlService.query(
            // @formatter:off
            `
                ALTER TABLE ${this._tableName}
                ADD COLUMN IF NOT EXISTS expires_at BIGINT DEFAULT 0
            `
            // @formatter:on
            , [],
        )
        await this._dbSqlService.query(
            // @formatter:off
            `
                ALTER TABLE ${ this._tableName }
                ALTER COLUMN expires_at TYPE BIGINT
            `,
            // @formatter:on
            [],
        );
    }

    async create (data: unknown): Promise<DomainUrl> {
        if (isDomainUrlCreateData(data)) {
            const safeAlias     = data.alias ?? Math.random().toString(32).substring(2, 10);
            const safeExpiresAt = data.expiresAt ?? 0;

            const aliasError = aliasValidator(safeAlias);
            if (aliasError) {
                throw new Error(aliasError);
            }

            const originalUrlError = originalUrlValidator(data.originalUrl);
            if (originalUrlError) {
                throw new Error(originalUrlError);
            }

            try {
                const [ result ] = await this._dbSqlService.query<UrlSqlSchema>(
                    // @formatter:off
                    `
                        INSERT INTO ${this._tableName} (id, original_url, expires_at)
                        VALUES ($1, $2, $3)
                        RETURNING *
                    `,
                    // @formatter:on
                    [ getSafeSqlArgument(safeAlias), getSafeSqlArgument(data.originalUrl), getSafeSqlArgument(safeExpiresAt.toString()) ],
                );
                return urlSchemaToDomainUrl(result);
            } catch (error: unknown) {
                throw catchError(error, 'Ошибка создания ссылки');
            }
        }

        throw new Error('Переданы неверные данные');
    }

    async remove (id: string): Promise<boolean> {
        console.log(id);
        throw new Error('Method not implemented.');
    }

    async getAll (): Promise<Array<DomainUrl>> {
        try {
            return this._dbSqlService
                .query<UrlSqlSchema>(
                    // @formatter:off
                    `
                        SELECT *
                        FROM ${this._tableName}
                    `,
                    // @formatter:on
                    [],
                )
                .then((result) => result.map(urlSchemaToDomainUrl));
        } catch (error: unknown) {
            throw catchError(error, 'Ошибка получения ссылок');
        }
    }

    async getInfoById (id: string): Promise<DomainUrlInfo> {
        try {
            return this._dbSqlService
                .query<UrlSqlSchema>(
                    // @formatter:off
                    `
                        SELECT * 
                        FROM ${this._tableName}
                        WHERE id = $1
                    `
                        // @formatter:on
                    , [ getSafeSqlArgument(id) ],
                )
                .then((result) => result.map(urlSchemaToDomainUrlInfo))
                .then((list) => list[0]);
        } catch (error: unknown) {
            throw catchError(error, 'Ошибка получения ссылки');
        }
    }

    async increment (id: string): Promise<void> {
        try {
            await this._dbSqlService
                .query(
                    // @formatter:off
                    `
                        UPDATE ${this._tableName}
                        SET redirect_count = redirect_count + 1
                        WHERE id = $1
                    `
                    // @formatter:on
                    , [ getSafeSqlArgument(id) ],
                )
        } catch (error: unknown) {
            throw catchError(error, 'Ошибка инкрементирования');
        }
    }
}
