import { DomainTodo, DomainTodoCreateData, DomainTodoUpdateData } from 'shared';

export interface ITodoService {
    create(data: DomainTodoCreateData): Promise<DomainTodo>;

    update(id: string, data: DomainTodoUpdateData): Promise<DomainTodo>;

    remove(id: string): Promise<boolean>;

    getById(id: string): Promise<DomainTodo>;

    getAll(): Promise<Array<DomainTodo>>;
}
