import {isNumber, isObject, isString} from '@vanyamate/types-kit';

export type DomainUrlInfo = {
    originalUrl: string;
    redirectCount: number;
    createdAt: number;
    expiresAt: number;
};

export const isDomainUrlInfo = function (value: unknown): value is DomainUrlInfo {
    return (
        isObject(value) &&
        isString(value['originalUrl']) &&
        isNumber(value['redirectCount']) &&
        isNumber(value['createdAt']) &&
        isNumber(value['expiresAt'])
    );
};
