import { isNumber, isObject, isString } from '@vanyamate/types-kit';

export type DomainUrl = {
    id: string;
    originalUrl: string;
    createdAt: number;
};

export const isDomainUrl = function (value: unknown): value is DomainUrl {
    return (
        isObject(value) &&
        isString(value['id']) &&
        isString(value['originalUrl']) &&
        isNumber(value['createdAt'])
    );
};
