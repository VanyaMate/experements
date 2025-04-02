import { type TypeGuard, isObject, isString, isOptional } from '@vanyamate/types-kit';

export type DomainPostUpdate = {
    title?: string;
    body?: string;
};

export const isDomainPostUpdate: TypeGuard<DomainPostUpdate> = function (
    data,
): data is DomainPostUpdate {
    return (
        isObject(data) && isOptional(data['title'], isString) && isOptional(data['body'], isString)
    );
};
