import { isObject, isOptional, isString } from '@vanyamate/types-kit';

export type DomainUrlCreateData = {
    originalUrl: string;
    alias?: string;
};

export const isDomainUrlCreateData = function (value: unknown): value is DomainUrlCreateData {
    return (
        isObject(value) && isString(value['originalUrl']) && isOptional(value['alias'], isString)
    );
};
