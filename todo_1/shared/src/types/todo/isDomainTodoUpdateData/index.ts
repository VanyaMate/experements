import { isEnumValueOf, isNumber, isObject, isOptional, isString } from '@vanyamate/types-kit';
import { DomainTodoStatus } from '../isDomainTodo';

export type DomainTodoUpdateData = {
    title?: string;
    description?: string;
    expiresAt?: number;
    color?: string;
    status?: DomainTodoStatus;
};

export const isDomainTodoUpdateData = function (data: unknown): data is DomainTodoUpdateData {
    return (
        isObject(data) &&
        isOptional(data['title'], isString) &&
        isOptional(data['description'], isString) &&
        isOptional(data['expiresAt'], isNumber) &&
        isOptional(data['color'], isString) &&
        isOptional(data['status'], (value) => isEnumValueOf(value, DomainTodoStatus))
    );
};
