import { isEnumValueOf, isNumber, isObject, isString } from '@vanyamate/types-kit';

export enum DomainTodoStatus {
    PENDING = 'pending',
    WORKING = 'working',
    FAILED = 'failed',
    SUCCESS = 'success',
}

export type DomainTodo = {
    id: string;
    title: string;
    description: string;
    createdAt: number;
    expiresAt: number;
    color: string;
    status: DomainTodoStatus;
};

export const isDomainTodo = function (todo: unknown): todo is DomainTodo {
    return (
        isObject(todo) &&
        isString(todo['id']) &&
        isString(todo['title']) &&
        isString(todo['description']) &&
        isNumber(todo['createdAt']) &&
        isNumber(todo['expiresAt']) &&
        isString(todo['color']) &&
        isEnumValueOf(todo['status'], DomainTodoStatus)
    );
};
