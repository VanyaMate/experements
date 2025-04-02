import { isObject, isString, isNumber } from '@vanyamate/types-kit';

export type DomainUser = {
    id: string;
    login: string;
    avatar: string;
    age: number;
};

export const isDomainUser = function (data: unknown): data is DomainUser {
    return (
        isObject(data) &&
        isString(data['id']) &&
        isString(data['login']) &&
        isString(data['avatar']) &&
        isNumber(data['age'])
    );
};
