import { isNumber, isObject, isString } from '@vanyamate/types-kit';

export type DomainUser = {
    id: string;
    login: string;
    age: number;
};

export const isDomainUser = function (data: unknown): data is DomainUser {
    return (
        isObject(data) && isString(data['id']) && isString(data['login']) && isNumber(data['age'])
    );
};
