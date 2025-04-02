import { type TypeGuard, isObject, isString } from '@vanyamate/types-kit';

export type DomainPostCreate = {
    title: string;
    body: string;
};

export const isDomainPostCreate: TypeGuard<DomainPostCreate> = function (
    data,
): data is DomainPostCreate {
    return isObject(data) && isString(data['title']) && isString(data['body']);
};
