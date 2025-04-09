import { DomainUrl, DomainUrlInfo } from 'shared';
import { UrlSqlSchema } from '../schemas';


export const urlSchemaToDomainUrl = function (schema: UrlSqlSchema): DomainUrl {
    return {
        id         : schema.id,
        originalUrl: schema.original_url,
        createdAt  : Number(schema.created_at),
    };
};

export const urlSchemaToDomainUrlInfo = function (schema: UrlSqlSchema): DomainUrlInfo {
    return {
        originalUrl  : schema.original_url,
        createdAt    : Number(schema.created_at),
        expiresAt    : Number(schema.expires_at),
        redirectCount: Number(schema.redirect_count),
    };
};