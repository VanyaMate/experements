import { DomainUrl } from 'shared';
import { UrlSqlSchema } from '../schemas';

export const urlSchemaToDomainUrl = function (schema: UrlSqlSchema): DomainUrl {
    return {
        id: schema.id,
        originalUrl: schema.original_url,
        createdAt: schema.created_at,
    };
};
