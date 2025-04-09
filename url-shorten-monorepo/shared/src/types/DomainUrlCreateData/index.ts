import {isNumber, isObject, isOptional, isString} from '@vanyamate/types-kit';

export type DomainUrlCreateData = {
    originalUrl: string;
    alias?: string;
    expiresAt?: number;
};

export const isDomainUrlCreateData = function (value: unknown): value is DomainUrlCreateData {
    return (
        isObject(value) && isString(value['originalUrl']) && isOptional(value['alias'], isString) && isOptional(value['expiresAt'], isNumber)
    );
};
