import { isNumber, isObject, isOptional, isString } from '@vanyamate/types-kit';

export type DomainTodoCreateData = {
    title: string;
    description?: string;
    expiresAt?: number;
    color?: string;
};

export const isDomainTodoCreateData = function (data: unknown): data is DomainTodoCreateData {
    return (
        isObject(data) &&
        isString(data['title']) &&
        isOptional(data['description'], isString) &&
        isOptional(data['expiresAt'], isNumber) &&
        isOptional(data['color'], isString)
    );
};
