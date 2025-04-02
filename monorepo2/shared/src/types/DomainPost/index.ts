import { isNumber, isObject, isString } from '@vanyamate/types-kit';

export type DomainPost = {
    id: string;
    title: string;
    body: string;
    createdAt: number;
};

export const isDomainPost = function (data: unknown): data is DomainPost {
    return (
        isObject(data) &&
        isString(data['id']) &&
        isString(data['title']) &&
        isString(data['body']) &&
        isNumber(data['createdAt'])
    );
};
